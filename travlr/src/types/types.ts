import { GestureResponderEvent } from "react-native"

export interface FormInput {
	value: string
	error: string | null
}
export interface LoginCredentials {
	email: string
	password: string
}
export interface CreateUserResponse {
	success: boolean
	error?: string
}

export interface CreateUserParams {
	name: string
	email: string
	password: string
}

export type RootStackParamList = {
	Login: undefined
	Home: undefined
	Signup: undefined
	Favorites: undefined
	Profile: undefined
	HomeTabs: undefined
}

export interface LogoutButtonProps {
	handleLogout: (event: GestureResponderEvent) => void
}
