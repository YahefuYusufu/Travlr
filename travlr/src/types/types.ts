import { GestureResponderEvent } from "react-native"

export interface FormInput {
	value: string
	error: string | null
}
export interface LoginCredentials {
	email: string
	password: string
}

export interface ProfileDataProps {
	firstName: string
	lastName: string
	picture: string
}

export interface CreateUserParams {
	name: string
	email: string
	password: string
}

export interface User {
	_id: string // or userId depending on your API
	email: string
	// Add other user fields as needed
}
export interface ApiResponse {
	success: boolean
	user?: User // Optional if user data is returned
	error?: string // Optional if there is an error
}

export type RootStackParamList = {
	Login: undefined
	Home: undefined
	Signup: undefined
	Favorites: undefined
	Profile: undefined
	Tabs: { userId: string }
}
export type ProfileScreenRouteParams = {
	userId: string
}

export interface LogoutButtonProps {
	handleLogout: (event: GestureResponderEvent) => void
}
