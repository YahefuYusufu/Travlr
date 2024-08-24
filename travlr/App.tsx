import { StatusBar } from "expo-status-bar"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"

import LoginScreen from "./src/screnns/user/LoginScreen"
import SignupScreen from "./src/screnns/user/SignupScreen"
import { RootStackParamList } from "./src/types/types"
import HomeTabs from "./src/screnns/user/tabScreen/HomeTabs"

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
	return (
		<View style={styles.container}>
			<NavigationContainer>
				<StatusBar style="auto" />
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Signup"
						component={SignupScreen}
						options={{
							headerShown: true,
							headerTitle: "",
							headerLeft: ({ onPress }) => (
								<TouchableOpacity onPress={onPress} style={{ paddingLeft: 15 }}>
									<Ionicons name="arrow-back" size={24} color="#333" />
								</TouchableOpacity>
							),
							headerStyle: {
								backgroundColor: "#fff",
								shadowOpacity: 0,
								elevation: 0,
							},
							headerTintColor: "#333",
						}}
					/>
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "green",
	},
})
