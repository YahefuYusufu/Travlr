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
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api/trips",
})

const sendTrip = async (tripData: TripDetails, id?: string): Promise<Trip> => {
	try {
		const url = id ? `/${id}` : ""
		const method = id ? "put" : "post"
		const { data } = await api[method]<{ message: string; trip: Trip }>(
			url,
			tripData
		)
		return data.trip
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "Failed to send trip")
		}
		throw new Error("An unexpected error occurred")
	}
}

export const getTrips = async (): Promise<Trip[]> => {
	try {
		const { data } = await api.get<Trip[]>("")
		return data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "Failed to fetch trips")
		}
		throw new Error("An unexpected error occurred")
	}
}
export default sendTrip
