import { GestureResponderEvent } from "react-native"
export type RootStackParamList = {
	Login: undefined
	Home: undefined
	Signup: undefined
	Favorites: undefined
	Profile: { userId: string }
	Tabs: { userId: string }
}
export type ProfileScreenRouteParams = {
	userId: string
}
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
	imageUri?: string
}
export interface UserContextProps {
	userId: string | null
	userData: UserProfile | null
	setUserId: (id: string | null) => void
	setUserData: (data: UserProfile | null) => void
}
export interface ApiResponse<T> {
	success: boolean
	user?: T
	error?: string
}

export interface UploadImageResponse {
	success: boolean
	imageUri?: string
	error?: string
}
export interface ProfileWithImageResponse {
	success: boolean
	profile?: UserProfile // Use UserProfile here
	error?: string
}

export interface LogoutButtonProps {
	handleLogout: (event: GestureResponderEvent) => void
}
