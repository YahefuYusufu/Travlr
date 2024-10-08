export const DarkColors = {
	// Primary colors
	mainGreen: "#15A196",
	accent: "#D4731D",
	background: "#ffffff",
	bgNatural: "#404040",
	gray700: "#221c30",
	bgSecondary: "#6b7280",

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

export const LightColors = {
	// Primary colors
	mainGreen: "#0A5E69", // Darker shade of light mode's mainGreen
	accent: "#2B82E2", // Cooler tone opposite to light mode's warm accent
	background: "#121212",
	bgNatural: "#f5f5f5",
	gray700: "#dfe3f0", // Lighter shade opposite to light mode's dark gray
	bgSecondary: "#0A5E69",

	// Text colors
	text: "#ffffff",
	textSecondary: "#9ca3af",
	textHeader: "#000000", // Black to contrast with light backgrounds

	// Icon colors
	iconHeader: "#000000", // Black for contrast on light backgrounds
	iconPrimary: "#0A5E69", // Matching updated mainGreen
	iconSecondary: "#9ca3af",

	// Button colors
	buttonBackground: "#22c55e",
	buttonText: "#000000", // Black text for contrast on light button

	// Border colors
	borderLight: "#374151",
	borderDark: "#4b5563",

	// Notification color
	notification: "#ff453a",

	// Additional future colors
	error: "#f87171",
	success: "#10b981",
	warning: "#fbbf24",
	info: "#60a5fa",
}

export type ThemeColors = typeof LightColors | typeof DarkColors
