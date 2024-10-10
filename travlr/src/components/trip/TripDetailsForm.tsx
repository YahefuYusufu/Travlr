import React from "react"
import { View, Text, TextInput, FlatList } from "react-native"
import CategoryDropdown from "./CategoryDropdown"
import StarRating from "../common/StarRating"

interface TripDetailsFormProps {
	category: string
	onCategorySelect: (category: string) => void
	summary: string
	onSummaryChange: (summary: string) => void
	rating: number
	onRatingChange: (rating: number) => void
}

const TripDetailsForm: React.FC<TripDetailsFormProps> = ({
	category,
	onCategorySelect,
	summary,
	onSummaryChange,
	rating,
	onRatingChange,
}) => {
	const categories = ["Favorites", "Best", "Popular", "New"]

	const renderItem = () => (
		<View
			className="p-6 bg-gray-600 rounded-lg shadow-md"
			style={{ height: 350 }}>
			<View className="flex-row justify-between mb-6">
				<Text className="mb-2 text-lg font-semibold text-gray-100">
					Category
				</Text>
				<View className="flex-row justify-end">
					<CategoryDropdown
						placeholder="Select Category"
						items={categories.map((cat) => ({ label: cat, value: cat }))}
						onValueChange={onCategorySelect}
						value={category}
					/>
				</View>
			</View>

			<View className="mb-6">
				<Text className="mb-2 text-lg font-semibold text-gray-100">
					Trip Summary
				</Text>
				<TextInput
					className="border border-gray-300 rounded-md p-3 bg-gray-50 h-40"
					multiline
					numberOfLines={5}
					onChangeText={onSummaryChange}
					value={summary}
					placeholder="Enter a brief summary of your trip..."
					placeholderTextColor="#A0AEC0"
				/>
			</View>

			<View className="flex-row justify-between">
				<Text className="mb-2 text-lg font-semibold text-gray-100">Rating</Text>
				<StarRating
					rating={rating}
					onRatingChange={onRatingChange}
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
			scrollEnabled={true}
			className="flex-1"
		/>
	)
}

export default TripDetailsForm
