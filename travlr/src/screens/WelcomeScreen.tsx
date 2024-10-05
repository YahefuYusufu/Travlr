import React, { useState, useEffect } from "react"
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ImageBackground,
} from "react-native"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import { RootStackParamList, WelcomeScreenProps } from "../types"
import Icon from "react-native-vector-icons/Ionicons"

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Welcome"
>

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
	const navigation = useNavigation<WelcomeScreenNavigationProp>()
	const { colors, toggleTheme, isDarkTheme } = useTheme()
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		const imageUri = Image.resolveAssetSource(
			require("../../assets/images/welcomeBG02.jpg")
		).uri
		Image.prefetch(imageUri).then(() => setImageLoaded(true))
	}, [])

	if (!imageLoaded) {
		return null // Return nothing while the image is loading
	}

	return (
		<ImageBackground
			source={require("../../assets/images/welcomeBG02.jpg")}
			style={{ flex: 1 }}
			imageStyle={{ opacity: 0.9 }}>
			<View style={{ flex: 1, justifyContent: "flex-end" }}>
				{/* Content on top of the image */}
				<View style={{ padding: 16, paddingBottom: 40, gap: 32 }}>
					<LinearGradient
						colors={["transparent", colors.bgNatural]}
						style={{
							position: "absolute",
							bottom: 0,
							width: wp(100),
							height: hp(35),
						}}
						start={{ x: 0.5, y: 0 }}
						end={{ x: 0.5, y: 1 }}
					/>
					<View style={{ gap: 12 }}>
						<Text
							style={{
								fontSize: wp(10),
								color: colors.borderLight,
								fontWeight: "bold",
							}}>
							Traveling Made Easy!
						</Text>
						<Text
							style={{
								fontSize: wp(4),
								color: colors.borderLight,
								fontWeight: "500",
							}}>
							Experience the world's best adventure with us
						</Text>
					</View>
					<TouchableOpacity
						style={{
							backgroundColor: colors.buttonBackground,
							alignSelf: "center",
							paddingVertical: 12,
							paddingHorizontal: 48,
							borderRadius: 8,
						}}
						onPress={() => {
							console.log("Navigating to Home...")
							navigation.navigate("Home")
						}}>
						<Text style={{ fontWeight: "bold", color: colors.borderLight }}>
							Let's Go!
						</Text>
					</TouchableOpacity>
				</View>
				{/* Theme toggle icon */}
				<TouchableOpacity
					style={{ position: "absolute", top: hp(8), right: wp(5) }}
					onPress={() => {
						console.log("Toggling theme...")
						toggleTheme()
					}}>
					<Icon
						name={isDarkTheme ? "moon" : "sunny"}
						size={hp(3)}
						color={isDarkTheme ? colors.warning : colors.success}
					/>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	)
}

export default WelcomeScreen
