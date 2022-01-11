import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import BNavText from './bNavText';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const BottomTabNav = styled.View`
	height: 50px;
	position: absolute;
	bottom: 0;
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const BottomNav = (props) => {
	const navigation = useNavigation();

	const [ route, setRoute ] = useState('');

	const HandleAddProduct = () => {
		navigation.navigate('Add_Product');
	};

	const HandleSettings = () => {
		navigation.navigate('Settings');
	};

	const HandleHome = () => {
		navigation.navigate('Home');
	};

	const state = useNavigationState((state) => state);

	const BottomDivRenderer = () => {
		if (state) {
			const routes = state.routes;
			let routeName = routes[routes.length - 1].name;
			return (
				<>
				{routeName == 'Login' ? (
					<></>
				) : (
					<BottomTabNav>
					<BNavText text="Home" TapFunction={HandleHome} />
					<BNavText text="Add Product" TapFunction={HandleAddProduct} />
					<BNavText text="Settings" TapFunction={HandleSettings} />
				</BottomTabNav>
				)}
				</>
			);
		}
	}

	return (
		<>
		{BottomDivRenderer()}
		</>
	);
};

export default BottomNav;
