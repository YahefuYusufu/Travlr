import React, { useState, useEffect } from "react"
import { View, SafeAreaView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/common/Header"
import SelectableField from "../components/trip/SelectableField"
import { useLocationData } from "../hooks"

const NewTripScreen: React.FC = () => {
	const navigation = useNavigation()
	const { data, loading, error } = useLocationData()
	const [selectedCountry, setSelectedCountry] = useState("")
	const [selectedCity, setSelectedCity] = useState("")
	const [cityOptions, setCityOptions] = useState<string[]>([])

	useEffect(() => {
		if (data && selectedCountry) {
			const newCityOptions = data.cities[selectedCountry] || []
			setCityOptions(newCityOptions)
		} else {
			setCityOptions([])
		}
	}, [data, selectedCountry])

	const handleCountrySelect = (country: string) => {
		setSelectedCountry(country)
		setSelectedCity("")
	}

	const handleCitySelect = (city: string) => {
		setSelectedCity(city)
	}

	if (loading) {
		return <Text>Loading...</Text>
	}

	if (error) {
		return <Text>Error: {error.message}</Text>
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header title="New Trip Screen" onBackPress={() => navigation.goBack()} />
			<View className="p-4 flex-row space-x-4">
				<SelectableField
					label="Country"
					value={selectedCountry}
					options={data?.countries || []}
					onSelect={handleCountrySelect}
				/>
				<SelectableField
					label="City"
					value={selectedCity}
					options={cityOptions}
					onSelect={handleCitySelect}
				/>
			</View>
		</SafeAreaView>
	)
}

export default NewTripScreen
