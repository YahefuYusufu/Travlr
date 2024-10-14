import React from "react"
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
} from "react-native"
import { useTheme } from "../../theme/ThemeProvider"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { GalleryProps } from "../../types"
import { TEXTS } from "../../constants/strings"

const Gallery: React.FC<GalleryProps> = ({ trips, isLoading }) => {
	const { colors } = useTheme()

	if (isLoading) {
		return (
			<View
				className="flex items-center justify-center"
				style={{ height: wp(30) }}>
				<ActivityIndicator size="large" color={colors.text} />
			</View>
		)
	}

	return (
		<View className="space-y-5">
			<View className="mx-5 flex-row justify-between items-center">
				<Text style={{ color: colors.text }} className="font-bold">
					{TEXTS.GALLERY}
				</Text>
				<TouchableOpacity>
					<Text style={{ color: colors.error }} className="font-bold">
						{TEXTS.SEE_ALL}
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				className="space-x-4"
				showsHorizontalScrollIndicator={false}>
				{trips.map((trip, index) => {
					const imageUri =
						trip.images && trip.images.length > 0 ? trip.images[0] : null
					return (
						<TouchableOpacity
							key={trip._id || index}
							className="flex items-center space-y-2">
							{imageUri ? (
								<Image
									source={{ uri: imageUri }}
									className="rounded-3xl"
									style={{ width: wp(20), height: wp(20) }}
								/>
							) : (
								<View
									className="rounded-3xl bg-gray-300 justify-center items-center"
									style={{ width: wp(20), height: wp(20) }}>
									<Text style={{ color: colors.text }}>No Image</Text>
								</View>
							)}
							<Text
								style={{ color: colors.text, fontSize: wp(3) }}
								className="font-medium">
								{trip.city}
							</Text>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</View>
	)
}

export default Gallery
