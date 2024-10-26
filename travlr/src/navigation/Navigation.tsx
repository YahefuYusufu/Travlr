// navigation/Navigation.tsx
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
	HomeScreen,
	WelcomeScreen,
	DestinationScreen,
	NewTripScreen,
	AllImageScreen,
} from "../screens"
import { RootStackParamList } from "../types"
import { ThemeProvider, useTheme } from "../theme/ThemeProvider"
import { ROUTES } from "../constants/strings"

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
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
				initialRouteName={ROUTES.WELCOME}
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
				<Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
				<Stack.Screen name={ROUTES.DESTINATION} component={DestinationScreen} />
				<Stack.Screen
					name={ROUTES.NEWTRIP}
					component={NewTripScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={ROUTES.ALLIMAGES}
					component={AllImageScreen}
					options={{
						headerShown: false,
					}}
				/>
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
