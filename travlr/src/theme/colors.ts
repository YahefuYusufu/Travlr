export const LightColors = {
	// Primary colors
	mainGreen: "#15A196",
	accent: "#D4731D",
	background: "#ffffff",
	bgNatural: "#404040",
	gray700: "#221c30",

	// Text colors
	text: "#000000",
	textSecondary: "#6b7280",
	textHeader: "#ffffff",

	// Icon colors
	iconHeader: "#ffffff",
	iconPrimary: "#15A196",
	iconSecondary: "#6b7280",

	// Button colors
	buttonBackground: "#16a34a",
	buttonText: "#ffffff",

	// Border colors
	borderLight: "#e5e7eb",
	borderDark: "#d1d5db",

	// Notification color
	notification: "#ff3b30",

	// Additional future colors
	error: "#ef4444",
	success: "#34d399",
	warning: "#f59e0b",
	info: "#3b82f6",
}

export const DarkColors = {
	// Primary colors
	mainGreen: "#073763",
	accent: "#3b82f6",
	background: "#121212",
	bgNatural: "#f5f5f5",
	gray700: "#d1d1d1",

	// Text colors
	text: "#ffffff",
	textSecondary: "#9ca3af",
	textHeader: "#404040",

	// Icon colors
	iconHeader: "#ffffff",
	iconPrimary: "#15A196",
	iconSecondary: "#9ca3af",

	// Button colors
	buttonBackground: "#22c55e",
	buttonText: "#ffffff",

	// Border colors
	borderLight: "#374151",
	borderDark: "#4b5563",

	// Notification color
	notification: "#ff453a", // Example notification color for dark mode

	// Additional future colors
	error: "#f87171",
	success: "#10b981",
	warning: "#fbbf24",
	info: "#60a5fa",
}

export type ThemeColors = typeof LightColors | typeof DarkColors
