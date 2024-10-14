import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ROUTES } from "../constants/strings"
import { Trip } from "../hooks/useTrips"

export type RootStackParamList = {
	[ROUTES.WELCOME]: undefined
	[ROUTES.HOME]: undefined
	[ROUTES.DESTINATION]: Trip
	[ROUTES.NEWTRIP]: undefined
	[ROUTES.TRIPDETAILS]: { tripId: string }
	[ROUTES.ALLIMAGES]: undefined
}

// Screen props
export type WelcomeScreenProps = NativeStackScreenProps<
	RootStackParamList,
	typeof ROUTES.WELCOME
>
export type HomeScreenProps = NativeStackScreenProps<
	RootStackParamList,
	typeof ROUTES.HOME
>
export type DestinationScreenProps = NativeStackScreenProps<
	RootStackParamList,
	typeof ROUTES.DESTINATION
>
export type NewTripScreenProps = NativeStackScreenProps<
	RootStackParamList,
	typeof ROUTES.NEWTRIP
>
export type TripDetailsScreenProps = NativeStackScreenProps<
	RootStackParamList,
	typeof ROUTES.TRIPDETAILS
>

export type AllImagesScreenProps = NativeStackScreenProps<
	RootStackParamList,
	typeof ROUTES.ALLIMAGES
>

export type ImageSourceType = number | { uri: string }

export interface GalleryProps {
	trips: Trip[]
	isLoading: boolean
}

export interface SortCategoriesProps {
	trips: Trip[]
	isLoading: boolean
}

export interface DestinationProps {
	trips: Trip[]
	isLoading: boolean
	navigation: DestinationScreenProps["navigation"]
}

export type DestinationCardProps = {
	item: Trip
	navigation: DestinationScreenProps["navigation"]
}
