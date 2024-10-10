import React, { useState, useCallback } from "react"
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

	const updateCountry = useCallback((country: string) => {
		setTripDetails((prev) => ({ ...prev, country }))
	}, [])

	const updateCity = useCallback((city: string) => {
		setTripDetails((prev) => ({ ...prev, city }))
	}, [])

	const updateDate = useCallback((date: Date) => {
		setTripDetails((prev) => ({ ...prev, date }))
	}, [])

	const updateCategory = useCallback((category: string) => {
		setTripDetails((prev) => ({ ...prev, category }))
	}, [])

	const updateSummary = useCallback((summary: string) => {
		setTripDetails((prev) => ({ ...prev, summary }))
	}, [])

	const updateRating = useCallback((rating: number) => {
		setTripDetails((prev) => ({ ...prev, rating }))
	}, [])

	const updateImages = useCallback((newImages: string[]) => {
		setImages(newImages)
	}, [])

	if (loading) return <Text className="flex">Loading...</Text>
	if (error) return <Text>Error: {error.message}</Text>

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header title="Add a New Trip" onBackPress={() => navigation.goBack()} />
			<View className="flex-1 p-4" style={{ zIndex: 1 }}>
				<TripLocationForm
					locationData={data}
					selectedCountry={tripDetails.country}
					selectedCity={tripDetails.city}
					onCountrySelect={updateCountry}
					onCitySelect={updateCity}
				/>
				<TripDateForm date={tripDetails.date} onDateChange={updateDate} />
				<TripDetailsForm
					category={tripDetails.category}
					onCategorySelect={updateCategory}
					summary={tripDetails.summary}
					onSummaryChange={updateSummary}
					rating={tripDetails.rating}
					onRatingChange={updateRating}
				/>
				<ImageCaptureContainer images={images} onImagesUpdate={updateImages} />
			</View>
		</SafeAreaView>
	)
}

export default NewTripScreen
