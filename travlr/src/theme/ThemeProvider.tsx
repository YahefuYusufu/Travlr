import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react"
import { useColorScheme } from "react-native"
import { LightColors, DarkColors } from "./colors"

// Define a type for the props that the ThemeProvider will receive
interface ThemeProviderProps {
	children: ReactNode // 'children' is required for React components
}

// Define a type for the theme context
interface ThemeContextType {
	isDarkTheme: boolean
	toggleTheme: () => void
	colors: typeof LightColors | typeof DarkColors
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const systemTheme = useColorScheme() // Detect system theme
	const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === "dark")

	useEffect(() => {
		setIsDarkTheme(systemTheme === "dark")
	}, [systemTheme])

	const toggleTheme = () => {
		setIsDarkTheme((prevTheme) => !prevTheme)
	}

	const colors = isDarkTheme ? DarkColors : LightColors

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme, colors }}>
			{children}
		</ThemeContext.Provider>
	)
}

// Hook for accessing the theme
export const useTheme = () => {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}

	return context
}
