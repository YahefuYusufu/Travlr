import { API_URL } from "@env"
import { ProfileWithImageResponse, UploadImageResponse } from "../types/types"

export const uploadImage = async (
	userId: string,
	imageUri: string
): Promise<UploadImageResponse> => {
	try {
		const uriParts = imageUri.split(".")
		const fileType = uriParts[uriParts.length - 1]

		const formData = new FormData()
		formData.append("file", {
			uri: imageUri,
			name: `photo.${fileType}`,
			type: `image/${fileType}`,
		})

		const response = await fetch(`${API_URL}/users/profile/upload/${userId}`, {
			method: "POST",
			body: formData,
		})

		const result = await response.json()
		console.log("user APi result :", result)

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

export const getProfileWithImage = async (
	userId: string
): Promise<ProfileWithImageResponse> => {
	try {
		const res = await fetch(`${API_URL}/users/profile/upload/${userId}`)
		const result = await res.json()
		console.log("Pfofile image result :", result)

		if (res.ok) {
			return { success: true, profile: result.profile }
		} else {
			return {
				success: false,
				error: result.error || "Failed to retrieve profile",
			}
		}
	} catch (error) {
		return { success: false, error: (error as Error).message }
	}
}
