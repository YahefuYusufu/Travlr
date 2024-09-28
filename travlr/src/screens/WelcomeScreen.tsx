import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"

const WelcomeScreen = () => {
	const navigation = useNavigation()
	return (
		<View className="flex-1 justify-end">
			{/* Background image */}
			<Image
				source={require("../../assets/images/welcomeBG02.jpg")}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			{/* Content on top of the image */}
			<View className="p-4 pb-10 space-y-8">
				<LinearGradient
					colors={["transparent", "rgba(3,105,161,0.8)"]}
					style={{ width: wp(100), height: hp(60) }}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					className="absolute bottom-0"
				/>
				<View className="space-y-3">
					<Text
						className="text-5xl font-bold text-white"
						style={{ fontSize: wp(10) }}>
						Traveling Made Easy!
					</Text>
					<Text
						className="text-neutral-200 font-medium"
						style={{ fontSize: wp(4) }}>
						Experience the world's best adventure with us
					</Text>
				</View>
				<TouchableOpacity className="bg-orange-500 mx-auto p-3 px-12 rounded-full">
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
