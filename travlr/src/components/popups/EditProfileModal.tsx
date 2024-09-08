import React, { useState } from "react"
import {
	Modal,
	View,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Image,
	Text,
	ActivityIndicator,
} from "react-native"
import * as ImagePicker from "expo-image-picker"

import { updateUserProfile, uploadImage } from "../../api/userApi"
import { convertUriToFile } from "../../utils/helpers"
import axios from "axios"
import { API_URL } from "@env"

interface EditProfileModalProps {
	visible: boolean
	onClose: () => void
	onSave: (firstName: string, lastName: string, imageUri: string | null) => void
	currentFirstName: string
	currentLastName: string
	currentImageUri: string
	userId: string
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
	visible,
	onClose,
	onSave,
	currentFirstName,
	currentLastName,
	currentImageUri,
	userId,
}) => {
	const [firstName, setFirstName] = useState(currentFirstName)
	const [lastName, setLastName] = useState(currentLastName)
	const [imageUri, setImageUri] = useState(currentImageUri || null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

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
			setImageUri(selectedImageUri)
		}
	}

	const handleSave = async () => {
		setLoading(true)

		try {
			// Prepare form data to send all in one request
			const formData = new FormData()
			formData.append("firstName", firstName)
			formData.append("lastName", lastName)

			if (imageUri && imageUri !== currentImageUri) {
				const imageFile = await convertUriToFile(imageUri) // Convert the URI to a File object
				formData.append("file", imageFile) // Append the image file to the form data
			}

			// Send the form data in a single request
			const response = await axios.post(
				`${API_URL}/profiles/users/${userId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)

			if (response.status === 200) {
				// If the update was successful, update the local state with new data
				const { profile } = response.data
				onSave(profile.firstName, profile.lastName, profile.imageUri)
				onClose()
			} else {
				throw new Error("Failed to update profile")
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal visible={visible} animationType="slide" transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					{/* Profile Image */}
					<TouchableOpacity onPress={pickImage}>
						{imageUri ? (
							<Image source={{ uri: imageUri }} style={styles.profileImage} />
						) : (
							<View style={styles.imagePlaceholder}>
								<Text>Select an Image</Text>
							</View>
						)}
					</TouchableOpacity>

					{/* Name Input Fields */}
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

					{/* Error Message */}
					{error && <Text style={styles.errorText}>{error}</Text>}

					{/* Loading Indicator */}
					{loading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : (
						<>
							<Button title="Save" onPress={handleSave} />
							<Button title="Cancel" onPress={onClose} color="red" />
						</>
					)}
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 5,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	imagePlaceholder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	input: {
		borderBottomWidth: 1,
		marginBottom: 10,
		padding: 5,
	},
	errorText: {
		color: "red",
		marginBottom: 10,
	},
})

export default EditProfileModal
