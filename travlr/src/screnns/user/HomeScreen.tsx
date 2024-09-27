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
import { RouteProp, useRoute } from "@react-navigation/native"

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">

const HomeScreen: FC<HomeScreenRouteProp> = () => {
	const route = useRoute<HomeScreenRouteProp>()

	return (
		<SafeAreaView style={s.container}>
			<Text>HomeScreen</Text>
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
