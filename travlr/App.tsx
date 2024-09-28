import { StatusBar } from "expo-status-bar"

import Navigation from "./src/navigation/Navigation"

export default function App() {
	return (
		<>
			<Navigation />
			<StatusBar animated style="auto" />
		</>
	)
}
