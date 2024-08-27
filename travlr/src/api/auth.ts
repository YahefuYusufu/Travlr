import axios from "axios"
import { API_URL } from "@env"
import {
	CreateUserParams,
	CreateUserResponse,
	ProfileDataProps,
} from "../types/types"

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
		return {
			success: false,
			error: "An unexpected error occurred at loginUser",
		}
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
		const response = await axios.post(`${API_URL}/users/register`, data)

		if (response.status === 201) {
			return {
				success: true,
				user: response.data.user, // Ensure user field is included on success
			}
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
			return {
				success: false,
				error: "An unexpected error occurred",
			}
		}
	}
}

export const updateUserProfile = async (
	userId: string,
	profileData: ProfileDataProps
) => {
	try {
		const response = await axios.put(
			`${API_URL}/users/profile/${userId}`,
			profileData
		)

		if (response.status === 200) {
			return { success: true, data: response.data }
		} else {
			return {
				success: false,
				error: `Unexpected response status: ${response.status}`,
			}
		}
	} catch (error) {
		// Log the error for debugging
		console.error("Error during updateUserProfile:", error)
		if (axios.isAxiosError(error)) {
			// If it's an Axios error, handle accordingly
			return {
				success: false,
				error:
					error.response?.data?.error ||
					"An unexpected error occurred in updateUserProfile",
			}
		} else if (error instanceof Error) {
			// Handle generic JavaScript errors
			return {
				success: false,
				error:
					error.message || "An unexpected error occurred in updateUserProfile",
			}
		} else {
			// Fallback for unknown error types
			return {
				success: false,
				error: "An unexpected error occurred in updateUserProfile",
			}
		}
	}
}
