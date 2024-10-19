import React, { FC, useState, useEffect, useRef, useMemo } from "react"
import {
	View,
	Text,
	Image,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	FlatList,
	Dimensions,
	ListRenderItem,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import {
	HeartIcon,
	ClockIcon,
	MapPinIcon,
	SunIcon,
	TagIcon,
	StarIcon,
} from "react-native-heroicons/solid"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import { DestinationScreenProps } from "../types"
import { getTripById, Trip } from "../hooks/useTrips"
import { ChevronRightIcon } from "lucide-react-native"

const { width } = Dimensions.get("window")
type ImageSource = string | { data: string; contentType: string }

const DestinationScreen: React.FC<DestinationScreenProps> = ({ route }) => {
	const { colors } = useTheme()
	const navigation = useNavigation()
	const [trip, setTrip] = useState<Trip | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
	const flatListRef = useRef<FlatList<ImageSource> | null>(null)

	useEffect(() => {
		const fetchTrip = async () => {
			try {
				const fetchedTrip = await getTripById(route.params._id)
				setTrip(fetchedTrip)
			} catch (error) {
				console.error("Failed to fetch trip:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchTrip()
	}, [route.params._id])

	const getImageSource = (image: ImageSource): { uri: string } => {
		if (typeof image === "string") {
			return { uri: image }
		} else if (typeof image === "object" && image.data) {
			return {
				uri: `data:${image.contentType};base64,${image.data}`,
			}
		}
		return {
			uri: Image.resolveAssetSource(
				require("../../assets/images/task/task-01.jpg")
			).uri,
		}
	}

	const handlePrevImage = () => {
		if (currentImageIndex > 0) {
			setCurrentImageIndex(currentImageIndex - 1)
			flatListRef.current?.scrollToIndex({
				index: currentImageIndex - 1,
				animated: true,
			})
		}
	}

	const handleNextImage = () => {
		if (trip?.images && currentImageIndex < trip.images.length - 1) {
			setCurrentImageIndex(currentImageIndex + 1)
			flatListRef.current?.scrollToIndex({
				index: currentImageIndex + 1,
				animated: true,
			})
		}
	}

	const renderImage: ListRenderItem<ImageSource> = ({ item }) => (
		<Image source={getImageSource(item)} style={{ width, height: hp(55) }} />
	)

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" />
			</View>
		)
	}

	if (!trip) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text>Failed to load trip details</Text>
			</View>
		)
	}

	return (
		<View className="bg-white flex-1">
			<StatusBar style={"auto"} />
			<View style={{ height: hp(55) }}>
				<FlatList
					ref={flatListRef}
					data={trip.images}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_: any, index: { toString: () => any }) =>
						index.toString()
					}
					renderItem={renderImage}
				/>
				{trip.images && trip.images.length > 1 && (
					<>
						<TouchableOpacity
							onPress={handlePrevImage}
							className="absolute left-4 top-1/2 p-2 rounded-full bg-white/50"
							style={{ transform: [{ translateY: -20 }] }}>
							<ChevronLeftIcon size={wp(6)} color="black" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleNextImage}
							className="absolute right-4 top-1/2 p-2 rounded-full bg-white/50"
							style={{ transform: [{ translateY: -20 }] }}>
							<ChevronRightIcon size={wp(6)} color="black" />
						</TouchableOpacity>
					</>
				)}
			</View>

			{/* back button */}
			<SafeAreaView className="flex-row justify-between items-center w-full absolute">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="p-2 rounded-full ml-4"
					style={{ backgroundColor: "rgba(107, 105, 105, 0.5)" }}>
					<ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
				</TouchableOpacity>
			</SafeAreaView>

			{/* title & description & booking button */}
			<View
				style={{
					borderTopLeftRadius: 40,
					borderTopRightRadius: 40,
					backgroundColor: colors.background,
				}}
				className="px-5 flex flex-1 justify-between pt-8 -mt-14">
				<ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
					<View className="flex-row justify-between items-start">
						<Text
							style={{ fontSize: wp(7), color: colors.text }}
							className="font-bold flex-1">
							{trip.city}, {trip.country}
						</Text>
						{trip.rating && (
							<View
								className="bg-yellow-400 px-3 py-2 rounded-full flex-row items-center"
								style={{
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 2,
									},
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
									elevation: 5,
								}}>
								<StarIcon size={wp(5)} color="white" />
								<Text
									style={{ fontSize: wp(5) }}
									className="font-bold text-white ml-1">
									{trip.rating.toFixed(1)}
								</Text>
							</View>
						)}
					</View>

					<View className="flex-row justify-between mx-1 mt-6 mb-4">
						<View className="flex-1 items-center px-2">
							<View className="bg-blue-100 rounded-full p-3 mb-2">
								<ClockIcon size={wp(6)} color="#3B82F6" />
							</View>
							<View className="items-center">
								<Text
									style={{ fontSize: wp(3.5) }}
									className="font-bold text-gray-800">
									{new Date(trip.date).toLocaleDateString()}
								</Text>
								<Text className="text-gray-600 text-sm mt-1">Date</Text>
							</View>
						</View>

						<View className="flex-1 items-center px-2">
							<View className="bg-red-100 rounded-full p-3 mb-2">
								<MapPinIcon size={wp(6)} color="#EF4444" />
							</View>
							<View className="items-center">
								<Text
									style={{ fontSize: wp(3.5) }}
									className="font-bold text-gray-800">
									{trip.city}
								</Text>
								<Text className="text-gray-600 text-sm mt-1">City</Text>
							</View>
						</View>

						{trip.category && (
							<View className="flex-1 items-center px-2">
								<View className="bg-orange-100 rounded-full p-3 mb-2">
									<TagIcon size={wp(6)} color="#F59E0B" />
								</View>
								<View className="items-center">
									<Text
										style={{ fontSize: wp(3.5) }}
										className="font-bold text-gray-800">
										{trip.category}
									</Text>
									<Text className="text-gray-600 text-sm mt-1">Category</Text>
								</View>
							</View>
						)}
					</View>
					<View
						style={{ height: hp(20) }}
						className="bg-gray-400 p-4 rounded-xl my-4">
						<Text
							style={{ fontSize: wp(4) }}
							className="font-semibold mb-2 text-slate-50">
							Trip Summary
						</Text>
						<ScrollView
							className="bg-white rounded-lg border border-gray-300"
							contentContainerStyle={{ padding: 16 }}>
							<Text
								style={{
									fontSize: wp(3.5),
									lineHeight: wp(5),
								}}
								className="font-medium text-gray-600">
								{trip.summary}
							</Text>
						</ScrollView>
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

export default DestinationScreen
