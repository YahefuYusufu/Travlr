import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import { RootStackParamList, WelcomeScreenProps } from "../types"
import Icon from "react-native-vector-icons/Ionicons"

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Welcome"
>

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
	const navigation = useNavigation<WelcomeScreenNavigationProp>()
	const { colors, toggleTheme, isDarkTheme } = useTheme()

	return (
		<View className="flex-1 justify-end">
			{/* Background image */}
			<Image
				source={require("../../assets/images/welcomeBG02.jpg")}
				className="absolute inset-0 w-full h-full object-cover"
				style={{ opacity: 0.9 }}
			/>
			{/* Content on top of the image */}
			<View className="p-4 pb-10 space-y-8">
				<LinearGradient
					colors={["transparent", colors.warning]}
					style={{ width: wp(100), height: hp(60) }}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					className="absolute bottom-0"
				/>
				<View className="space-y-3">
					<Text
						className="text-5xl font-bold"
						style={{
							fontSize: wp(10),
							color: colors.text,
						}}>
						Traveling Made Easy!
					</Text>
					<Text
						className="font-medium"
						style={{
							fontSize: wp(4),
							color: colors.borderDark,
						}}>
						Experience the world's best adventure with us
					</Text>
				</View>
				<TouchableOpacity
					className="mx-auto p-3 px-12 rounded-md"
					style={{
						backgroundColor: colors.buttonBackground,
					}}
					onPress={() => {
						console.log("Navigating to Home...")
						navigation.navigate("Home")
					}}>
					<Text className="font-bold" style={{ color: colors.textHeader }}>
						Let's Go!
					</Text>
				</TouchableOpacity>
			</View>
			{/* Theme toggle icon */}
			<TouchableOpacity
				style={{ position: "absolute", top: hp(8), right: wp(5) }}
				onPress={() => {
					console.log("Toggling theme...")
					toggleTheme()
				}}>
				<Icon
					name={isDarkTheme ? "sunny" : "moon"}
					size={hp(3)}
					color={isDarkTheme ? colors.success : colors.warning}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default WelcomeScreen
