import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../screnns/user/LoginScreen"
import SignupScreen from "../screnns/user/SignupScreen"
import HomeScreen from "../screnns/user/HomeScreen"

const Stack = createStackNavigator()

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
