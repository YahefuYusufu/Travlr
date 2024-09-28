import { StatusBar } from "expo-status-bar"

import Navigation from "./src/navigation/Navigation"
import { Text, View } from "react-native"

export default function App() {
	return (
		<>
			<Navigation />
			<StatusBar animated style="auto" />
		</>
	)
}
