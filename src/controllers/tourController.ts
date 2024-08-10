import { Request, Response } from "express"
import Tour from "../models/tour"

export const createTour = async (req: Request, res: Response) => {
	try {
		const tour = new Tour(req.body)
		const savedTour = await tour.save()
		res.status(201).json(savedTour)
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
	}
}

export const getTours = async (_req: Request, res: Response) => {
	try {
		const tours = await Tour.find()
		res.json(tours)
	} catch (error) {
		const err = error as Error
		res.status(500).json({ error: err.message })
	}
}

export const getTourById = async (req: Request, res: Response) => {
	try {
		const tour = await Tour.findById(req.params.id)
		if (!tour) {
			return res.status(404).json({ error: "Tour not found" })
		}
		res.json(tour)
	} catch (error) {
		const err = error as Error
		res.status(500).json({ error: err.message })
	}
	return undefined
}

export const updateTour = async (req: Request, res: Response) => {
	try {
		const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		if (!updatedTour) {
			return res.status(404).json({
				error: "Tour not found",
			})
		}
		res.json(updatedTour)
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
	}
	return undefined
}

export const deleteTour = async (req: Request, res: Response) => {
	try {
		await Tour.findByIdAndDelete(req.params.id)
		res.json({ message: "Tour deleted" })
	} catch (error) {
		const err = error as Error
		res.status(500).json({ error: err.message })
	}
}
