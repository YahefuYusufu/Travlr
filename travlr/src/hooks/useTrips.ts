import axios from "axios"
import { Platform } from "react-native"

export interface TripDetails {
	country: string
	city: string
	date: Date
	category?: string
	summary?: string
	rating?: number
	images?: Array<string | { data: string; contentType: string }>
}

export interface Trip extends TripDetails {
	_id: string
}

const getApiUrl = () => {
	// Use your computer's local IP address here
	const localIpAddress = "192.168.0.126" // Replace with your actual local IP
	const port = "5001"

	if (__DEV__) {
		// For development
		if (Platform.OS === "android") {
			// Android emulator
			return `http://10.0.2.2:${port}/api/trips`
		} else if (Platform.OS === "ios") {
			// iOS
			return `http://${localIpAddress}:${port}/api/trips`
		}
	}

	// For production or fallback
	return "http://localhost:5001/api/trips"
}
const api = axios.create({
	baseURL: getApiUrl(),
})

const handleAxiosError = (error: unknown, defaultMessage: string): never => {
	if (axios.isAxiosError(error)) {
		// console.error("Axios error:", error.message)
		// console.error(
		// 	"Error response:",
		// 	JSON.stringify(error.response?.data, null, 2)
		// )
		throw new Error(error.response?.data?.message || defaultMessage)
	}
	// console.error("Unexpected error:", error)
	throw new Error("An unexpected error occurred")
}

export const sendTrip = async (tripData: TripDetails): Promise<Trip> => {
	try {
		// console.log("Sending data to backend:", JSON.stringify(tripData, null, 2))
		const { data } = await api.post<{ message: string; trip: Trip }>(
			"",
			tripData
		)
		// console.log("Response from backend:", JSON.stringify(data, null, 2))
		return data.trip
	} catch (error) {
		return handleAxiosError(error, "Failed to send trip")
	}
}

export const getTrips = async (): Promise<Trip[]> => {
	try {
		console.log("Fetching all trips from:", api.defaults.baseURL)

		// console.log("Fetching all trips")
		const { data } = await api.get<Trip[]>("")
		// console.log("Fetched trips:", JSON.stringify(data, null, 2))
		return data
	} catch (error) {
		return handleAxiosError(error, "Failed to fetch trips")
	}
}

export const getTripById = async (id: string): Promise<Trip> => {
	try {
		// Log the trip ID being fetched
		console.log(`Fetching trip with id: ${id}`)
		// console.log(`Fetching trip with id: ${id}`)
		const { data } = await api.get<Trip>(`/${id}`)
		// console.log("Fetched trip:", JSON.stringify(data, null, 2))
		return data
	} catch (error) {
		return handleAxiosError(error, `Failed to fetch trip with id ${id}`)
	}
}
