// File: src/routes/trips.ts
import express, { Request, Response } from "express"
import Trip, { ITrip } from "../models/Trip"

const router = express.Router()

// POST - Create a new trip
router.post("/", async (req: Request, res: Response) => {
	try {
		const newTrip: ITrip = new Trip(req.body)
		const savedTrip = await newTrip.save()
		res.status(201).json(savedTrip)
	} catch (error) {
		res.status(400).json({ message: (error as Error).message })
	}
})

// GET - Fetch all trips
router.get("/", async (_req: Request, res: Response) => {
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
		res.status(500).json({ message: (error as Error).message })
	}
})

export default router
