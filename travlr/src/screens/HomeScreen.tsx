import { View, Text } from "react-native"
import React from "react"
import { HomeScreenProps } from "../types"
import { useTheme } from "../theme/ThemeProvider"

const HomeScreen: React.FC<HomeScreenProps> = () => {
	const { colors } = useTheme()

	return (
		<View
			className="flex-1 justify-center items-center"
			style={{ backgroundColor: colors.background }}>
			<Text style={{ color: colors.text, fontSize: 24 }}>HomeScreen</Text>
		</View>
	)
}

export default HomeScreen
