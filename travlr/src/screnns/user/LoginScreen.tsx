import React, { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { FormInput } from "../../types/types"

const LoginScreen = () => {
	const [email, setEmail] = useState<FormInput>({ value: "", error: "" })
	const [password, setPassword] = useState<FormInput>({ value: "", error: "" })
	const [error, setError] = useState<string | null>(null)

	const handleLogin = () => {
		// Basic input validation
		if (!email.value || !password.value) {
			setError("Please fill in all fields")
			return
		}

		// Simulate login (replace with actual API call)
		const user = { email: email.value, password: password.value }
		console.log("Logging in with:", user)
		setError(null) // Clear error message
	}

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
			<Button title="Login" onPress={handleLogin} />
		</View>
	)
}

export default LoginScreen
