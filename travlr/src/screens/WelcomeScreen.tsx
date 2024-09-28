import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { WelcomeScreenProps } from "../types"
import { useTheme } from "../theme/ThemeProvider"

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
	const navigation = useNavigation()
	const { colors } = useTheme()
	return (
		<View
			className="flex-1 justify-end"
			style={{ backgroundColor: colors.background }}>
			{/* Background image */}
			<Image
				source={require("../../assets/images/welcomeBG02.jpg")}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			{/* Content on top of the image */}
			<View className="p-4 pb-10 space-y-8">
				<LinearGradient
					colors={["transparent", colors.accent]}
					style={{ width: wp(100), height: hp(60) }}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					className="absolute bottom-0"
				/>
				<View className="space-y-3">
					<Text
						className="text-5xl font-bold text-white"
						style={{ fontSize: wp(10), color: colors.text }}>
						Traveling Made Easy!
					</Text>
					<Text
						className="text-neutral-200 font-medium"
						style={{ color: colors.textSecondary, fontSize: wp(4) }}>
						Experience the world's best adventure with us
					</Text>
				</View>
				<TouchableOpacity
					style={{ backgroundColor: colors.buttonBackground }}
					className="bg-green-500 mx-auto p-3 px-12 rounded-full">
					<Text
						className="text-white font-bold"
						onPress={() => navigation.navigate("Home")}>
						Let's Go!
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default WelcomeScreen
