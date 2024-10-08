import React, { useState } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

const DropdownExample: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string | null>(null)
	const [items, setItems] = useState<{ label: string; value: string }[]>([
		{ label: "Favorite", value: "favorite" },
		{ label: "Best", value: "best" },
		{ label: "Trending", value: "trending" },
	])

	return (
		<View className="flex-row justify-end p-2">
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				placeholder="Category"
				containerStyle={{ width: 140 }} // Set the width smaller than default
				dropDownContainerStyle={{ backgroundColor: "#fafafa" }} // Background color for the dropdown
				textStyle={{ color: "#000" }} // Customize text color if needed
				placeholderStyle={{ color: "#999" }} // Customize placeholder color
			/>
		</View>
	)
}

export default DropdownExample
