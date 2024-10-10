import React, { useState } from "react"
import { TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native"
import { useTripContext } from "../../context/TripContext"
import { useNavigation } from "@react-navigation/native"
import { ROUTES } from "../../constants/strings"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewTrip">

const SendTripButton: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const { tripDetails, images, resetTripContext } = useTripContext()
	const [isLoading, setIsLoading] = useState(false)

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

		// Prepare data to send
		const tripData = {
			...tripDetails,
			images,
		}

		try {
			// Simulating an API call
			await new Promise((resolve) => setTimeout(resolve, 2000))

			// Log the data that would be sent
			console.log("Sending trip data:", tripData)

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

			// Here you would typically reset the form or navigate to a new screen
			// For now, we'll just log a message
			console.log(
				"Trip sent successfully. Form should be reset or navigate away."
			)
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
