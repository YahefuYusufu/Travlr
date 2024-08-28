import React, { FC, useCallback, useEffect, useState } from "react"
import {
	ActivityIndicator,
	Alert,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native"
import { RootStackParamList } from "../../types/types"
import { logoutUser, updateUserProfile } from "../../api/auth"
import LogoutButton from "../../components/buttons/LogoutButton"
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

// Define route and navigation props
type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">
type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Profile"
>

const ProfileScreen: FC = () => {
	const route = useRoute<ProfileScreenRouteProp>()
	const navigation = useNavigation<ProfileScreenNavigationProp>()

	const { userId } = route.params || {} // Safeguard for route.params

	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [picture, setPicture] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Log userId for debugging
		console.log("ProfileScreen loaded, userId:", userId)

		if (!userId) {
			setError("User ID is Missing. Please log in again.")
		}
	}, [userId])

	const handleUpdateProfile = useCallback(async () => {
		if (!userId) {
			Alert.alert("Error", "User ID is missing.")
			return
		}

		setLoading(true)
		setError(null)

		try {
			const result = await updateUserProfile(userId, {
				firstName,
				lastName,
				picture,
			})

			if (result.success) {
				Alert.alert("Success", "Profile updated successfully")
				navigation.navigate("Tabs", { userId }) // Ensure `userId` is passed
			} else {
				throw new Error(result.error || "An unexpected error occurred")
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "An unexpected error occurred"
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}, [firstName, lastName, picture, userId, navigation])

	const handleLogout = useCallback(async () => {
		try {
			await logoutUser()
			navigation.navigate("Login")
		} catch (error) {
			console.error("Logout error:", error)
			Alert.alert("Logout failed", "An error occurred while logging out.")
		}
	}, [navigation])

	// Safeguard in case `userId` is undefined
	if (!userId) {
		return (
			<View style={s.container}>
				<Text style={s.errorText}>
					User ID is missing. Please log in again.
				</Text>
			</View>
		)
	}

	return (
		<View style={s.container}>
			<Text style={s.title}>Complete Your Profile</Text>
			<TextInput
				placeholder="First Name"
				value={firstName}
				onChangeText={setFirstName}
				style={s.input}
			/>
			<TextInput
				placeholder="Last Name"
				value={lastName}
				onChangeText={setLastName}
				style={s.input}
			/>
			<TextInput
				placeholder="Profile Picture URL"
				value={picture}
				onChangeText={setPicture}
				style={s.input}
			/>
			{error && <Text style={s.errorText}>{error}</Text>}
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<Button title="Save Profile" onPress={handleUpdateProfile} />
			)}
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
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: "100%",
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginBottom: 15,
		backgroundColor: "#fff",
	},
	errorText: {
		color: "red",
		marginBottom: 15,
	},
	buttonContainer: {
		position: "absolute",
		top: 40,
		right: 40,
	},
})

export default ProfileScreen
