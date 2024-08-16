import { StackScreenProps } from "@react-navigation/stack"
import React, { FC, useState } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { RootStackParamList } from "../../types/types"

type Props = StackScreenProps<RootStackParamList, "Signup">

const SignupScreen: FC<Props> = ({ navigation }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSignup = () => {
		// Handle signup logic here
		console.log(
			"Signing up with name:",
			name,
			"email:",
			email,
			"and password:",
			password
		)
	}

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<TextInput
				placeholder="Name"
				value={name}
				onChangeText={setName}
				style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 }}
			/>
			<Button title="Signup" onPress={handleSignup} />
		</View>
	)
}

export default SignupScreen
