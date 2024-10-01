import { View, Text, TouchableOpacity, Image } from "react-native"
import React, { useState } from "react"
import { destinationData } from "../constants"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../theme/ThemeProvider"
import { HeartIcon } from "react-native-heroicons/solid"

export default function Destination() {
	return (
		<View className="mx-4 flex-row justify-between flex-wrap">
			{destinationData.map((item, index) => {
				return <DestinationCard item={item} key={index} />
			})}
		</View>
	)
}

const DestinationCard = ({ item }: any) => {
	const [isFavourite, toggleFavourite] = useState(false)

	const { colors } = useTheme()

	return (
		<TouchableOpacity
			style={{ width: wp(44), height: wp(65) }}
			className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
			<Image
				source={item.image}
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
				onPress={() => toggleFavourite(!isFavourite)}
				style={{ backgroundColor: "rgba(68, 68, 68, 0.4)" }}
				className="absolute top-1 right-3 rounded-full p-2">
				<HeartIcon
					size={wp(5)}
					color={isFavourite ? colors.textHeader : colors.error}
				/>
			</TouchableOpacity>

			<Text
				style={{ fontSize: wp(4), color: colors.textHeader }}
				className="font-semibold">
				{item.title}
			</Text>
			<Text
				style={{ fontSize: wp(2.2), color: colors.textHeader }}
				className="font-semibold">
				{item.shortDescription}
			</Text>
		</TouchableOpacity>
	)
}
