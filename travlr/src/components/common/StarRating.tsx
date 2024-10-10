import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Star } from "lucide-react-native"

interface StarRatingProps {
	rating: number
	onRatingChange: (rating: number) => void
	maxStars: number
}

const StarRating: React.FC<StarRatingProps> = ({
	rating,
	onRatingChange,
	maxStars,
}) => {
	return (
		<View className="flex-row">
			{[...Array(maxStars)].map((_, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => onRatingChange(index + 1)}
					className="mr-1">
					<Star
						size={24}
						color={index < rating ? "#FFD700" : "#D3D3D3"}
						fill={index < rating ? "#FFD700" : "none"}
					/>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default StarRating
