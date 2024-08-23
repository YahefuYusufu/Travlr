import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { RootStackParamList } from "../../types/types"
import { StackScreenProps } from "@react-navigation/stack"

type Props = StackScreenProps<RootStackParamList, "Favorites">

const FavoriteScreen: FC<Props> = () => {
	return <View></View>
}

const styles = StyleSheet.create({})

export default FavoriteScreen
