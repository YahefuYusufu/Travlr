import React, { useState } from "react"
import { View, Text, TouchableOpacity, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTheme } from "../../theme/ThemeProvider"

interface DatePickerFieldProps {
	icon: React.ReactNode
	label: string
	date: Date
	onDateChange: (date: Date) => void
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
	icon,
	label,
	date,
	onDateChange,
}) => {
	const { colors } = useTheme()
	const [showPicker, setShowPicker] = useState(false)

	const onChange = (event: any, selectedDate?: Date) => {
		const currentDate = selectedDate || date
		setShowPicker(Platform.OS === "ios")
		onDateChange(currentDate)
	}

	const showDatepicker = () => {
		setShowPicker(true)
	}

	return (
		<View>
			<TouchableOpacity
				className="flex-row items-center border-b border-gray-300 py-2 mb-4"
				onPress={showDatepicker}>
				{icon}
				<Text className="ml-2 text-base" style={{ color: colors.text }}>
					{label}: {date.toDateString()}
				</Text>
			</TouchableOpacity>
			{showPicker && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}
		</View>
	)
}

export default DatePickerField
