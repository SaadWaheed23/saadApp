import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDb } from '../firebase';

const MainArea = styled.SafeAreaView`
	flex: 1;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
	background-color: #d77fa1;
`;

const CartCard = styled.View`
	width: 100%;
	background-color: white;
	border-radius: 20px;
	padding: 20px 30px;
`;

const Cart = () => {
	const [ Res, setRes ] = useState([]);

	useEffect(() => {
		ReadData();
	}, []);

	const arr = [];

	const ReadData = async () => {
		const querySnapshot = await getDocs(collection(firestoreDb, 'cart'));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			arr.push(doc.data());
		});
		setRes(arr);
	};

	console.log(Res);

	return (
		<MainArea>
			<CartCard>
				{Res.map((obj, i) => (
					<View key={i}>
						<Text>{obj.name}</Text>
					</View>
				))}
			</CartCard>
		</MainArea>
	);
};

export default Cart;
