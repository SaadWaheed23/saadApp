import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import { useNavigation} from '@react-navigation/native';
import NavCards from '../components/navCards';
import BottomNav from '../components/bottomNav';
import ItemCard from '../components/itemCard';
import { firestoreDb, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MainArea = styled.SafeAreaView`
	flex: 1;
	justify-content: flex-end;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
	background-color: #D77FA1;
	position: relative;
`;

const Nav = styled.View`height: 10%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	background-color: white;
`;

const UserName = styled.Text`
	font-weight: bold;
	color: #3F3F3F;
	font-size: 20px;
`

const CartBtn = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	background-color: pink;
	position: absolute;
	top: 100;
	z-index: 1;
	right: 30;
	border-radius: 50;
	display: flex;
	justify-content: center;
	align-items: center;
`

const CartText = styled.Text`
	font-weight: bold;
	color: white;
`

const Home = () => {

	const navigation = useNavigation();

	const OpenCart = () => {
		navigation.push('Cart');
	}
	
	const user = auth.currentUser?.email.split('@')[0];

	return (
		<MainArea>
			<Nav>
				<UserName>
					Welcome {user}
				</UserName>
			</Nav>
			<CartBtn onPress={OpenCart}><CartText>Cart</CartText></CartBtn>	
				<FlatList
					data={[ { name: 1 }]}
					renderItem={() => <ItemCard />}
					keyExtractor={(item) => item.name}
					contentContainerStyle={{ padding: 16 }}
				/>
		</MainArea>
	);
};

export default Home;
