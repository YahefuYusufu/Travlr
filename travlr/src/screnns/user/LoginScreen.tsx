import React, { useState } from "react"

import {
	View,
	Text,
	TextInput,
	Button,
	ActivityIndicator,
	StyleSheet,
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

		const result = await loginUser(email.value, password.value)
		if (result.success) {
			navigation.navigate("Home")
		} else {
			setError(result.error || "An unexpected error occurred")
		}
		setLoading(false)
	}

	return (
		<View style={s.container}>
			<TextInput
				placeholder="Email"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: null })}
				style={s.input}
			/>
			{email.error && <Text style={s.errorText}>{email.error}</Text>}
			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: null })}
				style={s.input}
			/>
			{password.error && <Text style={s.errorText}>{password.error}</Text>}
			{error && <Text style={s.errorText}>{error}</Text>}
			{loading && <ActivityIndicator size="large" color="#0000ff" />}

			<View style={s.buttons}>
				<Button title="Login" onPress={handleLogin} disabled={loading} />
				<Button
					title="Singup"
					onPress={() => navigation.navigate("Signup")}
					disabled={loading}
				/>
			</View>
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
	input: {
		width: "80%",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
	errorText: {
		color: "red",
		marginBottom: 10,
	},
	buttons: {
		flexDirection: "row",
	},
})
