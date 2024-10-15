import axios from "axios"
import { Platform } from "react-native"

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
	_id: string
}

const getApiUrl = () => {
	if (Platform.OS === "android") {
		return "http://10.0.2.2:5001/api/trips" // Android emulator uses 10.0.2.2 to access host machine
	} else if (Platform.OS === "ios") {
		return "http://localhost:5001/api/trips" // iOS simulator uses localhost
	} else {
		return "http://192.168.0.126:5001/api/trips" // Use your local IP for physical devices
	}
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
