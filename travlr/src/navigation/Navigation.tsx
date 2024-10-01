import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen, WelcomeScreen } from "../screens"
import { RootStackParamList } from "../types"
import { ThemeProvider, useTheme } from "../theme/ThemeProvider"

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
	// Get the theme and colors from the ThemeProvider
	const { colors, isDarkTheme } = useTheme()

	return (
		<NavigationContainer
			theme={{
				dark: isDarkTheme,
				colors: {
					primary: colors.mainGreen,
					background: "transparent",
					card: colors.background,
					text: colors.text,
					border: colors.accent,
					notification: colors.notification,
				},
			}}>
			<Stack.Navigator
				initialRouteName="Welcome"
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const AppNavigation = () => {
	return (
		<ThemeProvider>
			<Navigation />
		</ThemeProvider>
	)
}

export default AppNavigation