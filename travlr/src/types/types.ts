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
	_id: string
	email: string
	name: string
	// Add other user fields as needed
}
export interface ApiResponse {
	success: boolean
	user?: User
	error?: string
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
