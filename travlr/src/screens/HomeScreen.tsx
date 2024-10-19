import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Image,
	Platform,
	TextInput,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { HomeScreenProps } from "../types"
import { useTheme } from "../theme/ThemeProvider"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { PlusCircleIcon } from "react-native-heroicons/solid"
import Gallery from "../components/gallary/Gallery"
import SortCategories from "../components/category/SortCategories"
import Destination from "../components/destination/Destination"
import { getTrips, Trip } from "../hooks/useTrips"
import { useFocusEffect } from "@react-navigation/native"

const topMargin = Platform.OS === "ios" ? hp(1) : hp(6)
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const { colors } = useTheme()
	const [trips, setTrips] = useState<Trip[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchTrips = useCallback(async () => {
		setIsLoading(true)
		try {
			const fetchedTrips = await getTrips()

			// Log total number of trips
			console.log("Number of trips:", fetchedTrips.length)

			// Log each country name (ensure 'country' exists in trip data)
			const countries = fetchedTrips.map((trip) => trip.country)
			console.log("Countries:", countries.join(", "))

			setTrips(fetchedTrips)
		} catch (error) {
			console.error("Error fetching trips:", error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchTrips()
	}, [fetchTrips])

	useFocusEffect(
		useCallback(() => {
			fetchTrips()
		}, [fetchTrips])
	)

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: colors.background }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="space-y-6"
				style={{ marginTop: topMargin }}>
				{/* avatar */}
				<View className="mx-5 flex-row justify-between items-center mb-2">
					<Text
						style={{ fontSize: wp(7), color: colors.text }}
						className="font-bold">
						Let's Discover
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("NewTrip")}>
						<PlusCircleIcon
							size={32}
							color={colors.textSecondary}
							strokeWidth={3}
						/>
					</TouchableOpacity>
				</View>

				{/* search bar */}
				<View className="mx-5 mb-2">
					<View
						className="flex-row items-center rounded-full p-4 space-x-2 pl-6"
						style={{ backgroundColor: colors.text }}>
						<MagnifyingGlassIcon
							size={20}
							color={colors.textSecondary}
							strokeWidth={3}
						/>
						<TextInput
							placeholder="Search Destination"
							placeholderTextColor={colors.textSecondary}
						/>
					</View>
				</View>

				{/* categories */}
				<View className="mb-2">
					<Gallery trips={trips} isLoading={isLoading} />
				</View>

				{/* destination */}
				<View className="mb-2">
					<Destination navigation={navigation} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
