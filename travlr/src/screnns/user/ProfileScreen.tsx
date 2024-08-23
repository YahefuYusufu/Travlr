import React, { FC, useCallback } from "react"
import { Alert, Button, StyleSheet, View } from "react-native"
import { RootStackParamList } from "../../types/types"
import { StackScreenProps } from "@react-navigation/stack"
import { logoutUser } from "../../api/auth"

type Props = StackScreenProps<RootStackParamList, "Profile">

const ProfileScreen: FC<Props> = ({ navigation }) => {
	const handleLogout = useCallback(async () => {
		try {
			await logoutUser()
			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }],
			})
		} catch (error) {
			console.error("Logout error:", error)
			Alert.alert("Logout failed", "An error occurred while logging out.")
		}
	}, [navigation])

	return (
		<View>
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
		top: 40,
		right: 40,
	},
})

export default ProfileScreen
