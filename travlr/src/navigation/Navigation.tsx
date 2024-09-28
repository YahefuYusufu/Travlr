import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen, WelcomeScreen } from "../screens"
import { RootStackParamList } from "../types"

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Welcome"
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
