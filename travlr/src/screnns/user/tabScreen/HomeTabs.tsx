// HomeTabs.tsx
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../HomeScreen"
import FavoriteScreen from "../FavoriteScreen"
import ProfileScreen from "../ProfileScreen"
import { RootStackParamList } from "../../../types/types"

const Tab = createBottomTabNavigator<RootStackParamList>()

const HomeTabs = () => (
	<Tab.Navigator>
		<Tab.Screen name="HomeTabs" component={HomeScreen} />
		<Tab.Screen name="Favorites" component={FavoriteScreen} />
		<Tab.Screen name="Profile" component={ProfileScreen} />
	</Tab.Navigator>
)

export default HomeTabs
