import React, { useState, useEffect } from "react"
import { View } from "react-native"
import SelectableField from "../common/SelectableField"
import { useTripContext } from "../../context/TripContext"
import { useLocationData } from "../../hooks"

const TripLocationForm: React.FC = () => {
	const { data: locationData } = useLocationData()
	const { tripDetails, updateCountry, updateCity } = useTripContext()
	const [cityOptions, setCityOptions] = useState<string[]>([])

	useEffect(() => {
		if (locationData && tripDetails.country) {
			const newCityOptions = locationData.cities[tripDetails.country] || []
			setCityOptions(newCityOptions)
		} else {
			setCityOptions([])
		}
	}, [locationData, tripDetails.country])

	return (
		<View className="flex-row space-x-4 z-10">
			<SelectableField
				label="Country"
				value={tripDetails.country}
				options={locationData?.countries || []}
				onSelect={updateCountry}
			/>
			<SelectableField
				label="City"
				value={tripDetails.city}
				options={cityOptions}
				onSelect={updateCity}
			/>
		</View>
	)
}

export default TripLocationForm
