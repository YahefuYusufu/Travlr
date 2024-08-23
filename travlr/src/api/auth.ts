import axios from "axios"
import { API_URL } from "@env"

interface MyCustomError {
	message: string
	// Other properties as needed
}

export const loginUser = async (
	email: string,
	password: string
): Promise<{ success: boolean; error?: string }> => {
	try {
		const response = await axios.post(`${API_URL}/users/login`, {
			email,
			password,
		})

		if (response.status === 200) {
			console.log("Login successful!")
			return { success: true }
		} else {
			console.error("Login failed:", response.data)
			return {
				success: false,
				error: "Login failed. Please check your credentials.",
			}
		}
	} catch (error) {
		console.error("Login error:", error)
		return { success: false, error: "An unexpected error occurred" }
	}
}

export const logoutUser = async (): Promise<void> => {
	try {
		const response = await axios.post(
			`${API_URL}/logout`,
			{},
			{
				// withCredentials: true, // Only if you use cookies or sessions
			}
		)

		if (response.status === 200) {
			console.log("Logout successful!")
		} else {
			throw new Error(`Logout failed with status: ${response.status}`)
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(
				"Axios error during logout:",
				error.response?.data || error.message
			)
		} else {
			console.error("Error during logout:", error)
		}
		throw error
	}
}
