// api/userService.ts
import axios from "axios"
import { API_URL } from "@env"
import { ApiResponse, CreateUserParams, UserProfile } from "../types/types"

export const loginUser = async (
	email: string,
	password: string
): Promise<ApiResponse<UserProfile>> => {
	try {
		const response = await axios.post(`${API_URL}/users/login`, {
			email,
			password,
		})

		if (response.status === 200 && response.data.user) {
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
		const response = await axios.post(`${API_URL}/users/logout`)

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

export const signupUser = async (
	data: CreateUserParams
): Promise<ApiResponse<UserProfile>> => {
	try {
		const response = await axios.post(`${API_URL}/users/register`, data)
		console.log(response.data)

		if (response.status === 201) {
			return {
				success: true,
				user: response.data.user,
			}
		} else {
			return {
				success: false,
				error: response.data.error || "An unexpected error occurred",
			}
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				error: error.response?.data?.error || "An unexpected error occurred",
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

// export const fetchUserProfile = async (
// 	userId: string
// ): Promise<ApiResponse<UserProfile>> => {
// 	try {
// 		const response = await fetch(`${API_URL}/users/profile/${userId}`)
// 		const textResponse = await response.text()
// 		console.log("Raw response text:", textResponse)

// 		const result = JSON.parse(textResponse)

// 		if (response.ok) {
// 			return { success: true, user: result.profile }
// 		} else {
// 			return {
// 				success: false,
// 				error: result.error || "Failed to fetch profile",
// 			}
// 		}
// 	} catch (error) {
// 		return { success: false, error: (error as Error).message }
// 	}
// }

// export const updateUserProfile = async (
// 	userId: string,
// 	profileData: Partial<UserProfile>
// ): Promise<ApiResponse<UserProfile>> => {
// 	try {
// 		const response = await axios.put(
// 			`${API_URL}/users/profileUpdate/${userId}`,
// 			profileData
// 		)
// 		return {
// 			success: true,
// 			user: response.data,
// 		}
// 	} catch (error) {
// 		if (axios.isAxiosError(error)) {
// 			return {
// 				success: false,
// 				error:
// 					error.response?.data?.error ||
// 					"An unexpected error occurred at updateUserProfile",
// 			}
// 		} else if (error instanceof Error) {
// 			return {
// 				success: false,
// 				error:
// 					error.message || "An unexpected error occurred at updateUserProfile",
// 			}
// 		} else {
// 			return {
// 				success: false,
// 				error: "An unexpected error occurred at updateUserProfile",
// 			}
// 		}
// 	}
// }
