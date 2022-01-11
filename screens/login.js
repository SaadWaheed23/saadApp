import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';

const Login = () => {
	const Route = useRoute();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const navigation = useNavigation();

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.navigate('Home');
			}
		});
		return unSub;
	}, []);

	const handleSignup = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log(user.email);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log(`Logged in as : ${user.email}`);
				navigation.navigate('Home');
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<SafeAreaView style={styles.container} behavior="padding">
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					style={styles.input}
					secureTextEntry
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleLogin} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSignup} style={styles.buttonSec}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D77FA1'
	},
	input: {
		width: '100%',
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5
	},
	button: {
		width: '100%',
		padding: 15,
		backgroundColor: '#548CFF',
		borderRadius: 10,
		marginBottom: 5,
		alignItems: 'center'
	},
	buttonSec: {
		width: '100%',
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 10,
		backgroundColor: '#7900FF',
		alignItems: 'center'
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	inputContainer: {
		width: '80%'
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
