import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { useTheme } from "../../theme/ThemeProvider"
import { categoriesData } from "../../constants"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { GalleryProps } from "../../types"
import { TEXTS } from "../../constants/strings"

export default function Gallery() {
	const { colors } = useTheme()

	return (
		<View className="space-y-5">
			<View className="mx-5 flex-row justify-between items-center">
				<Text style={{ color: colors.text }} className="font-bold">
					{TEXTS.GALLERY}
				</Text>
				<TouchableOpacity>
					<Text style={{ color: colors.error }} className="font-bold">
						{TEXTS.SEE_ALL}
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				className="space-x-4"
				showsHorizontalScrollIndicator={false}>
				{categoriesData.map((cat: GalleryProps, index: number) => {
					return (
						<TouchableOpacity
							key={index}
							className="flex items-center space-y-2">
							<Image
								source={cat.image}
								className="rounded-3xl"
								style={{ width: wp(20), height: wp(20) }}
							/>
							<Text
								style={{ color: colors.text, fontSize: wp(3) }}
								className="font-medium">
								{cat.title}
							</Text>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</View>
	)
}
