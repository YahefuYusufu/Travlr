import React, { useState } from "react"
import { View, SafeAreaView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/common/Header"
import { useLocationData } from "../hooks"
import TripLocationForm from "../components/trip/TripLocationForm"
import TripDateForm from "../components/trip/TripDateForm"
import TripDetailsForm from "../components/trip/TripDetailsForm"
import ImageCaptureContainer from "../components/trip/ImageCaptureContainer"

const NewTripScreen: React.FC = () => {
	const navigation = useNavigation()
	const { data, loading, error } = useLocationData()
	const [tripDetails, setTripDetails] = useState({
		country: "",
		city: "",
		date: new Date(),
		category: "",
		summary: "",
		rating: 0,
	})
	const [images, setImages] = useState<string[]>([])

	if (loading) {
		return <Text className="flex">Loading...</Text>
	}

	if (error) {
		return <Text>Error: {error.message}</Text>
	}

	const updateTripDetails = (field: string, value: string | Date | number) => {
		setTripDetails((prev) => ({ ...prev, [field]: value }))
	}

	const handleGalleryPick = () => {
		// Implement gallery pick functionality
		console.log("Pick from gallery")
	}

	const handleCameraCapture = () => {
		// Implement camera capture functionality
		console.log("Capture from camera")
	}
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header title="Add a New Trip" onBackPress={() => navigation.goBack()} />

			<View className="flex-1 p-4" style={{ zIndex: 1 }}>
				<TripLocationForm
					locationData={data}
					selectedCountry={tripDetails.country}
					selectedCity={tripDetails.city}
					onCountrySelect={(country) => updateTripDetails("country", country)}
					onCitySelect={(city) => updateTripDetails("city", city)}
				/>
				<TripDateForm
					date={tripDetails.date}
					onDateChange={(date) => updateTripDetails("date", date)}
				/>
				<TripDetailsForm
					category={tripDetails.category}
					onCategorySelect={(category) =>
						updateTripDetails("category", category)
					}
					summary={tripDetails.summary}
					onSummaryChange={(summary) => updateTripDetails("summary", summary)}
					rating={tripDetails.rating}
					onRatingChange={(rating) => updateTripDetails("rating", rating)}
				/>

				<ImageCaptureContainer
					onGalleryPick={handleGalleryPick}
					onCameraCapture={handleCameraCapture}
					images={images}
				/>
			</View>
		</SafeAreaView>
	)
}

export default NewTripScreen
