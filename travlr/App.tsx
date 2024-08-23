import { StatusBar } from "expo-status-bar"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "./src/screnns/user/LoginScreen"
import SignupScreen from "./src/screnns/user/SignupScreen"
import HomeScreen from "./src/screnns/user/HomeScreen"
import { RootStackParamList } from "./src/types/types"
import HomeTabs from "./src/screnns/user/tabScreen/HomeTabs"

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				<Stack.Screen
					name="Home"
					component={HomeTabs}
					options={{
						headerShown: false,
						headerLeft: undefined,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
