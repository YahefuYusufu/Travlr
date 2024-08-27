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

export interface CreateUserResponse {
	user?: {
		_id: string
		email: string
	}
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
	Profile: { userId: string }
	HomeTabs: undefined
}
export type ProfileScreenRouteParams = {
	userId: string
}

export interface LogoutButtonProps {
	handleLogout: (event: GestureResponderEvent) => void
}
