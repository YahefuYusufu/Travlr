import React, { createContext, useState, useContext, ReactNode } from "react"

interface TripDetails {
	country: string
	city: string
	date: Date
	category: string
	summary: string
	rating: number
}

interface TripContextType {
	tripDetails: TripDetails
	images: string[]
	updateCountry: (country: string) => void
	updateCity: (city: string) => void
	updateDate: (date: Date) => void
	updateCategory: (category: string) => void
	updateSummary: (summary: string) => void
	updateRating: (rating: number) => void
	updateImages: (newImages: string[]) => void
	resetTripContext: () => void
}

const TripContext = createContext<TripContextType | undefined>(undefined)

export const TripProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [tripDetails, setTripDetails] = useState<TripDetails>({
		country: "",
		city: "",
		date: new Date(),
		category: "",
		summary: "",
		rating: 0,
	})
	const [images, setImages] = useState<string[]>([])

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
	const updateImages = (newImages: string[]) => setImages(newImages)

	const resetTripContext = () => {
		setTripDetails({
			country: "",
			city: "",
			date: new Date(),
			category: "",
			summary: "",
			rating: 0,
		})
		setImages([])
	}

	return (
		<TripContext.Provider
			value={{
				tripDetails,
				images,
				updateCountry,
				updateCity,
				updateDate,
				updateCategory,
				updateSummary,
				updateRating,
				updateImages,
				resetTripContext,
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
