import express, { Request, Response, NextFunction } from "express"
import multer from "multer"
import path from "path"
import Trip, { ITrip } from "../models/Trip"
import ImageService from "../services/ImageService"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

// Define a type for our route handlers
type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>

// POST - Create a new trip
const createTrip: AsyncRequestHandler = async (req, res, next) => {
	try {
		const tripData: ITrip = req.body
		const newTrip = new Trip(tripData)
		const savedTrip = await newTrip.save()
		res.status(201).json({
			message: "Trip created successfully",
			trip: savedTrip,
		})
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(400)
				.json({ message: "Failed to create trip", error: error.message })
		} else {
			res
				.status(400)
				.json({ message: "Failed to create trip", error: "Unknown error" })
		}
	}
}

// GET - Fetch all trips
const getAllTrips: AsyncRequestHandler = async (_req, res, next) => {
	console.log("GET request received for /api/trips")
	try {
		const trips = await Trip.find().lean().exec()

		// Create a summary of trips
		const tripSummary = trips.map((trip) => ({
			id: trip._id,
			country: trip.country,
		}))

		console.log(`Trips found: ${trips.length}`)
		console.log("Trip summaries:", JSON.stringify(tripSummary, null, 2))

		res.json(trips)
	} catch (error) {
		console.error("Error fetching trips:", error)
		next(error)
	}
}

// GET - Fetch a single trip by ID
const getSingleTrip: AsyncRequestHandler = async (req, res, next) => {
	try {
		const trip = await Trip.findById(req.params.id).lean().exec()
		if (!trip) {
			res.status(404).json({ message: "Trip not found" })
			return
		}
		res.json(trip)
	} catch (error) {
		next(error)
	}
}

// PUT - Update a trip by ID
const updateTrip: AsyncRequestHandler = async (req, res, next) => {
	try {
		const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
			.lean()
			.exec()

		if (!updatedTrip) {
			res.status(404).json({ message: "Trip not found" })
			return
		}

		res.json({
			message: "Trip updated successfully",
			trip: updatedTrip,
		})
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(400)
				.json({ message: "Failed to update trip", error: error.message })
		} else {
			res
				.status(400)
				.json({ message: "Failed to update trip", error: "Unknown error" })
		}
	}
}

// DELETE - Delete a trip by ID
const deleteTrip: AsyncRequestHandler = async (req, res, next) => {
	try {
		const deletedTrip = await Trip.findByIdAndDelete(req.params.id)
			.lean()
			.exec()
		if (!deletedTrip) {
			res.status(404).json({ message: "Trip not found" })
			return
		}
		res.json({ message: "Trip deleted successfully" })
	} catch (error) {
		next(error)
	}
}

const addImageToTrip = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params

		if (!req.file) {
			res.status(400).json({ message: "No file was uploaded." })
			return
		}

		console.log("File received:", req.file.originalname, req.file.mimetype)

		// The base64 data is now in req.file.buffer
		const imageBase64 = req.file.buffer.toString("base64")

		// Find the trip and update it with the new image
		const updatedTrip = await Trip.findByIdAndUpdate(
			id,
			{
				$push: {
					images: {
						data: imageBase64,
						contentType: req.file.mimetype,
					},
				},
			},
			{ new: true, runValidators: true }
		)

		if (!updatedTrip) {
			res.status(404).json({ message: "Trip not found" })
			return
		}

		console.log("Updated trip:", updatedTrip)

		res.status(200).json({
			message: "Image added successfully",
			trip: updatedTrip,
		})
	} catch (error) {
		console.error("Error adding image to trip:", error)
		res.status(400).json({
			message: "Failed to add image",
			error: error instanceof Error ? error.message : "Unknown error",
		})
	}
}

router.post("/", createTrip)
router.get("/", getAllTrips)
router.get("/:id", getSingleTrip)
router.put("/:id", updateTrip)
router.delete("/:id", deleteTrip)
router.post("/:id/images", upload.single("image"), addImageToTrip)

export default router
