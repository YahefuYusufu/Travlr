// NewTripScreen.tsx
import React, { useEffect } from "react"
import { View, SafeAreaView, Text, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/common/Header"
import { useLocationData } from "../hooks"
import TripLocationForm from "../components/trip/TripLocationForm"
import TripDateForm from "../components/trip/TripDateForm"
import TripDetailsForm from "../components/trip/TripDetailsForm"
import ImageCaptureContainer from "../components/trip/ImageCaptureContainer"
import { useTripContext } from "../context/TripContext"
import SendTripButton from "../components/common/SendTripButton"

const NewTripScreen: React.FC = () => {
	const navigation = useNavigation()
	const { loading, error } = useLocationData()
	const { tripDetails } = useTripContext()

	useEffect(() => {
		console.log("Current tripDetails:", JSON.stringify(tripDetails, null, 2))
	}, [tripDetails])

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="gray" />
				<Text className="mt-4 text-lg text-gray-600">Loading trip data...</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<Text className="text-lg text-red-500">Error: {error.message}</Text>
				<Text className="mt-2 text-gray-600">Please try again later.</Text>
			</View>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header
				title="Where have you been?"
				onBackPress={() => navigation.goBack()}
			/>
			<View className="flex-1 p-4" style={{ zIndex: 1 }}>
				<TripLocationForm />
				<TripDateForm />
				<TripDetailsForm />
				<ImageCaptureContainer />
				<SendTripButton />
			</View>
		</SafeAreaView>
	)
}

export default NewTripScreen
