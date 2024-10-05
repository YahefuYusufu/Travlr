import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { sortCategories } from "../constants"
import { useTheme } from "../theme/ThemeProvider"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export default function SortCategories() {
	const [activeSort, setActiveSort] = useState("Popular")
	const { colors } = useTheme()

	return (
		<View
			className="flex-row justify-around items-center mx-4 rounded-full p-2 px-4 space-x-2"
			style={{ backgroundColor: colors.bgNatural }}>
			{sortCategories.map((sort, index) => {
				let isActive = sort == activeSort
				let activeButtonClass = isActive ? "bg-white shadow" : ""
				return (
					<TouchableOpacity
						onPress={() => setActiveSort(sort)}
						key={index}
						className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}>
						<Text
							style={{
								color: isActive
									? colors.textSecondary
									: "rgba(113, 110, 110, 0.6)",
								fontSize: wp(3.5),
							}}
							className="font-semibold">
							{sort}
						</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
