// colors.ts

export const LightColors = {
	mainGreen: "#15A196",
	accent: "#D4731D", // Accent color for gradients, etc.
	gray700: "#221c30",
	background: "#ffffff", // Light theme background color
	text: "#000000", // Normal text which is black
	textSecondary: "#6b7280", // Lighter text color for secondary text
	textHeader: "#ffffff", // Text in the Header Part
	iconHeader: "#ffffff",
	buttonBackground: "#22c55e", // Green button background for light mode
}

export const DarkColors = {
	mainGreen: "#073763",
	accent: "#D4731D", // Accent color for gradients, etc.
	gray700: "#d1d1d1",
	background: "#121212", // Dark theme background color
	text: "#ffffff", // Dark theme text color
	textSecondary: "#9ca3af", // Lighter text color for secondary text
	textHeader: "#ffffff", // Text in the Header Part
	iconHeader: "#ffffff",
	buttonBackground: "#16a34a", // Slightly darker green button for dark mode
}

export type ThemeColors = typeof LightColors | typeof DarkColors
