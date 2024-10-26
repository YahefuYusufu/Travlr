import React from "react"
import { View, Text, TextInput, FlatList } from "react-native"
import CategoryDropdown from "../common/CategoryDropdown"
import StarRating from "../common/StarRating"
import { useTripContext } from "../../context/TripContext"
import { useTheme } from "../../theme/ThemeProvider"

const TripDetailsForm: React.FC = () => {
	const { colors } = useTheme()

	const { tripDetails, updateCategory, updateSummary, updateRating } =
		useTripContext()
	const categories = ["Favorites", "Best", "Popular", "New"]

	const renderItem = () => (
		<View
			className="p-3   rounded-lg shadow-md"
			style={{ height: 300, backgroundColor: colors.bgNatural }}>
			<View className="flex-row justify-between">
				<Text className="text-lg font-semibold text-gray-100">Category</Text>
				<View className="flex-row justify-end">
					<CategoryDropdown
						placeholder="Select Category"
						items={categories.map((cat) => ({ label: cat, value: cat }))}
						onValueChange={(value: string) => updateCategory(value)}
						value={tripDetails.category || ""}
					/>
				</View>
			</View>

			<View className="mb-1">
				<Text className="mb-1 text-lg font-semibold text-gray-100">
					Trip Summary
				</Text>
				<TextInput
					className="border border-gray-300 rounded-md p-3 bg-gray-50 h-40"
					multiline
					numberOfLines={4}
					onChangeText={(text: string) => updateSummary(text)}
					value={tripDetails.summary || ""}
					placeholder="Enter a brief summary of your trip..."
					placeholderTextColor="#A0AEC0"
				/>
			</View>

			<View className="flex-row justify-between">
				<Text className="text-lg font-semibold text-gray-100">Rating</Text>
				<StarRating
					rating={tripDetails.rating || 0}
					onRatingChange={(value: number) => updateRating(value)}
					maxStars={5}
				/>
			</View>
		</View>
	)

	return (
		<FlatList
			data={[{}]} // We only need one item
			renderItem={renderItem}
			keyExtractor={() => "tripDetails"}
			scrollEnabled={false}
			className="flex-1"
		/>
	)
}

export default TripDetailsForm
