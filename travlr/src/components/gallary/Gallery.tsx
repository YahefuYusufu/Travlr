import React from "react"
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
	Platform,
} from "react-native"
import { useTheme } from "../../theme/ThemeProvider"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { GalleryProps, RootStackParamList } from "../../types"
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

	const getImageSource = (uri: string) => {
		if (uri.startsWith("http://") || uri.startsWith("https://")) {
			return { uri }
		} else if (Platform.OS === "ios") {
			return { uri: `file://${uri}` }
		} else {
			return { uri }
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

			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				className="space-x-4"
				showsHorizontalScrollIndicator={false}>
				{trips.map((trip, index) => {
					console.log("Trip images:", trip.images)
					const imageUri =
						trip.images && trip.images.length > 0 ? trip.images[0] : null
					return (
						<TouchableOpacity
							key={trip._id || index}
							className="flex items-center space-y-2">
							{imageUri ? (
								<Image
									source={getImageSource(imageUri)}
									className="rounded-3xl"
									style={{ width: wp(20), height: wp(20) }}
									onError={(e) => {
										console.error("Image load error:", e.nativeEvent.error)
										console.error("Failed image URI:", imageUri)
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
		</View>
	)
}

export default Gallery
