import axios from "axios"
import * as FileSystem from "expo-file-system"

export async function uploadImage(
	imageUri: string,
	tripId: string | undefined
): Promise<string> {
	if (!tripId) {
		console.error(
			"Trip ID is undefined. Cannot upload image without a valid trip ID."
		)
		throw new Error("Trip ID is required to upload an image.")
	}

	try {
		const base64 = await FileSystem.readAsStringAsync(imageUri, {
			encoding: FileSystem.EncodingType.Base64,
		})

		const fileExtension = imageUri.split(".").pop()
		let mimeType = "image/jpeg"
		if (fileExtension === "png") {
			mimeType = "image/png"
		} else if (fileExtension === "gif") {
			mimeType = "image/gif"
		}

		const formData = new FormData()
		formData.append("image", {
			uri: `data:${mimeType};base64,${base64}`,
			type: mimeType,
			name: `upload.${fileExtension}`,
		} as any)

		console.log(
			`Uploading image to: http://192.168.0.126:8001/api/trips/${tripId}/images`
		)

		const response = await axios.post(
			`http://192.168.0.126:8001/api/trips/${tripId}/images`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		)

		console.log("Upload response:", response.data)

		if (
			response.data.trip &&
			response.data.trip.images &&
			response.data.trip.images.length > 0
		) {
			const newImage =
				response.data.trip.images[response.data.trip.images.length - 1]
			return newImage._id || newImage
		} else {
			throw new Error("No image data returned from server")
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.response?.data || error.message)
		} else {
			console.error("Error uploading image:", error)
		}
		throw error
	}
}
