import React from "react"
import { View } from "react-native"
import DatePickerField from "./DatePickerField"

interface TripDateFormProps {
	date: Date
	onDateChange: (date: Date) => void
}

const TripDateForm: React.FC<TripDateFormProps> = ({ date, onDateChange }) => {
	return (
		<View className="mt-2">
			<DatePickerField
				label="Trip Date"
				date={date}
				onDateChange={onDateChange}
			/>
		</View>
	)
}

export default TripDateForm
