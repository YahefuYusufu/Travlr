import React, { useState } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

interface DropdownExampleProps {
	items: { label: string; value: string }[] // Accept items as props
	placeholder?: string // Accept an optional placeholder text
}

const CategoryDropdown: React.FC<DropdownExampleProps> = ({
	items,
	placeholder = "Select an option",
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string | null>(null)

	return (
		<View className="flex-row justify-end p-2">
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				placeholder={placeholder} // Use the placeholder prop
				containerStyle={{ width: 140 }} // Set the width smaller than default
				dropDownContainerStyle={{ backgroundColor: "#fafafa" }} // Background color for the dropdown
				textStyle={{ color: "#000" }} // Customize text color if needed
				placeholderStyle={{ color: "#999" }} // Customize placeholder color
			/>
		</View>
	)
}

export default CategoryDropdown
