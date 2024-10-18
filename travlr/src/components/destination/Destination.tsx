import React, { FC, useEffect, useState } from "react"
import { View, ActivityIndicator } from "react-native"
import { HomeScreenProps } from "../../types"
import DestinationCard from "./DestinationCard"
import { getTrips, Trip } from "../../hooks/useTrips"

const Destination: FC<{ navigation: HomeScreenProps["navigation"] }> = ({
	navigation,
}) => {
	const [trips, setTrips] = useState<Trip[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchTrips()
	}, [])

	const fetchTrips = async () => {
		try {
			const fetchedTrips = await getTrips()
			setTrips(fetchedTrips)
		} catch (error) {
			console.error("Failed to fetch trips:", error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<View className="mx-4 flex-row justify-between flex-wrap">
			{trips.map((trip) => (
				<DestinationCard
					key={trip._id}
					item={trip}
					onPress={() => navigation.navigate("Destination", trip)}
				/>
			))}
		</View>
	)
}

export default Destination
