import React, { useState } from "react"
import {
	launchCameraAsync,
	launchImageLibraryAsync,
	useCameraPermissions,
	useMediaLibraryPermissions,
	PermissionStatus,
	ImagePickerResult,
	ImagePickerAsset,
} from "expo-image-picker"
import { Alert, Image, StyleSheet, Text, View } from "react-native"
import OutlineButton from "./OutlineButton"

type ImagePickerProps = {
	onTakeImage: (imageUri: string) => void
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onTakeImage }) => {
	const [pickedImage, setPickedImage] = useState<string | null>(null)
	const [cameraPermissionInformation, requestCameraPermission] =
		useCameraPermissions()
	const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] =
		useMediaLibraryPermissions()

	// Verify camera permissions
	const verifyCameraPermissions = async (): Promise<boolean> => {
		if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestCameraPermission()
			return permissionResponse.granted
		}

		if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant camera permissions to use this app."
			)
			return false
		}

		return true
	}

	// Verify media library permissions
	const verifyMediaLibraryPermissions = async (): Promise<boolean> => {
		if (
			mediaLibraryPermissionInformation?.status ===
			PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestMediaLibraryPermission()
			return permissionResponse.granted
		}

		if (mediaLibraryPermissionInformation?.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant media library permissions to use this app."
			)
			return false
		}

		return true
	}

	// Handler for taking an image with the camera
	const takeImageHandler = async () => {
		const hasCameraPermission = await verifyCameraPermissions()
		if (!hasCameraPermission) return

		try {
			const result: ImagePickerResult = await launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			})

			if (!result.canceled) {
				const imageUri = (result.assets as ImagePickerAsset[])[0].uri
				setPickedImage(imageUri)
				onTakeImage(imageUri) // Save captured image URI
			}
		} catch (error) {
			console.error("Error taking image:", error)
			Alert.alert("Error", "Something went wrong while taking the image.")
		}
	}

	// Handler for picking an image from the library
	const pickImageHandler = async () => {
		const hasLibraryPermission = await verifyMediaLibraryPermissions()
		if (!hasLibraryPermission) return

		try {
			const result: ImagePickerResult = await launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			})

			if (!result.canceled) {
				const imageUri = (result.assets as ImagePickerAsset[])[0].uri
				setPickedImage(imageUri)
				onTakeImage(imageUri) // Save picked image URI
			}
		} catch (error) {
			console.error("Error picking image:", error)
			Alert.alert("Error", "Something went wrong while picking the image.")
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<OutlineButton icon="camera" onPress={takeImageHandler}>
					Take Image
				</OutlineButton>
				<OutlineButton icon="image" onPress={pickImageHandler}>
					Pick Image
				</OutlineButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "space-between",
	},
})

export default ImagePicker
