import React, { useState, useEffect } from "react"
import { View, SafeAreaView, Text, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { CalendarDaysIcon } from "react-native-heroicons/outline"
import Header from "../components/common/Header"
import SelectableField from "../components/trip/SelectableField"
import { useLocationData } from "../hooks"
import DatePickerField from "../components/trip/DatePickerField"
import CategorySelector from "../components/trip/CategorySelector"
import CategoryDropdown from "../components/trip/CategoryDropdown"

const NewTripScreen: React.FC = () => {
	const navigation = useNavigation()
	const { data, loading, error } = useLocationData()
	const [selectedCountry, setSelectedCountry] = useState("")
	const [selectedCity, setSelectedCity] = useState("")
	const [cityOptions, setCityOptions] = useState<string[]>([])
	const [tripDate, setTripDate] = useState(new Date())

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

	const handleDateChange = (date: Date) => {
		setTripDate(date)
	}

	if (loading) {
		return <Text>Loading...</Text>
	}

	if (error) {
		return <Text>Error: {error.message}</Text>
	}
	const categories = ["Favorites", "Best", "Popular", "New"] // Define categories here

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header title="Add a New Trip" onBackPress={() => navigation.goBack()} />

			<View className="p-4">
				<View className="flex-row space-x-4 ">
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
				<DatePickerField
					label="Trip Date"
					date={tripDate}
					onDateChange={handleDateChange}
				/>

				{/* Container for Category Selector */}
				<ScrollView
					className="mt-4 p-1 bg-green-500  rounded-lg shadow-md"
					style={{ height: 250 }}>
					<CategoryDropdown />
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

export default NewTripScreen
