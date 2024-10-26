// context/TripContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react"
import { sortTripsByDate } from "../hooks/useTrips"

export interface TripDetails {
	country: string
	city: string
	date: Date
	category: string
	summary: string
	rating: number
	images: string[]
}

export interface Trip extends TripDetails {
	_id: string
	createdAt: string | Date
}

interface TripContextType {
	// Trip Details Management
	tripDetails: TripDetails
	updateCountry: (country: string) => void
	updateCity: (city: string) => void
	updateDate: (date: Date) => void
	updateCategory: (category: string) => void
	updateSummary: (summary: string) => void
	updateRating: (rating: number) => void
	updateImages: (newImages: string[]) => void
	resetTripContext: () => void

	// Trips List Management
	trips: Trip[]
	setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
	addNewTrip: (trip: Trip) => void
}

const TripContext = createContext<TripContextType | undefined>(undefined)

export const TripProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Trip Details State
	const [tripDetails, setTripDetails] = useState<TripDetails>({
		country: "",
		city: "",
		date: new Date(),
		category: "",
		summary: "",
		rating: 0,
		images: [],
	})

	// Trips List State
	const [trips, setTrips] = useState<Trip[]>([])

	// Trip Details Methods
	const updateCountry = (country: string) =>
		setTripDetails((prev) => ({ ...prev, country }))
	const updateCity = (city: string) =>
		setTripDetails((prev) => ({ ...prev, city }))
	const updateDate = (date: Date) =>
		setTripDetails((prev) => ({ ...prev, date }))
	const updateCategory = (category: string) =>
		setTripDetails((prev) => ({ ...prev, category }))
	const updateSummary = (summary: string) =>
		setTripDetails((prev) => ({ ...prev, summary }))
	const updateRating = (rating: number) =>
		setTripDetails((prev) => ({ ...prev, rating }))
	const updateImages = (newImages: string[]) =>
		setTripDetails((prev) => ({ ...prev, images: newImages }))

	const resetTripContext = () => {
		setTripDetails({
			country: "",
			city: "",
			date: new Date(),
			category: "",
			summary: "",
			rating: 0,
			images: [],
		})
	}

	// Trips List Methods
	const addNewTrip = (trip: Trip) => {
		setTrips((currentTrips: Trip[]) => {
			const newTrips = [trip, ...currentTrips]
			return sortTripsByDate(newTrips) as Trip[]
		})
	}

	return (
		<TripContext.Provider
			value={{
				tripDetails,
				updateCountry,
				updateCity,
				updateDate,
				updateCategory,
				updateSummary,
				updateRating,
				updateImages,
				resetTripContext,
				trips,
				setTrips,
				addNewTrip,
			}}>
			{children}
		</TripContext.Provider>
	)
}

export const useTripContext = () => {
	const context = useContext(TripContext)
	if (context === undefined) {
		throw new Error("useTripContext must be used within a TripProvider")
	}
	return context
}
