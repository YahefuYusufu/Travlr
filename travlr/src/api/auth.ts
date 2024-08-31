import axios from "axios"
import { API_URL } from "@env"
import {
	CreateUserParams,
	ApiResponse,
	ProfileDataProps,
	LoginCredentials,
} from "../types/types"

interface MyCustomError {
	message: string
	// Other properties as needed
}

type AxiosError = {
	response?: {
		data?: {
			error?: string
		}
	}
}

export const loginUser = async (
	email: string,
	password: string
): Promise<ApiResponse> => {
	try {
		const response = await axios.post(`${API_URL}/users/login`, {
			email,
			password,
		})

		if (response.status === 200) {
			console.log("Login successful!")
			return { success: true, user: response.data.user }
		} else {
			console.error("Login failed:", response.data)
			return {
				success: false,
				error:
					response.data.error || "Login failed. Please check your credentials.",
			}
		}
	} catch (error) {
		console.error("Login error:", error)
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				error:
					error.response?.data?.error ||
					"An unexpected error occurred at loginUser",
			}
		} else if (error instanceof Error) {
			return {
				success: false,
				error: error.message || "An unexpected error occurred",
			}
		} else {
			return {
				success: false,
				error: "An unexpected error occurred",
			}
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
export const signupUser = async (
	data: CreateUserParams
): Promise<ApiResponse> => {
	try {
		const response = await axios.post(`${API_URL}/users/register`, data)
		console.log(response.data)

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

// Define the parameters for creating a user

// export const signupUser = async (
// 	data: CreateUserParams
// ): Promise<ApiResponse> => {
// 	try {
// 		const response = await axios.post(`${API_URL}/users/register`, data)
// 		console.log(response.data)

// 		// Check if the response status is 201 (Created)
// 		if (response.status === 201) {
// 			// Ensure user field is included in the successful response
// 			return {
// 				success: true,
// 				user: {
// 					_id: response.data.user.id, // Extract user id
// 					name: response.data.user.name,
// 					email: response.data.user.email,
// 				},
// 			}
// 		} else {
// 			// Handle cases where the response status is not as expected
// 			return {
// 				success: false,
// 				error: response.data.error || "An unexpected error occurred",
// 			}
// 		}
// 	} catch (error) {
// 		// Handle axios-specific errors
// 		if (axios.isAxiosError(error)) {
// 			return {
// 				success: false,
// 				error: error.response?.data?.error || "A network error occurred",
// 			}
// 		} else if (error instanceof Error) {
// 			// Handle other generic errors
// 			return {
// 				success: false,
// 				error: error.message || "An unexpected error occurred",
// 			}
// 		} else {
// 			// Handle unknown errors
// 			return {
// 				success: false,
// 				error: "An unexpected error occurred",
// 			}
// 		}
// 	}
// }

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
