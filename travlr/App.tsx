import { StatusBar } from "expo-status-bar"

import Navigation from "./src/navigation/Navigation"
import { ThemeProvider } from "./src/theme/ThemeProvider"

export default function App() {
	return (
		<ThemeProvider>
			<Navigation />
			<StatusBar animated style="auto" />
		</ThemeProvider>
	)
}
