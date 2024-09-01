import React, { useState, useCallback, useEffect } from "react"
import {
	ActivityIndicator,
	Alert,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
} from "react-native"
import { useUser } from "../../context/UserProvider"
import { updateUserProfile, fetchUserProfile, logoutUser } from "../../api/auth"
import { RootStackParamList, UserProfile } from "../../types/types" // Adjust the import path as
import LogoutButton from "../../components/buttons/LogoutButton"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"

type Props = StackScreenProps<RootStackParamList, "Tabs">
type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Profile"
>

const ProfileScreen: React.FC<Props> = () => {
	const { userId, userData, setUserData } = useUser()
	const navigation = useNavigation<ProfileScreenNavigationProp>()
	const [firstName, setFirstName] = useState<string>(userData?.firstName || "")
	const [lastName, setLastName] = useState<string>(userData?.lastName || "")
	const [picture, setPicture] = useState<string>(userData?.picture || "")
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	// useEffect(() => {
	// 	const loadProfile = async () => {
	// 		if (userId) {
	// 			setLoading(true)
	// 			console.log("Fetching profile for userId:", userId);
	// 			try {
	// 				const result = await fetchUserProfile(userId)
	// 				if (result.success) {
	// 					const profile = result.user as UserProfile // Adjust this based on your API response
	// 					setFirstName(profile.firstName)
	// 					setLastName(profile.lastName)
	// 					setPicture(profile.picture || "")
	// 					setUserData(profile) // Update context with fetched data
	// 				} else {
	// 					throw new Error(result.error || "Failed to fetch profile")
	// 				}
	// 			} catch (err) {
	// 				setError(
	// 					err instanceof Error ? err.message : "An unexpected error occurred"
	// 				)
	// 			} finally {
	// 				setLoading(false)
	// 			}
	// 		}
	// 	}

	// 	loadProfile()
	// }, [userId, setUserData])

	useEffect(() => {
		// Log userId for debugging
		console.log("ProfileScreen loaded, userId:", userId)

		if (!userId) {
			setError("User ID is missing. Please log in again.")
		}
	}, [userId])

	const handleUpdateProfile = useCallback(async () => {
		if (!userId) {
			Alert.alert("Error", "User ID is missing at update handler.")
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
				setUserData(result.user as UserProfile)
				navigation.navigate("Home", { userId })
			} else {
				throw new Error(result.error || "An unexpected error occurred")
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			)
		} finally {
			setLoading(false)
		}
	}, [userId, firstName, lastName, picture, setUserData, navigation])

	const handleLogout = useCallback(async () => {
		try {
			await logoutUser()
			setUserData(null) // Clear userData from context
			navigation.navigate("Login")
		} catch (error) {
			console.error("Logout error:", error)
			Alert.alert("Logout failed", "An error occurred while logging out.")
		}
	}, [navigation, setUserData])
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
	picture: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginVertical: 10,
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
