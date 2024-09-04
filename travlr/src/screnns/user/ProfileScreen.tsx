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
import { updateUserProfile, logoutUser } from "../../api/auth"
import {
	RootStackParamList,
	UserProfile,
	UploadImageResponse,
} from "../../types/types"
import LogoutButton from "../../components/buttons/LogoutButton"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import Modal from "react-native-modal"
import * as ImagePicker from "expo-image-picker"
import { uploadImage, getProfileWithImage } from "../../api/userApi"

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
	const [picture, setPicture] = useState<string>(userData?.imageUri || "")
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	useEffect(() => {
		const loadProfile = async () => {
			if (userId) {
				setLoading(true)
				try {
					const result = await getProfileWithImage(userId)
					if (result.success && result.profile) {
						const profile = result.profile as UserProfile
						setFirstName(profile.firstName)
						setLastName(profile.lastName)
						setPicture(profile.imageUri || "")
						setUserData(profile)
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
				imageUri: picture,
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
			setIsModalVisible(false) // Close the modal after successful update
		}
	}, [userId, firstName, lastName, picture, setUserData])

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

			if (!userId) {
				setError("User ID is not available.")
				return
			}

			try {
				setLoading(true)
				const uploadResult: UploadImageResponse = await uploadImage(
					userId,
					selectedImageUri
				)
				if (uploadResult.success && uploadResult.imageUri) {
					setPicture(uploadResult.imageUri)

					// Update user data with the new image URI
					const updatedProfile: UserProfile = {
						...userData!,
						imageUri: uploadResult.imageUri,
					}
					setUserData(updatedProfile)
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
				<TouchableOpacity onPress={() => setIsModalVisible(true)}>
					{picture ? (
						<Image source={{ uri: picture }} style={styles.profileImage} />
					) : (
						<View style={styles.profileImagePlaceholder} />
					)}
				</TouchableOpacity>
				<Text style={styles.name}>
					{firstName} {lastName}
				</Text>
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

					{/* Image Picker */}
					<TouchableOpacity onPress={pickImage}>
						<View style={styles.imagePickerContainer}>
							{picture ? (
								<Image
									source={{ uri: picture }}
									style={styles.modalProfileImage}
								/>
							) : (
								<View style={styles.modalProfileImagePlaceholder} />
							)}
							<Text style={styles.changePictureText}>
								Change Profile Picture
							</Text>
						</View>
					</TouchableOpacity>

					{/* First Name Input */}
					<TextInput
						placeholder="First Name"
						value={firstName}
						onChangeText={setFirstName}
						style={styles.input}
					/>

					{/* Last Name Input */}
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
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ddd",
		marginBottom: 10,
	},
	profileImagePlaceholder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ddd",
		marginBottom: 10,
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
		color: "green",
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
	imagePickerContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	modalProfileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ddd",
		marginBottom: 10,
	},
	modalProfileImagePlaceholder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ddd",
		marginBottom: 10,
	},
	changePictureText: {
		fontSize: 16,
		color: "#007BFF",
		marginTop: 10,
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
	},
	errorText: {
		color: "red",
		marginBottom: 15,
	},
	buttonContainer: {
		marginTop: 20,
	},
})

export default ProfileScreen
