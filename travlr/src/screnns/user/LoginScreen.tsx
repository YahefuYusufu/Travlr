import React, { useEffect, useState } from "react"

import {
	View,
	Text,
	TextInput,
	Button,
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { FormInput } from "../../types/types"
import { StackScreenProps } from "@react-navigation/stack"
import { loginUser } from "../../api/auth"
import { RootStackParamList } from "../../types/types"

type Props = StackScreenProps<RootStackParamList, "Login">

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
	const [email, setEmail] = useState<FormInput>({ value: "", error: null })
	const [password, setPassword] = useState<FormInput>({
		value: "",
		error: null,
	})
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleLogin = async () => {
		setLoading(true)
		setError(null)

		const result = await loginUser(email.value, password.value)
		if (result.success) {
			navigation.navigate("Home")
		} else {
			setError(result.error || "An unexpected error occurred")
		}
		setLoading(false)
	}

	useEffect(() => {
		const resetState = () => {
			setEmail({ value: "", error: "" })
			setPassword({ value: "", error: "" })
			setError(null)
		}

		const unsubscribe = navigation.addListener("focus", resetState)

		return () => unsubscribe()
	}, [navigation])

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Login</Text>

				<TextInput
					placeholder="Email"
					value={email.value}
					onChangeText={(text) => setEmail({ value: text, error: null })}
					style={styles.input}
					placeholderTextColor="#aaa"
					keyboardType="email-address"
				/>
				{email.error && <Text style={styles.errorText}>{email.error}</Text>}

				<TextInput
					placeholder="Password"
					secureTextEntry
					value={password.value}
					onChangeText={(text) => setPassword({ value: text, error: null })}
					style={styles.input}
					placeholderTextColor="#aaa"
				/>
				{password.error && (
					<Text style={styles.errorText}>{password.error}</Text>
				)}
				{error && <Text style={styles.errorText}>{error}</Text>}

				{loading && (
					<ActivityIndicator size="large" color="#333" style={styles.loading} />
				)}

				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.loginButton]}
						onPress={handleLogin}
						disabled={loading}>
						<Text style={styles.loginButtonText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.signupButton]}
						onPress={() => navigation.navigate("Signup")}
						disabled={loading}>
						<Text style={styles.sinUpButtonText}>Signup</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
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
		height: 50,
		borderColor: "#ddd",
		borderBottomWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
		fontSize: 16,
		color: "#333",
	},
	errorText: {
		color: "red", // Red color to indicate an error
		padding: 8,
		fontSize: 14, // Font size for error messages
		fontWeight: "bold", // Make the text bold for emphasis
		marginBottom: 10, // Space below the error text
		width: "100%", // Full width of the input container
		textAlign: "center",
	},
	loading: {
		marginVertical: 20,
		fontSize: 16,
	},
	buttons: {
		marginTop: 20,
	},
	button: {
		height: 50,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},
	loginButton: {
		backgroundColor: "#333",
	},
	signupButton: {
		backgroundColor: "#fff",
		borderColor: "#333",
		borderWidth: 1,
	},
	loginButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#eee",
	},
	sinUpButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
})

export default LoginScreen
