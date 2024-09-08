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
			let uploadedImageFile: File | undefined

			// Upload the image if a new one is selected
			if (imageUri && imageUri !== currentImageUri) {
				const uploadResult = await uploadImage(userId, imageUri)

				if (uploadResult.success && uploadResult.imageUri) {
					const blob = await fetch(uploadResult.imageUri).then((res) =>
						res.blob()
					)

					// Fix: Ensure 'lastModified' is passed in BlobOptions
					const lastModified = new Date().getTime()
					uploadedImageFile = new File([blob], "image.jpg", {
						type: blob.type,
						lastModified,
					})
				} else {
					throw new Error(uploadResult.error || "Failed to upload image")
				}
			}

			// Fix: Ensure imageUri is explicitly passed as a string or null
			const updateResult = await updateUserProfile(
				userId,
				firstName,
				lastName,
				uploadedImageFile || undefined // Ensure the type matches File | undefined
			)

			if (!updateResult.success) {
				throw new Error(updateResult.error || "Failed to update profile")
			}

			// Call the parent onSave with updated profile data
			onSave(firstName, lastName, updateResult.imageUri ?? null) // Handle undefined by using null
			onClose() // Close modal after saving
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
