import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../screnns/user/LoginScreen"
import SignupScreen from "../screnns/user/SignupScreen"

const Stack = createStackNavigator()

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
