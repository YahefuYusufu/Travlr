import { View, Text, Image, TouchableOpacity } from "react-native"
import React from "react"

const WelcomeScreen = () => {
	return (
		<View className="flex-1 justify-end">
			{/* Background image */}
			<Image
				source={require("../../assets/images/welcomeBG02.jpg")}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			{/* Content on top of the image */}
			<View className="p-4 pb-10 space-y-8">
				<View className="space-y-3">
					<Text className="text-5xl font-bold text-white">
						Traveling Made Easy!
					</Text>
					<Text className="text-neutral-200 font-medium">
						Experience the world's best adventure with us
					</Text>
				</View>
				<TouchableOpacity className="bg-orange-500 mx-auto p-3 px-12 rounded-full">
					<Text className="text-white font-bold">Let's Go!</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default WelcomeScreen
