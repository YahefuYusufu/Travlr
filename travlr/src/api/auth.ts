// api/userService.ts
import axios from "axios"
import { API_URL } from "@env"
import { ApiResponse, CreateUserParams, UserProfile } from "../types/types"

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
): Promise<ApiResponse<UserProfile>> => {
	try {
		const response = await axios.post(`${API_URL}/users/login`, {
			email,
			password,
		})

		if (response.status === 200) {
			console.log("Login successful!")
			return { success: true, data: response.data.user }
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
				data: response.data.user,
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

export const fetchUserProfile = async (
	userId: string
): Promise<ApiResponse<UserProfile>> => {
	try {
		const response = await axios.get(`${API_URL}/users/${userId}`)
		return {
			success: true,
			data: response.data.user,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				error:
					error.response?.data?.error ||
					"An unexpected error occurred at fetchUserProfile",
			}
		} else if (error instanceof Error) {
			return {
				success: false,
				error:
					error.message || "An unexpected error occurred at fetchUserProfile",
			}
		} else {
			return {
				success: false,
				error: "An unexpected error occurred at fetchUserProfile",
			}
		}
	}
}

export const updateUserProfile = async (
	userId: string,
	profileData: { firstName: string; lastName: string; picture?: string }
): Promise<ApiResponse<UserProfile>> => {
	try {
		const response = await axios.put(`${API_URL}/users/${userId}`, profileData)
		return {
			success: true,
			data: response.data,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				error:
					error.response?.data?.error ||
					"An unexpected error occurred at updateUserProfile",
			}
		} else if (error instanceof Error) {
			return {
				success: false,
				error:
					error.message || "An unexpected error occurred at updateUserProfile",
			}
		} else {
			return {
				success: false,
				error: "An unexpected error occurred at updateUserProfile",
			}
		}
	}
}
