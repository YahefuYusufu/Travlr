import React, { useState } from "react"
import { TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native"
import { useTripContext } from "../../context/TripContext"
import { useNavigation } from "@react-navigation/native"
import { ROUTES } from "../../constants/strings"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types"
import { sendTrip } from "../../hooks/useTrips"
import { uploadImage } from "../../utils/uploadImage"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewTrip">

const SendTripButton: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const { tripDetails, resetTripContext } = useTripContext()
	const [isLoading, setIsLoading] = useState(false)

	const handleSendTrip = async () => {
		setIsLoading(true)

		if (!tripDetails.country || !tripDetails.city || !tripDetails.date) {
			Alert.alert(
				"Incomplete Details",
				"Please fill in all required trip details before sending."
			)
			setIsLoading(false)
			return
		}

		try {
			// First, send the trip without images
			const tripWithoutImages = { ...tripDetails, images: [] }
			console.log(
				"Sending trip data:",
				JSON.stringify(tripWithoutImages, null, 2)
			)
			const response = await sendTrip(tripWithoutImages)
			console.log("Response from server:", JSON.stringify(response, null, 2))

			// Now that we have the trip ID, upload images
			if (response._id && tripDetails.images && tripDetails.images.length > 0) {
				const uploadedImageUrls = await Promise.all(
					tripDetails.images.map((imageUri) =>
						uploadImage(imageUri, response._id)
					)
				)
				console.log("Uploaded image URLs:", uploadedImageUrls)
			}

			Alert.alert("Success", "Your trip has been successfully sent!", [
				{
					text: "OK",
					onPress: () => {
						resetTripContext()
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
