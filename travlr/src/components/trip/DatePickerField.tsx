import React, { useState } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { CalendarDaysIcon } from "react-native-heroicons/solid"

interface DatePickerFieldProps {
	label: string
	date: Date
	onDateChange: (date: Date) => void
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
	label,
	date,
	onDateChange,
}) => {
	const [showPicker, setShowPicker] = useState(false)

	const onChange = (event: any, selectedDate?: Date) => {
		if (Platform.OS === "ios") {
			setShowPicker(false) // Close picker immediately on iOS
		}
		if (selectedDate) {
			onDateChange(selectedDate)
			if (Platform.OS === "android") {
				setShowPicker(false) // Close picker after selecting date on Android
			}
		}
	}

	const showDatepicker = () => {
		setShowPicker(true)
	}

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	return (
		<View className="mt-4">
			<Text className=" text-sm font-bold mb-2 text-gray-700">{label}</Text>
			<View className="flex-row items-center justify-between bg-gray-100 rounded-lg p-3 border border-gray-300">
				<View className="flex-row items-center">
					{/* Only the CalendarDaysIcon is clickable to open the date picker */}
					<TouchableOpacity
						onPress={showDatepicker}
						className="bg-gray-500 rounded-full border border-gray-500 p-2 mr-3">
						<CalendarDaysIcon size={24} color={"white"} />
					</TouchableOpacity>
					<Text className="text-base font-medium text-gray-800">
						{formatDate(date)}
					</Text>
				</View>
				{showPicker && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode="date"
						is24Hour={true}
						display="default"
						onChange={onChange}
						style={styles.dateTimePicker}
					/>
				)}
			</View>
		</View>
	)
}

export default DatePickerField

const styles = StyleSheet.create({
	dateTimePicker: {},
})
