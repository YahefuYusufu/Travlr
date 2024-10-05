import { useState, useEffect } from "react"

// Import the JSON file
import locationData from "../data/countries-cities.json"

export type LocationData = {
	countries: string[]
	cities: {
		[key: string]: string[]
	}
}

const useLocationData = () => {
	const [data, setData] = useState<LocationData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				// Simulate an asynchronous operation
				await new Promise((resolve) => setTimeout(resolve, 500))

				setData(locationData as LocationData)
				setLoading(false)
			} catch (e) {
				setError(
					e instanceof Error ? e : new Error("An unknown error occurred")
				)
				setLoading(false)
			}
		}

		loadData()
	}, [])

	return { data, loading, error }
}

export default useLocationData
