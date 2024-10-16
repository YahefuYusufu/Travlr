import React from "react"
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	Platform,
	ActivityIndicator,
} from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { GalleryProps, RootStackParamList } from "../../types"
import { useTheme } from "../../theme/ThemeProvider"
import { TEXTS, ROUTES } from "../../constants/strings"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type GalleryNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	typeof ROUTES.HOME
>

const Gallery: React.FC<GalleryProps> = ({ trips, isLoading }) => {
	const { colors } = useTheme()
	const navigation = useNavigation<GalleryNavigationProp>()

	const handleSeeAll = () => {
		navigation.navigate(ROUTES.ALLIMAGES)
	}

	const getImageSource = (
		image: string | { data: string; contentType: string }
	) => {
		if (typeof image === "string") {
			if (image.startsWith("http://") || image.startsWith("https://")) {
				return { uri: image }
			} else if (image.startsWith("/uploads/")) {
				const baseUrl =
					Platform.OS === "android"
						? "http://10.0.2.2:5001"
						: "http://192.168.0.126:5001"
				return { uri: `${baseUrl}${image}` }
			} else if (Platform.OS === "ios" && !image.startsWith("file://")) {
				return { uri: `file://${image}` }
			} else {
				return { uri: image }
			}
		} else {
			return { uri: `data:${image.contentType};base64,${image.data}` }
		}
	}

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
				<TouchableOpacity onPress={handleSeeAll}>
					<Text style={{ color: colors.error }} className="font-bold">
						{TEXTS.SEE_ALL}
					</Text>
				</TouchableOpacity>
			</View>

			{trips.length === 0 ? (
				<View
					className="items-center justify-center"
					style={{ height: wp(30) }}>
					<Text style={{ color: colors.text }}>No trips available</Text>
				</View>
			) : (
				<ScrollView
					horizontal
					contentContainerStyle={{ paddingHorizontal: 15 }}
					className="space-x-4"
					showsHorizontalScrollIndicator={false}>
					{trips.map((trip, index) => {
						const hasImages = trip.images && trip.images.length > 0
						const image = hasImages && trip.images ? trip.images[0] : null

						return (
							<TouchableOpacity
								key={trip._id || index}
								className="flex items-center space-y-2">
								{image ? (
									<Image
										source={getImageSource(image)}
										className="rounded-3xl"
										style={{ width: wp(20), height: wp(20) }}
										onError={(e) => {
											console.error("Image load error:", e.nativeEvent.error)
											console.error("Failed image:", image)
										}}
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
			)}
		</View>
	)
}

export default Gallery
