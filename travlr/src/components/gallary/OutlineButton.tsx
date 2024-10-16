import React, { ReactNode } from "react"
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	GestureResponderEvent,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Define prop types
type OutlineButtonProps = {
	onPress: (event: GestureResponderEvent) => void
	icon: keyof typeof Ionicons.glyphMap // Correct type for the Ionicons name
	children: ReactNode
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
	onPress,
	icon,
	children,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
			<Ionicons name={icon} size={18} style={styles.icon} />
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		margin: 4,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 5,
	},
	pressed: {
		opacity: 0.7,
	},
	icon: {
		marginRight: 6,
	},
	text: {
		fontWeight: "bold",
	},
})

export default OutlineButton
