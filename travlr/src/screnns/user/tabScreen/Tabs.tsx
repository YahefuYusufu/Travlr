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
				children={() => <HomeScreen userId={userId} />}
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
				children={() => <ProfileScreen />}
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
		bottom: 20,
		left: 20,
		right: 20,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#333",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.12,
		shadowRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 10,
	},
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	tabLabel: {
		fontSize: 12,
		color: "white",
		fontWeight: "600",
	},
})
