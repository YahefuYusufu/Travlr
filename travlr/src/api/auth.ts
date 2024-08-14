import { useState } from "react"
import axios from "axios"

import { LoginCredentials } from "../types/types"

interface MyCustomError {
	message: string
	// Other properties as needed
}
const baseUrl = "http://127.0.0.1:8000/api/v1/users"

export const loginUser = async (credentials: LoginCredentials) => {
	try {
		const response = await axios.post(`${baseUrl}/login`, credentials)
		return response.data
	} catch (error: unknown) {
		if (error instanceof Error && "message" in error) {
			const customError = error as MyCustomError
			console.error("Error logging in user:", customError.message)
		} else {
			console.error("Unexpected error:", error)
		}
	}
}
