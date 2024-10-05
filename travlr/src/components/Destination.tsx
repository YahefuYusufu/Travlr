import React, { FC } from "react"
import { View } from "react-native"
import { destinationItem } from "../constants"
import { HomeScreenProps } from "../types"
import DestinationCard from "./DestinationCard"

const Destination: FC<{ navigation: HomeScreenProps["navigation"] }> = ({
	navigation,
}) => {
	return (
		<View className="mx-4 flex-row justify-between flex-wrap">
			{destinationItem.map((item, index) => (
				<DestinationCard
					key={index}
					item={item}
					onPress={() => navigation.navigate("Gallery", item)}
				/>
			))}
		</View>
	)
}

export default Destination
