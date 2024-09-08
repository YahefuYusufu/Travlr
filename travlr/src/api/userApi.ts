import { API_URL } from "@env"
import { ProfileWithImageResponse } from "../types/types"
import axios from "axios"
import { convertUriToBlob, convertUriToFile } from "../utils/helpers"

export const getUserProfile = async (
	userId: string
): Promise<ProfileWithImageResponse> => {
	try {
		const response = await axios.get(`${API_URL}/profiles/users/${userId}`)
		const result = response.data

		return { success: true, profile: result.user }
	} catch (error) {
		return { success: false, error: (error as Error).message }
	}
}

// export const updateUserProfile = async (
// 	userId: string,
// 	firstName: string,
// 	lastName: string,
// 	imageFile?: File
// ): Promise<UploadImageResponse> => {
// 	try {
// 		const formData = new FormData()
// 		formData.append("firstName", firstName)
// 		formData.append("lastName", lastName)
// 		if (imageFile) {
// 			formData.append("file", imageFile)
// 		}
// 		const response = await axios.post(
// 			`${API_URL}/profiles/users/${userId}`,
// 			formData,
// 			{
// 				headers: {
// 					"Content-Type": "multipart/form-data",
// 				},
// 			}
// 		)
// 		return { success: true, imageUri: response.data.profile.imageUri }
// 	} catch (error) {
// 		return { success: false, error: (error as Error).message }
// 	}
// }

interface UploadImageResponse {
	success: boolean
	filename?: string
	error?: string
}

interface UpdateProfileResponse {
	success: boolean
	profile?: {
		firstName: string
		lastName: string
		imageUri: string
	}
	error?: string
}

interface UpdateProfileParams {
	userId: string
	firstName: string
	lastName: string
	imageUri?: string // Image URI is optional since it might not be updated
}

export const uploadImage = async (
	userId: string,
	imageUri: string
): Promise<UploadImageResponse> => {
	const formData = new FormData()
	const file = await convertUriToFile(imageUri) // Ensure this function returns a File object
	formData.append("file", file)

	try {
		const response = await fetch(`/api/v1/users/${userId}/upload`, {
			method: "POST",
			body: formData,
		})

		const result = await response.json()
		if (response.ok) {
			return { success: true, filename: result.filename }
		} else {
			return { success: false, error: result.error }
		}
	} catch (error) {
		return { success: false, error: (error as Error).message }
	}
}

export const updateProfile = async (
	params: UpdateProfileParams
): Promise<UpdateProfileResponse> => {
	const { userId, firstName, lastName, imageUri } = params

	try {
		const response = await fetch(`/api/v1/users/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstName, lastName, imageUri }),
		})

		const result = await response.json()
		if (response.ok) {
			return { success: true, profile: result.profile }
		} else {
			return { success: false, error: result.error }
		}
	} catch (error) {
		return { success: false, error: (error as Error).message }
	}
}

export const deleteUser = async (
	userId: string
): Promise<{ success: boolean; error?: string }> => {
	try {
		await axios.delete(`${API_URL}/users/${userId}`)
		return { success: true }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data?.error || error.message,
		}
	}
}
// export const uploadImage = async (
// 	userId: string,
// 	imageUri: string
// ): Promise<{ success: boolean; imageUri?: string; error?: string }> => {
// 	try {
// 		const blob = await convertUriToFile(imageUri)

// 		const formData = new FormData()
// 		formData.append("file", blob) // The third parameter is the filename

// 		const response = await axios.post(`${API_URL}/upload/${userId}`, formData, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 			},
// 		})

// 		return { success: true, imageUri: response.data.imageUri }
// 	} catch (error) {
// 		return { success: false, error: (error as Error).message }
// 	}
// }

// export const getProfileWithImage = async (
// 	userId: string
// ): Promise<ProfileWithImageResponse> => {
// 	try {
// 		const res = await fetch(`${API_URL}/users/profile/upload/${userId}`)
// 		const result = await res.json()
// 		console.log("Pfofile image result :", result)

// 		if (res.ok) {
// 			return { success: true, profile: result.profile }
// 		} else {
// 			return {
// 				success: false,
// 				error: result.error || "Failed to retrieve profile",
// 			}
// 		}
// 	} catch (error) {
// 		return { success: false, error: (error as Error).message }
// 	}
// }
