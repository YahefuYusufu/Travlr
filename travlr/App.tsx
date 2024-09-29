import React from "react"
import AppNavigation from "./src/navigation/Navigation"
import { StatusBar } from "expo-status-bar"

export default function App() {
	return (
		<>
			{/* Set transparent background */}
			<AppNavigation />
			<StatusBar animated style="auto" />
		</>
	)
}
