import React, { useState, useEffect } from "react"
import { View } from "react-native"
import SelectableField from "./SelectableField"

interface TripLocationFormProps {
	locationData: any
	selectedCountry: string
	selectedCity: string
	onCountrySelect: (country: string) => void
	onCitySelect: (city: string) => void
}

const TripLocationForm: React.FC<TripLocationFormProps> = ({
	locationData,
	selectedCountry,
	selectedCity,
	onCountrySelect,
	onCitySelect,
}) => {
	const [cityOptions, setCityOptions] = useState<string[]>([])

	useEffect(() => {
		if (locationData && selectedCountry) {
			const newCityOptions = locationData.cities[selectedCountry] || []
			setCityOptions(newCityOptions)
		} else {
			setCityOptions([])
		}
	}, [locationData, selectedCountry])

	return (
		<View className="flex-row space-x-4 z-10">
			<SelectableField
				label="Country"
				value={selectedCountry}
				options={locationData?.countries || []}
				onSelect={onCountrySelect}
			/>
			<SelectableField
				label="City"
				value={selectedCity}
				options={cityOptions}
				onSelect={onCitySelect}
			/>
		</View>
	)
}

export default TripLocationForm
