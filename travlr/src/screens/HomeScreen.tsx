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
import { MagnifyingGlassIcon, PlusIcon } from "react-native-heroicons/outline"
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
			console.log("Fetching trips...")
			const fetchedTrips = await getTrips()
			console.log("Trips fetched successfully")
			console.log("Number of trips:", fetchedTrips.length)
			console.log("Fetched trips data:", JSON.stringify(fetchedTrips, null, 2))
			setTrips(fetchedTrips)
		} catch (error) {
			console.error("Error fetching trips:", error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		console.log("HomeScreen mounted, fetching trips...")
		fetchTrips()
	}, [fetchTrips])

	useFocusEffect(
		useCallback(() => {
			console.log("HomeScreen focused, fetching trips...")
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
				<View className="mx-5 flex-row justify-between items-center mb-10">
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
				<View className="mx-5 mb-4">
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
				<View className="mb-4">
					<Gallery trips={trips} isLoading={isLoading} />
				</View>

				{/* sort categories */}
				<View className="mb-4">
					<SortCategories />
				</View>

				{/* destination */}
				<View className="mb-4">
					<Destination navigation={navigation} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
