import { View, Text, TouchableOpacity } from "react-native"
import React, { useState, useEffect } from "react"
import { sortCategories } from "../../constants"
import { useTheme } from "../../theme/ThemeProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"

interface SortCategoriesProps {
	activeSort: string
	setActiveSort: (category: string) => void
}

const STORAGE_KEY = "@sort_preference"

const SortCategories: React.FC<SortCategoriesProps> = ({
	activeSort,
	setActiveSort,
}) => {
	const { colors } = useTheme()

	// Load saved preference when component mounts
	useEffect(() => {
		const loadSortPreference = async () => {
			try {
				const savedSort = await AsyncStorage.getItem(STORAGE_KEY)
				if (savedSort && sortCategories.includes(savedSort)) {
					setActiveSort(savedSort)
				}
			} catch (error) {
				console.error("Error loading sort preference:", error)
			}
		}

		loadSortPreference()
	}, [])

	// Save preference when it changes
	const handleSortChange = async (sort: string) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, sort)
			setActiveSort(sort)
		} catch (error) {
			console.error("Error saving sort preference:", error)
		}
	}

	return (
		<View
			className="flex-row justify-around items-center mx-4 rounded-full p-2 px-4 space-x-2"
			style={{ backgroundColor: colors.bgNatural }}>
			{sortCategories.map((sort, index) => {
				let isActive = sort == activeSort
				let activeButtonClass = isActive ? "bg-white shadow" : ""
				return (
					<TouchableOpacity
						onPress={() => handleSortChange(sort)}
						key={index}
						className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}>
						<Text
							style={{
								color: isActive
									? colors.textSecondary
									: "rgba(171, 168, 168, 0.6)",
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

export default SortCategories
