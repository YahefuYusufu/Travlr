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
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../../types/types"
import { signupUser } from "../../api/auth"
import { ApiResponse, User } from "../../types/types"
import { useUser } from "../../context/UserProvider"

type Props = StackScreenProps<RootStackParamList, "Signup">

const SignupScreen: FC<Props> = ({ navigation }) => {
	const { setUserId } = useUser()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSignup = async () => {
		setLoading(true)
		setError(null)

		try {
			const result = await signupUser({ name, email, password })

			if (result.success) {
				const userId = result.user?._id // Extract userId from response

				if (userId) {
					setUserId(userId)
					navigation.navigate("Profile", { userId }) // Pass userId to Profile screen
					console.log("USER ID from SignUp screen: ", userId)
				} else {
					setError("User ID is missing from the response.")
				}
			} else {
				setError(result.error || "An unexpected error occurred during signup.")
			}
		} catch (err) {
			setError("An error occurred. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Sign Up</Text>

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
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		bottom: 60,
	},
	innerContainer: {
		width: "90%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 20,
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
		backgroundColor: "#fff",
	},
	button: {
		backgroundColor: "#333",
		padding: 15,
		borderRadius: 5,
		width: "100%",
		alignItems: "center",
		elevation: 3,
		shadowColor: "#000",
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
