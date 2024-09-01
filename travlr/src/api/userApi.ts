import { API_URL } from "@env"
import { UploadImageResponse } from "../types/types"

export const uploadImage = async (
	userId: string,
	imageUri: string
): Promise<UploadImageResponse> => {
	try {
		const uriParts = imageUri.split(".")
		const fileType = uriParts[uriParts.length - 1]

		const formData = new FormData()
		formData.append("photo", {
			uri: imageUri,
			name: `photo.${fileType}`,
			type: `image/${fileType}`, // Ensure this matches the actual file type
		})

		const response = await fetch(`${API_URL}/users/uploadImage/${userId}`, {
			method: "POST",
			body: formData,
			// Remove Content-Type header; fetch will set it correctly
		})

		const result = await response.json()
		console.log("user APi result :", result)

		if (response.ok) {
			return { success: true, imageUri: result.profile.imageUri } // Access imageUri from profile
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
