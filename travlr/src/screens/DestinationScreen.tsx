import React, { FC, useState } from "react"
import {
	View,
	Text,
	Image,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
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
} from "react-native-heroicons/solid"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import { DestinationScreenProps } from "../types"

const DestinationScreen: React.FC<DestinationScreenProps> = ({ route }) => {
	const { colors } = useTheme()
	const item = route.params
	const navigation = useNavigation()
	const [isFavourite, toggleFavourite] = useState(false)
	return (
		<View className="bg-white flex-1">
			<StatusBar style={"auto"} />
			<Image source={item.image} style={{ width: wp(100), height: hp(55) }} />

			{/* back button */}
			<SafeAreaView className="flex-row justify-between items-center w-full absolute">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="p-2 rounded-full ml-4"
					style={{ backgroundColor: "rgba(107, 105, 105, 0.5)" }}>
					<ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => toggleFavourite(!isFavourite)}
					className="p-2 rounded-full mr-4"
					style={{ backgroundColor: "rgba(107, 105, 105, 0.5)" }}>
					<HeartIcon
						size={wp(7)}
						strokeWidth={4}
						color={isFavourite ? "red" : "white"}
					/>
				</TouchableOpacity>
			</SafeAreaView>

			{/* title & description & booking button */}
			<View
				style={{
					borderTopLeftRadius: 40,
					borderTopRightRadius: 40,
					backgroundColor: colors.background,
				}}
				className="px-5 flex flex-1 justify-betwee pt-8 -mt-14">
				<ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
					<View className="flex-row justify-between items-start">
						<Text
							style={{ fontSize: wp(7), color: colors.text }}
							className="font-bold flex-1">
							{item?.title}
						</Text>
						<Text
							style={{ fontSize: wp(5), color: colors.text }}
							className="font-semibold">
							$ {item?.price}
						</Text>
					</View>
					<Text style={{ color: colors.text }}>{item?.longDescription}</Text>
					<View className="flex-row justify-between mx-1">
						<View className="flex-row space-x-2 items-start">
							<ClockIcon size={wp(7)} color="skyblue" />
							<View className="flex space-y-2">
								<Text
									style={{ fontSize: wp(4.5), color: colors.text }}
									className="font-bold">
									{item?.duration}
								</Text>
								<Text style={{ color: colors.text }} className="tracking-wide">
									Duration
								</Text>
							</View>
						</View>
						<View className="flex-row space-x-2 items-start">
							<MapPinIcon size={wp(7)} color="red" />
							<View className="flex space-y-2">
								<Text
									style={{ fontSize: wp(4.5), color: colors.text }}
									className="font-bold">
									{item?.distance}
								</Text>
								<Text style={{ color: colors.text }} className="tracking-wide">
									Distance
								</Text>
							</View>
						</View>
						<View className="flex-row space-x-2 items-start">
							<SunIcon size={wp(7)} color="orange" />
							<View className="flex space-y-2">
								<Text
									style={{ fontSize: wp(4.5), color: colors.text }}
									className="font-bold">
									{item?.weather}
								</Text>
								<Text style={{ color: colors.text }} className="tracking-wide">
									Weather
								</Text>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

export default DestinationScreen
