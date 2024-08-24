import { StackScreenProps } from "@react-navigation/stack"
import React, { FC, useState } from "react"
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native"
import { RootStackParamList } from "../../types/types"
import { createUser } from "../../api/auth"

type Props = StackScreenProps<RootStackParamList, "Signup">

const SignupScreen: FC<Props> = ({ navigation }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSignup = async () => {
		setLoading(true)
		setError(null)

		const result = await createUser({ name, email, password })
		if (result.success) {
			navigation.navigate("Login") // Navigate to Login on success
		} else {
			result.error || "An unexpected register error occurred in SignUpScreen"
		}
		setLoading(false)
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Login</Text>

				<TextInput
					placeholder="Name"
					value={name}
					onChangeText={setName}
					style={styles.input}
				/>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					style={styles.input}
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<TouchableOpacity onPress={handleSignup} style={styles.button}>
						<Text style={styles.buttonText}>Signup</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff", // Background color of the screen
		paddingHorizontal: 20,
		bottom: 60,
	},
	innerContainer: {
		width: "90%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 20,
		// Elevation for Android
		elevation: 5,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 40,
		textAlign: "center",
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 15,
		fontSize: 16,
		marginBottom: 15,
		borderRadius: 5,
		backgroundColor: "#fff", // Input background color
	},
	button: {
		backgroundColor: "#333",
		padding: 15,
		borderRadius: 5,
		width: "100%",
		alignItems: "center",
		elevation: 3, // Shadow for Android
		shadowColor: "#000", // Shadow for iOS
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	errorText: {
		color: "red",
		marginBottom: 15,
	},
})

export default SignupScreen
