import React, { useState } from "react"
import { View, Text, TouchableOpacity, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { CalendarDaysIcon } from "react-native-heroicons/solid"
import { useTripContext } from "../../context/TripContext"

const DatePickerField: React.FC = () => {
	const { tripDetails, updateDate } = useTripContext()
	const [showPicker, setShowPicker] = useState(false)

	const onChange = (event: any, selectedDate?: Date) => {
		if (Platform.OS === "ios") {
			setShowPicker(false) // Close picker immediately on iOS
		}
		if (selectedDate) {
			updateDate(selectedDate)
			if (Platform.OS === "android") {
				setShowPicker(false) // Close picker after selecting date on Android
			}
		}
	}

	const toggleDatepicker = () => {
		setShowPicker(!showPicker)
	}

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	return (
		<View className="mt-4 mb-4">
			<Text className="text-sm font-bold mb-2 text-gray-700">Trip Date</Text>
			<TouchableOpacity
				onPress={toggleDatepicker}
				className="flex-row items-center justify-between bg-gray-100 rounded-lg p-3 border border-gray-300">
				<View className="flex-row items-center">
					{showPicker ? (
						<View className="bg-blue-500 rounded-full border border-blue-500 p-2 mr-3">
							<CalendarDaysIcon size={24} color={"white"} />
						</View>
					) : (
						<View className="bg-gray-500 rounded-full border border-gray-500 p-2 mr-3">
							<CalendarDaysIcon size={24} color={"white"} />
						</View>
					)}
					<Text className="text-base font-medium text-gray-800">
						{formatDate(tripDetails.date)}
					</Text>
				</View>
				{showPicker && (
					<DateTimePicker
						testID="dateTimePicker"
						value={tripDetails.date}
						mode="date"
						is24Hour={true}
						display="default"
						onChange={onChange}
					/>
				)}
			</TouchableOpacity>
		</View>
	)
}

export default DatePickerField
