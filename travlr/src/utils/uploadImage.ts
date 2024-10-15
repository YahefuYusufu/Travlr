// src/utils/imageUpload.ts

import axios from "axios"

export async function uploadImage(imageUri: string): Promise<string> {
	try {
		const formData = new FormData()
		formData.append("image", {
			uri: imageUri,
			type: "image/jpeg", // Adjust this based on the actual image type
			name: "upload.jpg",
		} as any)

		const response = await axios.post(
			"http://192.168.0.126:5001/api/trips/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		)

		return response.data.imageUrl // Assuming your server returns the uploaded image URL
	} catch (error) {
		console.error("Error uploading image:", error)
		throw error
	}
}
