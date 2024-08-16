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

export const logoutUser = async () => {
	try {
		const response = await axios.post(`${API_URL}/users/logout`)
		// Handle successful logout, clear token, etc.
		return response.data
	} catch (error) {
		console.error("Logout error:", error)
		throw error // Re-throw the error for handling in the calling component
	}
}
