import React, { useState, useEffect, useCallback } from "react"
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
import { updateUserProfile, fetchUserProfile } from "../../api/auth"
import { UserProfile } from "../../types/types" // Import UserProfile type

const ProfileScreen: React.FC = () => {
	const { userId, userData, setUserData } = useUser()
	const [firstName, setFirstName] = useState<string>(userData?.firstName || "")
	const [lastName, setLastName] = useState<string>(userData?.lastName || "")
	const [picture, setPicture] = useState<string>(userData?.picture || "")
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadProfile = async () => {
			if (userId) {
				setLoading(true)
				try {
					const result = await fetchUserProfile(userId)
					if (result.success) {
						const profile = result.user as UserProfile
						setFirstName(profile.firstName || "")
						setLastName(profile.lastName || "")
						setPicture(profile.picture || "")
						setUserData(profile) // Update context with fetched data
					} else {
						throw new Error(result.error || "Failed to fetch profile")
					}
				} catch (err) {
					setError(
						err instanceof Error ? err.message : "An unexpected error occurred"
					)
				} finally {
					setLoading(false)
				}
			}
		}

		loadProfile()
	}, [userId, setUserData])

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
				setUserData(result.user as UserProfile) // Update context with the updated data
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
	}, [userId, firstName, lastName, picture, setUserData])

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
			<Text style={styles.title}>Profile</Text>
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<>
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
					{picture ? (
						<Image source={{ uri: picture }} style={styles.picture} />
					) : null}
					{error && <Text style={styles.errorText}>{error}</Text>}
					<Button title="Save Profile" onPress={handleUpdateProfile} />
				</>
			)}
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
})

export default ProfileScreen
