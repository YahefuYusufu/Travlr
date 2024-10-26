import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Platform,
} from "react-native"
import React, { useCallback, useEffect, useState, useRef } from "react"
import { HomeScreenProps } from "../types"
import { useTheme } from "../theme/ThemeProvider"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { PlusCircleIcon } from "react-native-heroicons/solid"
import Gallery from "../components/gallary/Gallery"
import Destination from "../components/destination/Destination"
import { getTrips, Trip, deleteTrip, sortTripsByDate } from "../hooks/useTrips"
import { useFocusEffect } from "@react-navigation/native"

const topMargin = Platform.OS === "ios" ? hp(1) : hp(6)

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const { colors } = useTheme()
	const [trips, setTrips] = useState<Trip[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const isDataFetched = useRef<boolean>(false)

	const fetchTrips = useCallback(async () => {
		if (isDataFetched.current) {
			console.log("Data already fetched, skipping...")
			setIsLoading(false)
			return
		}

		setIsLoading(true)
		try {
			const fetchedTrips = await getTrips()
			const sortedTrips = sortTripsByDate(fetchedTrips)
			setTrips(sortedTrips)
			isDataFetched.current = true
		} catch (error) {
			console.error("Error fetching trips:", error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const handleDeleteTrip = useCallback(async (id: string) => {
		try {
			await deleteTrip(id)
			setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id))
		} catch (error) {
			console.error("Failed to delete trip:", error)
			throw error
		}
	}, [])

	useEffect(() => {
		fetchTrips()
	}, [fetchTrips])

	useFocusEffect(
		useCallback(() => {
			const checkAndUpdateTrips = async () => {
				const previousRoute = navigation.getState().routes.slice(-2)[0]?.name
				if (previousRoute === "NewTrip") {
					try {
						const newTrips = await getTrips()
						// Make sure to sort with newest first
						const sortedTrips = sortTripsByDate(newTrips)
						setTrips(sortedTrips)
					} catch (error) {
						console.error("Error updating trips:", error)
					}
				}
			}
			checkAndUpdateTrips()
		}, [])
	)

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: colors.background }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="space-y-6"
				style={{ marginTop: topMargin }}>
				<View className="mx-5 flex-row justify-between items-center">
					<Text
						style={{ fontSize: wp(7), color: colors.text }}
						className="font-bold">
						Travel Memories!🚂🚂
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("NewTrip")}>
						<PlusCircleIcon
							size={32}
							color={colors.bgNatural}
							strokeWidth={3}
						/>
					</TouchableOpacity>
				</View>

				<View className="mx-5 flex-row justify-center items-center">
					<View
						className="py-4 px-6 flex-row items-center space-x-4"
						style={{
							backgroundColor: `${colors.bgNatural}40`, // 40 is opacity
							borderRadius: 25,
							shadowColor: colors.textSecondary,
							shadowOffset: {
								width: 0,
								height: 8,
							},
							shadowOpacity: 0.2,
							shadowRadius: 6,
							elevation: 8,
							borderWidth: 2,
							borderColor: `${colors.textSecondary}50`,
						}}>
						{/* Decorative element */}
						<Text style={{ fontSize: wp(5) }}>🌟</Text>

						{/* Title */}
						<Text
							style={{
								fontSize: wp(4.5),
								color: colors.text,
								fontFamily: "Helvetica",
								textShadowColor: `${colors.textSecondary}50`,
								textShadowOffset: { width: 1, height: 1 },
								textShadowRadius: 4,
								letterSpacing: 1,
							}}
							className="font-black tracking-wider">
							TRAVEL SCORE
						</Text>

						{/* Score Badge */}
						<View
							className="px-5 py-2"
							style={{
								backgroundColor: colors.textSecondary,
								borderRadius: 18,
								transform: [{ rotate: "2deg" }],
								shadowColor: "#000",
								shadowOffset: {
									width: 2,
									height: 2,
								},
								shadowOpacity: 0.2,
								shadowRadius: 3,
								elevation: 5,
							}}>
							<Text
								style={{
									fontSize: wp(5),
									color: colors.background,
									fontWeight: "900",
									fontFamily: "Helvetica",
								}}>
								{trips.length}
							</Text>
						</View>

						{/* Decorative element */}
						<Text style={{ fontSize: wp(5) }}>✈️</Text>
					</View>
				</View>

				<View className="mb-2">
					<Gallery trips={trips} isLoading={isLoading} />
				</View>

				<View className="mb-2">
					<Destination
						navigation={navigation}
						trips={trips}
						isLoading={isLoading}
						onDeleteTrip={handleDeleteTrip}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
