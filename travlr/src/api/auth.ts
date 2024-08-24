import axios from "axios"
import { API_URL } from "@env"
import { CreateUserParams, CreateUserResponse } from "../types/types"

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
			`${API_URL}/users/logout`,
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

// userService.ts

// Define the response type for the API call

// Function to create a user
export const createUser = async (
	data: CreateUserParams
): Promise<CreateUserResponse> => {
	try {
		// Replace with your API endpoint
		const response = await axios.post(`${API_URL}/users/register`, data)

		if (response.data.success) {
			return { success: true }
		} else {
			return {
				success: false,
				error: response.data.error || "An unexpected error occurred",
			}
		}
	} catch (error) {
		// Handle errors and type-check
		if (axios.isAxiosError(error)) {
			// Handle axios-specific errors
			return {
				success: false,
				error: error.response?.data?.error || "An unexpected error occurred",
			}
		} else if (error instanceof Error) {
			// Handle other errors
			return {
				success: false,
				error: error.message || "An unexpected error occurred",
			}
		} else {
			// Handle unknown errors
			return { success: false, error: "An unexpected error occurred" }
		}
	}
}
