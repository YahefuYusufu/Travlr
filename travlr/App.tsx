// App.tsx
import React from "react"
import AppNavigation from "./src/navigation/Navigation"
import { StatusBar } from "expo-status-bar"
import { TripProvider } from "./src/context/TripContext"

export default function App() {
	return (
		<TripProvider>
			<AppNavigation />
			<StatusBar animated style="auto" />
		</TripProvider>
	)
}
