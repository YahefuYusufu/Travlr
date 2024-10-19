import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Platform,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { HomeScreenProps } from "../types"
import { useTheme } from "../theme/ThemeProvider"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { PlusCircleIcon } from "react-native-heroicons/solid"
import Gallery from "../components/gallary/Gallery"
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
			console.log("Number of trips:", fetchedTrips.length)
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
				{/* Header with Let's Discover and Add button */}
				<View className="mx-5 flex-row justify-between items-center">
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

				{/* Trip count */}
				<View className="mx-5 flex-row justify-end">
					<Text
						style={{ fontSize: wp(4), color: colors.textSecondary }}
						className="font-semibold">
						Total Trips: {trips.length}
					</Text>
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
