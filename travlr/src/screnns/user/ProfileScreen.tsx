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
import { logoutUser } from "../../api/auth"
import {
	RootStackParamList,
	UserProfile,
	UploadImageResponse,
} from "../../types/types"
import { BlurView } from "expo-blur"

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"

import EditProfileModal from "../../components/popups/EditProfileModal"

type Props = StackScreenProps<RootStackParamList, "Tabs">
type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Profile"
>

const ProfileScreen: React.FC<Props> = () => {
	const { userData, setUserData, userId } = useUser() // Get the user data from the context
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [firstName, setFirstName] = useState(userData?.firstName || "")
	const [lastName, setLastName] = useState(userData?.lastName || "")
	const [picture, setPicture] = useState(userData?.imageUri || "")

	// Function to open the modal
	const handleEditPress = () => {
		if (userId) {
			setIsModalVisible(true)
		} else {
			console.error("User ID is not available.")
		}
	}

	// Function to close the modal
	const handleCloseModal = () => {
		setIsModalVisible(false)
	}

	// Function to save updated profile data
	const handleSave = (
		newFirstName: string,
		newLastName: string,
		newImageUri: string | null
	) => {
		setFirstName(newFirstName)
		setLastName(newLastName)
		if (newImageUri) {
			setPicture(newImageUri)
		}

		// Update userData in context with the new information
		setUserData({
			...userData!,
			firstName: newFirstName,
			lastName: newLastName,
			imageUri: newImageUri || picture,
		})

		handleCloseModal() // Close modal after saving
	}

	return (
		<View style={styles.container}>
			{/* Blur the background when modal is open */}
			{isModalVisible && (
				<BlurView style={styles.absolute} intensity={50} tint="light" />
			)}

			<View style={styles.profileContainer}>
				{/* Profile Image */}
				<TouchableOpacity onPress={handleEditPress}>
					{picture ? (
						<Image source={{ uri: picture }} style={styles.profileImage} />
					) : (
						<View style={styles.profileImagePlaceholder} />
					)}
				</TouchableOpacity>

				{/* Name and other profile details */}
				<Text style={styles.name}>
					{firstName} {lastName}
				</Text>
				<Text style={styles.date}>Joined: {new Date().toDateString()}</Text>

				{/* Edit Button */}
				<TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
					<Text style={styles.editButtonText}>Edit Profile</Text>
				</TouchableOpacity>
			</View>

			{/* Edit Profile Modal */}
			{userId && (
				<EditProfileModal
					visible={isModalVisible}
					onClose={handleCloseModal}
					onSave={handleSave}
					currentFirstName={firstName}
					currentLastName={lastName}
					currentImageUri={picture}
					userId={userId}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	profileContainer: {
		alignItems: "center",
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	profileImagePlaceholder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
	},
	date: {
		fontSize: 14,
		color: "gray",
		marginBottom: 10,
	},
	editButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#007BFF",
		borderRadius: 5,
	},
	editButtonText: {
		color: "white",
		fontSize: 16,
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
})

export default ProfileScreen
