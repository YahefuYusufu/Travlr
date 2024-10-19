import React, { FC, useCallback, useEffect, useState } from "react"
import { View, ActivityIndicator, Alert } from "react-native"
import { HomeScreenProps } from "../../types"
import DestinationCard from "./DestinationCard"
import { getTrips, Trip, deleteTrip } from "../../hooks/useTrips"

const Destination: FC<{ navigation: HomeScreenProps["navigation"] }> = ({
	navigation,
}) => {
	const [trips, setTrips] = useState<Trip[]>([])
	const [loading, setLoading] = useState(true)
	const [deletingTripId, setDeletingTripId] = useState<string | null>(null)

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

	const handleDeleteTrip = useCallback(
		async (id: string) => {
			if (deletingTripId === id) {
				console.log(
					`Already deleting trip ${id}. Ignoring repeated delete attempt.`
				)
				return
			}

			setDeletingTripId(id)
			try {
				await deleteTrip(id)
				setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id))
				console.log(`Trip ${id} deleted successfully and removed from state`)
			} catch (error) {
				console.error("Failed to delete trip:", error)
				Alert.alert("Error", "Failed to delete trip. Please try again.")
			} finally {
				setDeletingTripId(null)
			}
		},
		[deletingTripId]
	)

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
					onDelete={handleDeleteTrip}
					isDeleting={deletingTripId === trip._id}
				/>
			))}
		</View>
	)
}

export default Destination
