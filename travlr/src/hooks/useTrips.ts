import axios from "axios"

export interface TripDetails {
	country: string
	city: string
	date: Date
	category?: string
	summary?: string
	rating?: number
	images?: string[]
}

export interface Trip extends TripDetails {
	_id?: string
}

const api = axios.create({
	baseURL: process.env.TRIP_API_URL || "http://localhost:5001/api/trips",
})

export const sendTrip = async (tripData: TripDetails): Promise<Trip> => {
	try {
		console.log("Sending data to backend:", JSON.stringify(tripData, null, 2))
		const { data } = await api.post<{ message: string; trip: Trip }>(
			"",
			tripData
		)
		console.log("Response from backend:", JSON.stringify(data, null, 2))
		return data.trip
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.message)
			console.error(
				"Error response:",
				JSON.stringify(error.response?.data, null, 2)
			)
			throw new Error(error.response?.data?.message || "Failed to send trip")
		}
		console.error("Unexpected error:", error)
		throw new Error("An unexpected error occurred")
	}
}

export const getTrips = async (): Promise<Trip[]> => {
	try {
		const { data } = await api.get<Trip[]>("")
		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.message)
			console.error(
				"Error response:",
				JSON.stringify(error.response?.data, null, 2)
			)
			throw new Error(error.response?.data?.message || "Failed to fetch trips")
		}
		console.error("Unexpected error:", error)
		throw new Error("An unexpected error occurred")
	}
}
