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
	const office = "192.168.0.126" // Replace with your actual local IP
	const home = "172.24.11.200" // Replace with your actual local IP
	const prgPhone = "172.20.10.7" // Replace with your actual local IP
	const port = "8001"

	if (__DEV__) {
		// For development
		if (Platform.OS === "android") {
			// Android emulator
			return `http://10.0.2.2:${port}/api/trips`
		} else if (Platform.OS === "ios") {
			// iOS
			return `http://${prgPhone}:${port}/api/trips`
		}
	}

	// For production or fallback
	return "http://localhost:8001/api/trips"
}
const api = axios.create({
	baseURL: getApiUrl(),
	timeout: 30000,
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

const MAX_RETRIES = 3
const RETRY_DELAY = 2000 // 2 seconds

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const sendTrip = async (tripData: TripDetails): Promise<Trip> => {
	let retries = 0
	while (retries < MAX_RETRIES) {
		try {
			console.log(`Attempt ${retries + 1} to send trip data`)
			console.log("Sending data to backend:", JSON.stringify(tripData, null, 2))
			const { data } = await api.post<{ message: string; trip: Trip }>(
				"",
				tripData,
				{
					timeout: 30000, // 30 seconds timeout
				}
			)
			console.log("Response from backend:", JSON.stringify(data, null, 2))
			return data.trip
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(
					`Attempt ${retries + 1} failed. Axios error:`,
					error.message
				)
				if (
					error.code === "ECONNABORTED" ||
					error.message.includes("timeout")
				) {
					if (retries < MAX_RETRIES - 1) {
						console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`)
						retries++
						await wait(RETRY_DELAY)
					} else {
						throw new Error(
							`Failed to send trip after ${MAX_RETRIES} attempts: ${error.message}`
						)
					}
				} else {
					console.error("Error response:", error.response?.data)
					throw new Error(
						error.response?.data?.message || "Failed to send trip"
					)
				}
			} else {
				console.error("Unexpected error:", error)
				throw new Error("An unexpected error occurred")
			}
		}
	}
	throw new Error(`Failed to send trip after ${MAX_RETRIES} attempts`)
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

export const filterTripsByCategory = (
	trips: Trip[],
	category: string
): Trip[] => {
	if (category === "All") {
		return trips
	}
	return trips.filter((trip) => trip.category === category)
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

export const deleteTrip = async (id: string): Promise<void> => {
	try {
		console.log(`Deleting trip with id: ${id}`)
		await api.delete(`/${id}`)
		console.log(`Trip with id ${id} deleted successfully`)
	} catch (error) {
		return handleAxiosError(error, `Failed to delete trip with id ${id}`)
	}
}
