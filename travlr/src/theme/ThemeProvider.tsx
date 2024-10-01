import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react"
import { useColorScheme } from "react-native"
import { LightColors, DarkColors } from "./colors"

interface ThemeProviderProps {
	children: ReactNode
}

interface ThemeContextType {
	isDarkTheme: boolean
	toggleTheme: () => void
	colors: typeof LightColors | typeof DarkColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const systemTheme = useColorScheme()
	const [isDarkTheme, setIsDarkTheme] = useState(false)

	useEffect(() => {
		const newTheme = systemTheme === "light"

		setIsDarkTheme(newTheme)
	}, [systemTheme])

	const toggleTheme = () => {
		setIsDarkTheme((prevTheme) => !prevTheme)
	}

	const colors = isDarkTheme ? LightColors : DarkColors

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme, colors }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
