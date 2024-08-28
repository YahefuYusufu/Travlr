import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../HomeScreen"
import FavoriteScreen from "../FavoriteScreen"
import ProfileScreen from "../ProfileScreen"
import { RootStackParamList } from "../../../types/types"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { StyleSheet, View } from "react-native"
import { useRoute } from "@react-navigation/native"

const Tab = createBottomTabNavigator<RootStackParamList>()
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons)

type HomeTabsProps = {
	userId: string
}

const Tabs: React.FC = () => {
	const route = useRoute()
	const { userId } = route.params as { userId: string }

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: s.tabBar,
				tabBarShowLabel: true,
				tabBarLabelStyle: s.tabLabel,
			}}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => {
						const animatedStyle = useAnimatedStyle(() => {
							return {
								transform: [
									{ scale: withTiming(focused ? 1.3 : 1, { duration: 500 }) },
								],
							}
						})
						return (
							<View style={s.iconContainer}>
								<AnimatedIcon
									style={animatedStyle}
									name="home"
									size={24}
									color={focused ? "white" : "gray"}
								/>
							</View>
						)
					},
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={FavoriteScreen}
				options={{
					tabBarIcon: ({ focused }) => {
						const animatedStyle = useAnimatedStyle(() => {
							return {
								transform: [
									{ scale: withTiming(focused ? 1.3 : 1, { duration: 500 }) },
								],
							}
						})
						return (
							<View style={s.iconContainer}>
								<AnimatedIcon
									style={animatedStyle}
									name="heart"
									size={24}
									color={focused ? "white" : "gray"}
								/>
							</View>
						)
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => {
						const animatedStyle = useAnimatedStyle(() => {
							return {
								transform: [
									{ scale: withTiming(focused ? 1.3 : 1, { duration: 500 }) },
								],
							}
						})
						return (
							<View style={s.iconContainer}>
								<AnimatedIcon
									style={animatedStyle}
									name="account"
									size={24}
									color={focused ? "green" : "gray"}
								/>
							</View>
						)
					},
				}}
			/>
		</Tab.Navigator>
	)
}

export default Tabs

const s = StyleSheet.create({
	tabBar: {
		position: "absolute",
		bottom: 20, // Distance from the bottom
		left: 20, // Distance from the left
		right: 20, // Distance from the right
		height: 70, // Height of the TabBar
		borderRadius: 35, // Rounded corners
		backgroundColor: "#333", // Background color
		elevation: 5, // Elevation for Android
		shadowColor: "#000", // Shadow color for iOS
		shadowOffset: { width: 0, height: 10 }, // Shadow offset for iOS
		shadowOpacity: 0.12, // Shadow opacity for iOS
		shadowRadius: 10, // Shadow radius for iOS
		justifyContent: "center", // Center items vertically
		alignItems: "center", // Center items horizontally
		paddingBottom: 10, // Adjust space for labels
	},
	iconContainer: {
		justifyContent: "center", // Center icons vertically
		alignItems: "center", // Center icons horizontally
	},
	tabLabel: {
		fontSize: 12, // Set font size
		color: "white", // Set default color
		fontWeight: "600",
	},
})
