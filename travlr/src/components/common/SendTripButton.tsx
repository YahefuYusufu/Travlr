import React, { useState } from "react"
import { TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native"
import { useTripContext } from "../../context/TripContext"
import { useNavigation } from "@react-navigation/native"
import { ROUTES } from "../../constants/strings"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types"
import { sendTrip } from "../../hooks/useTrips"
import { uploadImage } from "../../utils/uploadImage" // You'll need to create this

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewTrip">

const SendTripButton: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const { tripDetails, resetTripContext, updateImages } = useTripContext()
	const [isLoading, setIsLoading] = useState(false)

	const uploadImages = async (images: string[]): Promise<string[]> => {
		const uploadedUrls = await Promise.all(
			images.map(async (imageUri) => {
				try {
					return await uploadImage(imageUri)
				} catch (error) {
					console.error("Error uploading image:", error)
					return null
				}
			})
		)
		return uploadedUrls.filter((url): url is string => url !== null)
	}

	const handleSendTrip = async () => {
		setIsLoading(true)

		// Validate trip details
		if (!tripDetails.country || !tripDetails.city || !tripDetails.date) {
			Alert.alert(
				"Incomplete Details",
				"Please fill in all required trip details before sending."
			)
			setIsLoading(false)
			return
		}

		try {
			// Upload images first
			const uploadedImageUrls = await uploadImages(tripDetails.images)

			// Update trip details with uploaded image URLs
			const updatedTripDetails = {
				...tripDetails,
				images: uploadedImageUrls,
			}

			console.log(
				"Sending trip data:",
				JSON.stringify(updatedTripDetails, null, 2)
			)
			const response = await sendTrip(updatedTripDetails)
			console.log("Response from server:", JSON.stringify(response, null, 2))

			// Show success message
			Alert.alert("Success", "Your trip has been successfully sent!", [
				{
					text: "OK",
					onPress: () => {
						// Reset the trip context
						resetTripContext()
						// Navigate back to the home screen
						navigation.navigate(ROUTES.HOME)
					},
				},
			])
		} catch (error) {
			console.error("Error sending trip:", error)
			Alert.alert("Error", "Failed to send trip. Please try again later.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<TouchableOpacity
			onPress={handleSendTrip}
			disabled={isLoading}
			style={{
				backgroundColor: isLoading ? "#cccccc" : "#007AFF",
				padding: 15,
				borderRadius: 5,
				alignItems: "center",
				marginTop: 20,
			}}>
			{isLoading ? (
				<ActivityIndicator color="#ffffff" />
			) : (
				<Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}>
					Send Trip
				</Text>
			)}
		</TouchableOpacity>
	)
}

export default SendTripButton
