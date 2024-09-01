import { GestureResponderEvent } from "react-native"

export interface FormInput {
	value: string
	error: string | null
}
export interface LoginCredentials {
	email: string
	password: string
}

export interface CreateUserParams {
	firstName: string
	lastName: string
	email: string
	password: string
}

export interface UserProfile {
	_id: string
	email: string
	firstName: string
	lastName: string
	picture?: string
}
// Response from API functions
export interface ApiResponse<T> {
	success: boolean
	user?: T // Data can be of any type depending on the API call
	error?: string // Error message
}

export type RootStackParamList = {
	Login: undefined
	Home: { userId: string }
	Signup: undefined
	Favorites: undefined
	Profile: { userId: string }
	Tabs: { userId: string }
}
export type ProfileScreenRouteParams = {
	userId: string
}

export interface LogoutButtonProps {
	handleLogout: (event: GestureResponderEvent) => void
}
