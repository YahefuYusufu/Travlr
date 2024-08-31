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
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { UserProfile, RootStackParamList } from "../../types/types"
import { logoutUser, updateUserProfile, fetchUserProfile } from "../../api/auth"
import LogoutButton from "../../components/buttons/LogoutButton"
import { useUser } from "../../context/UserProvider"

// Define route and navigation props
type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">
type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Profile"
>

const ProfileScreen: React.FC = () => {
	const route = useRoute<ProfileScreenRouteProp>()
	const navigation = useNavigation<ProfileScreenNavigationProp>()
	const { userId, userData, setUserData } = useUser()

	const [firstName, setFirstName] = useState<string>(userData?.firstName || "")
	const [lastName, setLastName] = useState<string>(userData?.lastName || "")
	const [picture, setPicture] = useState<string>(userData?.picture || "")
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!userId) {
			setError("User ID is missing. Please log in again.")
		}
	}, [userId])

	const handleUpdateProfile = useCallback(async () => {
		if (!userId) {
			Alert.alert("Error", "User ID is missing at ProfileScreen")
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
				setUserData({ ...userData, firstName, lastName, picture }) // Update context with new user data
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
	}, [firstName, lastName, picture, userId, navigation, setUserData])

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
			<View style={styles.container}>
				<Text style={styles.errorText}>
					User ID is missing. Please log in again.
				</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Complete Your Profile</Text>
			<TextInput
				placeholder="First Name"
				value={firstName}
				onChangeText={setFirstName}
				style={styles.input}
			/>
			<TextInput
				placeholder="Last Name"
				value={lastName}
				onChangeText={setLastName}
				style={styles.input}
			/>
			<TextInput
				placeholder="Profile Picture URL"
				value={picture}
				onChangeText={setPicture}
				style={styles.input}
			/>
			{error && <Text style={styles.errorText}>{error}</Text>}
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<Button title="Save Profile" onPress={handleUpdateProfile} />
			)}
			<View style={styles.buttonContainer}>
				<LogoutButton handleLogout={handleLogout} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5,
		backgroundColor: "#fff",
	},
	buttonContainer: {
		marginTop: 20,
	},
	errorText: {
		color: "red",
		marginBottom: 15,
	},
})

export default ProfileScreen
