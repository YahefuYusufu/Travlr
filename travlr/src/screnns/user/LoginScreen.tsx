import React, { useState } from "react"
import {
	View,
	Text,
	TextInput,
	Button,
	ActivityIndicator,
	StyleSheet,
} from "react-native"
import { FormInput } from "../../types/types"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { loginUser } from "../../api/auth"
import axios from "axios"

const LoginScreen = () => {
	const [email, setEmail] = useState<FormInput>({ value: "", error: "" })
	const [password, setPassword] = useState<FormInput>({ value: "", error: "" })
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const navigation = useNavigation()

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/v1/users/login",
				{ email, password }
			)

			if (response.status === 200) {
				const { token } = response.data
				if (token) {
					// Store token and navigate to home screen
					await AsyncStorage.setItem("authToken", token)
					navigation.navigate("HomeScreen")
				} else {
					console.error("Login failed: Missing token in response")
					setError("Login failed. Please check your credentials.")
				}
			} else {
				console.error("Login failed:", response.data)
				setError("Login failed. Please check your credentials.")
			}
		} catch (error) {
			console.error("Login error:", error)
			setError("An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={s.container}>
			<TextInput
				placeholder="Email"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: "" })}
				style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			{email.error && <Text style={{ color: "red" }}>{email.error}</Text>}
			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: "" })}
				style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			{password.error && <Text style={{ color: "red" }}>{password.error}</Text>}
			{error && <Text style={{ color: "red" }}>{error}</Text>}
			{loading && <ActivityIndicator size="large" color="#0000ff" />}

			<Button title="Login" onPress={handleLogin} disabled={loading} />
		</View>
	)
}

export default LoginScreen

const s = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
