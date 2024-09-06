import { API_URL } from "@env"
import { ProfileWithImageResponse, UploadImageResponse } from "../types/types"
import axios from "axios"

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
): Promise<UploadImageResponse> => {
	try {
		const uriParts = imageUri.split(".")
		const fileType = uriParts[uriParts.length - 1]

		// Determine MIME type dynamically based on the file extension
		let mimeType = "image/jpeg" // Default type
		if (fileType === "png") {
			mimeType = "image/png"
		} else if (fileType === "jpg" || fileType === "jpeg") {
			mimeType = "image/jpeg"
		}

		// Create FormData and append the file
		const formData = new FormData()
		formData.append("file", {
			uri: imageUri,
			type: mimeType, // Dynamically assigned MIME type
			name: `photo.${fileType}`, // Append file extension dynamically
		} as any) // Cast to `any` to avoid type issues

		// Send the POST request
		const response = await fetch(`${API_URL}/upload/${userId}`, {
			method: "POST",
			body: formData,
			// No need to set Content-Type for FormData, it is set automatically by fetch
		})

		const result = await response.json()
		console.log("user API result:", result)

		if (response.ok) {
			return { success: true, imageUri: result.profile.imageUri }
		} else {
			return {
				success: false,
				error: result.error || "Failed to upload image",
			}
		}
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
