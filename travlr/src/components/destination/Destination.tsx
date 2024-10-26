import React, { FC, useCallback, useState, useEffect } from "react"
import { View, ActivityIndicator, Alert, Text } from "react-native"
import { HomeScreenProps } from "../../types"
import DestinationCard from "./DestinationCard"
import { deleteTrip, filterTripsByCategory, Trip } from "../../hooks/useTrips"
import SortCategories from "../category/SortCategories"

interface DestinationProps {
	navigation: HomeScreenProps["navigation"]
	trips: Trip[]
	isLoading: boolean
	onDeleteTrip: (id: string) => Promise<void>
}

const Destination: FC<DestinationProps> = ({
	navigation,
	trips,
	isLoading,
	onDeleteTrip,
}) => {
	const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
	const [deletingTripId, setDeletingTripId] = useState<string | null>(null)
	const [activeSort, setActiveSort] = useState<string>("All")

	useEffect(() => {
		const sortedTrips = filterTripsByCategory(trips, activeSort)
		setFilteredTrips(sortedTrips)
	}, [activeSort, trips])

	const handleDeleteTrip = useCallback(
		async (id: string) => {
			if (deletingTripId === id) {
				return
			}

			setDeletingTripId(id)
			try {
				await onDeleteTrip(id)
				console.log(`Trip ${id} deleted successfully`)
			} catch (error) {
				console.error("Failed to delete trip:", error)
				Alert.alert("Error", "Failed to delete trip. Please try again.")
			} finally {
				setDeletingTripId(null)
			}
		},
		[deletingTripId, onDeleteTrip]
	)

	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<View className="flex-1">
			<SortCategories activeSort={activeSort} setActiveSort={setActiveSort} />
			<View className="mx-4 mt-5 flex-row justify-between flex-wrap">
				{filteredTrips.length > 0 ? (
					filteredTrips.map((trip) => (
						<DestinationCard
							key={trip._id}
							item={trip}
							onPress={() => navigation.navigate("Destination", trip)}
							onDelete={handleDeleteTrip}
							isDeleting={deletingTripId === trip._id}
						/>
					))
				) : (
					<View className="flex-1 justify-center items-center mt-10">
						<Text>No trips found for this category.</Text>
					</View>
				)}
			</View>
		</View>
	)
}

export default Destination
