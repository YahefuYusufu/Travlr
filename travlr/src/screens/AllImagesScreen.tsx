import React, { useEffect, useState } from "react"
import {
	View,
	Text,
	SafeAreaView,
	Image,
	ActivityIndicator,
	SectionList,
	SectionListData,
} from "react-native"
import { getTrips, Trip } from "../hooks/useTrips"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Header from "../components/common/Header"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types"
import { ROUTES } from "../constants/strings"

interface ImageItem {
	id: string
	uri: string
	city: string
	date: Date
}

interface Section {
	title: string
	data: ImageItem[][]
}

const numColumns = 3
const imageSize = wp(100) / numColumns

type AllImagesScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	typeof ROUTES.ALLIMAGES
>

const AllImagesScreen: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [sections, setSections] = useState<Section[]>([])
	const navigation = useNavigation<AllImagesScreenNavigationProp>()

	useEffect(() => {
		fetchTrips()
	}, [])

	const fetchTrips = async () => {
		setIsLoading(true)
		try {
			const trips = await getTrips()
			const allImages = extractImages(trips)
			const organizedSections = organizeImages(allImages)
			setSections(organizedSections)
		} catch (error) {
			console.error("Error fetching trips:", error)
		} finally {
			setIsLoading(false)
		}
	}

	const extractImages = (trips: Trip[]): ImageItem[] => {
		return trips.flatMap((trip) =>
			(trip.images || []).map((uri, index) => ({
				id: `${trip._id}-${index}`,
				uri,
				city: trip.city,
				date: new Date(trip.date),
			}))
		)
	}

	const organizeImages = (images: ImageItem[]): Section[] => {
		const now = new Date()
		const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
		const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

		const lastWeek = images.filter((img) => img.date >= sevenDaysAgo)
		const lastMonth = images.filter((img) => img.date < thirtyDaysAgo)

		const chunkArray = (arr: ImageItem[], size: number) =>
			Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
				arr.slice(i * size, i * size + size)
			)

		return [
			{ title: "Last 7 Days", data: chunkArray(lastWeek, numColumns) },

			{ title: "Older", data: chunkArray(lastMonth, numColumns) },
		]
	}

	const renderItem = ({ item }: { item: ImageItem[] }) => (
		<View style={{ flexDirection: "row" }}>
			{item.map((image) => (
				<View
					key={image.id}
					style={{ width: imageSize, height: imageSize }}
					className="justify-center items-center">
					<Image
						source={{ uri: image.uri }}
						style={{ width: imageSize - wp(2), height: imageSize - wp(1) }}
						className="rounded-lg"
					/>

					{/* Gradient Overlay */}
					<LinearGradient
						colors={["transparent", "rgba(68, 68, 68, 0.4)"]} // dark overlay color at the bottom
						style={{
							width: imageSize - wp(2),
							height: hp(10), // Adjust height of the gradient based on your design
							position: "absolute",
							bottom: 0,
							borderBottomLeftRadius: 8,
							borderBottomRightRadius: 8,
						}}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
					/>

					{/* Text on the Image */}
					<View
						style={{
							position: "absolute",
							bottom: hp(1), // Adjust to position the text inside the image
							left: wp(1),
							right: wp(1),
							padding: wp(1),
							backgroundColor: "rgb(248, 254, 252)", // Light background with opacity
							borderRadius: 4,
						}}>
						<Text
							style={{
								fontSize: wp(3),
								color: "#000", // Black text color
								textAlign: "center",
							}}>
							{image.city}
						</Text>
					</View>
				</View>
			))}
		</View>
	)

	const renderSectionHeader = ({
		section: { title },
	}: {
		section: SectionListData<ImageItem[]>
	}) => (
		<View className="py-4 px-4 mb-2 mt-2 bg-gray-800 rounded-md mx-2">
			<Text className="font-bold text-lg text-white">{title}</Text>
		</View>
	)

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header
				title={ROUTES.ALLIMAGES}
				onBackPress={() => navigation.goBack()}
			/>
			<SectionList
				sections={sections}
				renderItem={renderItem}
				renderSectionHeader={renderSectionHeader}
				keyExtractor={(item, index) => index.toString()}
				stickySectionHeadersEnabled={true}
			/>
		</SafeAreaView>
	)
}

export default AllImagesScreen
