import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ArrowLeftIcon } from "react-native-heroicons/outline"

interface HeaderProps {
	title: string
	onBackPress: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
	return (
		<View className="flex-row items-center p-4 border-b border-gray-200">
			<TouchableOpacity onPress={onBackPress} className="mr-4">
				<ArrowLeftIcon size={24} color="black" />
			</TouchableOpacity>
			<Text className="text-xl font-bold">{title}</Text>
		</View>
	)
}

export default Header
