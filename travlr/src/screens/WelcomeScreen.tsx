import { View, Text, Image } from "react-native"
import React from "react"

const WelcomeScreen = () => {
	return (
		<View className="flex-1 flex justify-end">
			{/* Background image */}
			<Image
				source={require("../../assets/image/welcome.jpg")}
				className="h-full w-full absolute"
			/>
			{/* Background image */}
			<View className="p-5 pb-10 space-y-8">
				<View className="space-y-3">
					<Text>Travling Made Easy!</Text>
				</View>
			</View>
		</View>
	)
}

export default WelcomeScreen
