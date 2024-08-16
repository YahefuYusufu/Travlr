import React, { FC, useCallback } from "react"
import { View, Text, Button, StyleSheet, Alert } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../../types/types"
import { logoutUser } from "../../api/auth"

type Props = StackScreenProps<RootStackParamList, "Home">

const HomeScreen: FC<Props> = ({ navigation }) => {
	const handleLogout = useCallback(async () => {
		try {
			await logoutUser()
			// navigation.navigate("Login",{clearImmediate:true})
		} catch (error) {
			console.error("Logout error:", error)
			Alert.alert("Logout failed", "An error occurred while logging out.")
		}
	}, [])

	return (
		<View style={s.container}>
			<Text>HomeScreen</Text>
			<View style={s.buttonContainer}>
				<Button title="Logout" onPress={handleLogout} />
			</View>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		position: "absolute",
		top: 20,
		right: 20,
	},
})

export default HomeScreen
