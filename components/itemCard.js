import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { firestoreDb, auth } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const CardItem = styled.View`
	width: 100%;
	height: 300px;
	background-color: white;
	margin-bottom: 20px;
	border-radius: 35px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 0 50px 0 15px;
`;

const ButtonCont = styled.View`
	width: 100%;
	margin-top: 25px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`

const Title = styled.Text`
	font-size: 25px;
	color: #505050;
	font-weight: bold;
`
const Desc = styled.Text`
	font-size: 15px;
	color: #7E7E7E;
`

const Price = styled.Text`
	font-size: 30px;
	color: #505050;
	font-weight: bold;
`

const AddtoCart = styled.TouchableOpacity`
	background-color: orange;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 25px;
	border-radius: 10px;
`

const CartBtnText = styled.Text`
	font-size: 15px;
	color: white;
	font-weight: bold;
`

const ItemCard = () => {
	const [ Res, setRes ] = useState([]);

	useEffect(() => {
		ReadData();
	}, []);

	const arr = [];

	const ReadData = async () => {
		const querySnapshot = await getDocs(collection(firestoreDb, 'products'));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			arr.push(doc.data());
		});
        setRes(arr);
	};

	const InsertInCart = async (name, price) => {


		 try {	 
			const docRef = await addDoc(collection(firestoreDb, 'cart'), {
				name,
				price
			});
			console.log('Document added to cart: ', docRef.id);
		 } catch (error) {
			 console.log(error);
		 }
	};



	return (
        <>
        {Res.map((obj, i) => (
            <CardItem key={i}>
                <Title>{obj.name}</Title>
                <Desc>{obj.description}</Desc>
				<ButtonCont>
				<Price>${obj.price}</Price>
				<AddtoCart onPress={() => InsertInCart(obj.name, obj.price)}>
					<CartBtnText>Add To Cart</CartBtnText>
				</AddtoCart>
				</ButtonCont>
            </CardItem>
        ))}
        </>
	);
};

export default ItemCard;
