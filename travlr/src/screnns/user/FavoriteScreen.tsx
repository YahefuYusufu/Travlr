import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "../../types/types"
import { StackScreenProps } from "@react-navigation/stack"

type Props = StackScreenProps<RootStackParamList, "Favorites">

const FavoriteScreen: FC<Props> = () => {
	return (
		<View style={s.container}>
			<Text>FavoriteScreen</Text>
		</View>
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

export default FavoriteScreen
