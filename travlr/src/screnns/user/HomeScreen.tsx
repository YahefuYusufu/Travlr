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

type Props = StackScreenProps<RootStackParamList, "HomeTabs">

const HomeScreen: FC<Props> = ({ navigation }) => {
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
	},
	buttonContainer: {
		position: "absolute",
		top: 40,
		right: 40,
	},
})

export default HomeScreen
