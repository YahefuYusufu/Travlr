import React, { FC, useState } from "react"
import { View, TouchableOpacity, Image, Text, Alert } from "react-native"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../../theme/ThemeProvider"
import { TrashIcon } from "react-native-heroicons/solid"
import { deleteTrip, Trip } from "../../hooks/useTrips"

interface DestinationCardProps {
	item: Trip
	onPress: () => void
	onDelete: (id: string) => void
	isDeleting: boolean
}

const DestinationCard: FC<DestinationCardProps> = ({
	item,
	onPress,
	onDelete,
	isDeleting,
}) => {
	const { colors } = useTheme()

	// Helper function to get the first image URL or a default image
	const getImageSource = () => {
		if (item.images && item.images.length > 0) {
			const firstImage = item.images[0]
			if (typeof firstImage === "string") {
				return { uri: firstImage }
			} else if (typeof firstImage === "object" && firstImage.data) {
				return {
					uri: `data:${firstImage.contentType};base64,${firstImage.data}`,
				}
			}
		}
		return require("../../../assets/images/task/task-01.jpg")
	}

	const handleDelete = () => {
		if (isDeleting) return

		Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Delete",
				onPress: () => onDelete(item._id),
				style: "destructive",
			},
		])
	}
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ width: wp(44), height: wp(65) }}
			className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
			<Image
				source={getImageSource()}
				style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
				className="absolute"
			/>
			<LinearGradient
				colors={["transparent", colors.text]}
				style={{
					width: wp(44),
					height: hp(15),
					borderBottomLeftRadius: 35,
					borderBottomRightRadius: 35,
				}}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				className="absolute bottom-0"
			/>

			<TouchableOpacity
				onPress={handleDelete}
				style={{ backgroundColor: "rgba(68, 68, 68, 0.4)" }}
				className="absolute top-1 right-3 rounded-full p-2">
				<TrashIcon size={wp(5)} color={colors.textHeader} />
			</TouchableOpacity>

			<Text
				style={{ fontSize: wp(4), color: colors.textHeader }}
				className="font-semibold">
				{item.city}, {item.country}
			</Text>
			<Text
				style={{ fontSize: wp(2.2), color: colors.textHeader }}
				className="font-semibold">
				{item.summary || `Visit ${item.city}`}
			</Text>
		</TouchableOpacity>
	)
}

export default DestinationCard
