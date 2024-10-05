import React from "react"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { NewTripScreenProps } from "../types"
import { useTheme } from "../theme/ThemeProvider"
import { ArrowLeftIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const NewTripScreen: React.FC<NewTripScreenProps> = () => {
	const { colors } = useTheme()
	const navigation = useNavigation()

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: colors.background }}>
			{/* Custom Header */}
			<View className="flex-row items-center p-4 border-b border-gray-200">
				<TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
					<ArrowLeftIcon size={wp(7)} color={colors.text} />
				</TouchableOpacity>
				<Text className="text-xl font-bold" style={{ color: colors.text }}>
					New Trip
				</Text>
			</View>

			{/* Screen Content */}
			<View className="flex-1 justify-center items-center">
				<Text className="text-2xl" style={{ color: colors.text }}>
					Create Your New Trip
				</Text>
				{/* Add your new trip form or content here */}
			</View>
		</SafeAreaView>
	)
}

export default NewTripScreen
