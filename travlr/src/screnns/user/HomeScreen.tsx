import React, { FC, useCallback } from "react"
import {
	View,
	Text,
	Button,
	StyleSheet,
	Alert,
	SafeAreaView,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../../types/types"

type HomeScreenProps = StackScreenProps<RootStackParamList, "Home"> & {
	userId?: string
}
const HomeScreen: FC<HomeScreenProps> = ({ route }) => {
	const { userId } = route.params
	return (
		<SafeAreaView style={s.container}>
			<Text>HomeScreen</Text>
			{userId ? (
				<Text>Welcome, User ID: {userId}</Text>
			) : (
				<Text>No User ID provided</Text>
			)}
		</SafeAreaView>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
})

export default HomeScreen
