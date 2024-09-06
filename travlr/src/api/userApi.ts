import { API_URL } from "@env"
import { ProfileWithImageResponse, UploadImageResponse } from "../types/types"
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

export const updateUserProfile = async (
	userId: string,
	firstName: string,
	lastName: string,
	imageFile?: File
): Promise<UploadImageResponse> => {
	try {
		const formData = new FormData()
		formData.append("firstName", firstName)
		formData.append("lastName", lastName)
		if (imageFile) {
			formData.append("file", imageFile)
		}
		const response = await axios.post(
			`${API_URL}/profiles/users/${userId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		)
		return { success: true, imageUri: response.data.profile.imageUri }
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
export const uploadImage = async (
	userId: string,
	imageUri: string
): Promise<{ success: boolean; imageUri?: string; error?: string }> => {
	try {
		const blob = await convertUriToFile(imageUri)

		const formData = new FormData()
		formData.append("file", blob, "photo.jpg") // The third parameter is the filename

		const response = await axios.post(`${API_URL}/upload/${userId}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})

		return { success: true, imageUri: response.data.imageUri }
	} catch (error) {
		return { success: false, error: (error as Error).message }
	}
}

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
