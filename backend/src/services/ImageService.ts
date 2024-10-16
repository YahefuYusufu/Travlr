// src/services/imageService.ts

import Trip from "../models/Trip"
import { uploadToCloudStorage } from "../utils/cloudStorageService"

class ImageService {
	async uploadAndSaveImage(
		tripId: string,
		file: Express.Multer.File
	): Promise<string> {
		// Upload to cloud storage
		const remoteUri = await uploadToCloudStorage(file)

		// Save the remote URI to MongoDB
		await this.saveImageUrlToMongoDB(tripId, remoteUri)

		return remoteUri
	}

	private async saveImageUrlToMongoDB(
		tripId: string,
		imageUrl: string
	): Promise<void> {
		const trip = await Trip.findById(tripId)
		if (!trip) {
			throw new Error("Trip not found")
		}

		trip.images = trip.images || []
		trip.images.push(imageUrl)
		await trip.save()
	}
}

export default new ImageService()
