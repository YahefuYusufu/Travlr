import React, { FC, useCallback } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "../../types/types"
import { StackScreenProps } from "@react-navigation/stack"
import { logoutUser } from "../../api/auth"
import LogoutButton from "../../components/buttons/LogoutButton"

type Props = StackScreenProps<RootStackParamList, "Profile">

const ProfileScreen: FC<Props> = ({ navigation }) => {
	const handleLogout = useCallback(async () => {
		try {
			await logoutUser()
			navigation.navigate("Login")
		} catch (error) {
			console.error("Logout error:", error)
			Alert.alert("Logout failed", "An error occurred while logging out.")
		}
	}, [])
	return (
		<View style={s.container}>
			<Text>Profile screen</Text>
			<View style={s.buttonContainer}>
				<LogoutButton handleLogout={handleLogout} />
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
