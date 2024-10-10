import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ArrowLeftIcon } from "react-native-heroicons/outline"
import { useTheme } from "../../theme/ThemeProvider"

interface HeaderProps {
	title: string
	onBackPress: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
	const { colors } = useTheme()

	return (
		<View className="flex-row items-center p-4 border-b border-gray-200 ">
			<TouchableOpacity onPress={onBackPress} className="mr-4">
				<ArrowLeftIcon size={24} color={colors.text} />
			</TouchableOpacity>
			<Text className="text-xl font-bold" style={{ color: colors.text }}>
				{title}
			</Text>
		</View>
	)
}

export default Header
