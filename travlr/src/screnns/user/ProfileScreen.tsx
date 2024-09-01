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
	TouchableOpacity,
} from "react-native"
import { useUser } from "../../context/UserProvider"
import {
	updateUserProfile,
	fetchUserProfile,
	logoutUser,
	uploadImage,
} from "../../api/auth"
import { RootStackParamList, UserProfile } from "../../types/types" // Adjust the import path as
import LogoutButton from "../../components/buttons/LogoutButton"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import Modal from "react-native-modal"
import * as ImagePicker from "expo-image-picker"
import Icon from "react-native-vector-icons/FontAwesome"
import * as FileSystem from "expo-file-system"

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
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	useEffect(() => {
		const loadProfile = async () => {
			if (userId) {
				setLoading(true)
				console.log("Fetching profile for userId:", userId)
				try {
					const result = await fetchUserProfile(userId)
					if (result.success) {
						const profile = result.user as UserProfile
						setFirstName(profile.firstName)
						setLastName(profile.lastName)
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
			Alert.alert("Error", "User ID is missing at update handler.")
			return
		}

		setLoading(true)
		setError(null)

		try {
			const result = await updateUserProfile(userId, {
				firstName,
				lastName,
			})
			if (result.success) {
				Alert.alert("Success", "Profile updated successfully")
				setUserData(result.user as UserProfile)
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
	}, [userId, firstName, lastName, setUserData])

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

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (status !== "granted") {
			Alert.alert(
				"Permission required",
				"Sorry, we need camera roll permissions to make this work!"
			)
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.canceled && result.assets && result.assets.length > 0) {
			const selectedImageUri = result.assets[0].uri
			setPicture(selectedImageUri || "")

			// Handle image upload separately
			try {
				setLoading(true)
				const uploadResult = await uploadImage(userId, selectedImageUri)
				if (uploadResult.success) {
					Alert.alert("Success", "Image updated successfully")
					setUserData((prevData) => ({
						...prevData,
						picture: uploadResult.imageUrl,
					}))
				} else {
					throw new Error(uploadResult.error || "Failed to upload image")
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

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				{picture ? (
					<View style={styles.profileImageContainer}>
						<Image source={{ uri: picture }} style={styles.profileImage} />
						<TouchableOpacity style={styles.editIcon} onPress={pickImage}>
							<Icon name="camera" size={20} color="#fff" />
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.profileImageContainer}>
						<View style={styles.profileImage} />
						<TouchableOpacity style={styles.editIcon} onPress={pickImage}>
							<Icon name="pencil" size={20} color="#fff" />
						</TouchableOpacity>
					</View>
				)}
				<Text style={styles.name}>
					{firstName} {lastName}
				</Text>
				{/* Display the date the profile was created, assuming it's available */}
				{/* For demonstration, a static date is used */}
				<Text style={styles.date}>Joined: {new Date().toDateString()}</Text>
				<TouchableOpacity
					style={styles.editButton}
					onPress={() => setIsModalVisible(true)}>
					<Text style={styles.editButtonText}>Edit Profile</Text>
				</TouchableOpacity>
			</View>

			{/* Modal for Editing Profile */}
			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setIsModalVisible(false)}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Edit Profile</Text>
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

					{error && <Text style={styles.errorText}>{error}</Text>}
					{loading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : (
						<Button title="Save Profile" onPress={handleUpdateProfile} />
					)}
				</View>
			</Modal>

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
	profileContainer: {
		alignItems: "center",
		marginBottom: 160,
		width: "100%",
	},
	profileImageContainer: {
		position: "relative",
		marginBottom: 10,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ddd",
	},
	editIcon: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: "#545454",
		borderRadius: 50,
		padding: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	editIconText: {
		color: "#fff",
		fontSize: 18,
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
	},
	date: {
		fontSize: 16,
		color: "#666",
		marginBottom: 10,
	},
	editButton: {
		marginTop: 15,
		padding: 10,
		backgroundColor: "#545454",
		borderRadius: 5,
	},
	editButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
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
