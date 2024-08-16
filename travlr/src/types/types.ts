export interface FormInput {
	value: string
	error: string | null
}
export interface LoginCredentials {
	email: string
	password: string
}

export type RootStackParamList = {
	Login: undefined
	Home: undefined
	Signup: undefined
}
