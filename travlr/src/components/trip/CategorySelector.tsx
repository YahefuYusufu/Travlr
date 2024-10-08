import React, { useState } from "react"
import { View, Text, TouchableOpacity, Animated } from "react-native"

interface CategorySelectorProps {
	categories: string[] // Array of category strings passed as props for flexibility
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null) // State for selected category
	const animatedValue = new Animated.Value(0) // Animation value for label

	const handleSelect = (category: string) => {
		setSelectedCategory(category) // Set selected category
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: false,
		}).start(() => {
			// Reset animation
			animatedValue.setValue(0)
		})
	}

	// Interpolating animation value to translate label
	const labelTranslateY = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [10, 0], // Move label up
	})

	return (
		<View className="bg-black mt-4 p-4 rounded-lg">
			<Text className="mb-2 text-lg font-semibold" style={{ color: "#FFFFFF" }}>
				Select Category
			</Text>
			<View className="flex-row justify-around">
				{categories.map((category) => (
					<TouchableOpacity
						key={category}
						className="py-2 px-4 border border-gray-400 rounded-lg mx-2"
						onPress={() => handleSelect(category)}
						style={{
							backgroundColor:
								selectedCategory === category ? "#3C50E0" : "#FFFFFF",
						}}>
						<Text
							className="text-base"
							style={{
								color: selectedCategory === category ? "#FFFFFF" : "#000000",
							}}>
							{category}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			{/* Animated Label Display */}
			<Animated.View style={{ transform: [{ translateY: labelTranslateY }] }}>
				{selectedCategory && (
					<Text
						className="mt-6 text-xl font-semibold"
						style={{ color: "#FFFFFF" }}>
						Selected Category: {selectedCategory}
					</Text>
				)}
			</Animated.View>
		</View>
	)
}

export default CategorySelector
