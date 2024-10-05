// types/navigation.ts
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
	Welcome: undefined
	Home: undefined
	Gallery: DestinationItemType
}
// Screen props
export type WelcomeScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"Welcome"
>
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">
export type DestinationScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"Gallery"
>

export type ImageSourceType = number | { uri: string }

export interface GalleryProps {
	title: string
	image: ImageSourceType
}

export type DestinationItemType = {
	title: string
	duration: string
	distance: string
	weather: string
	price: number
	shortDescription: string
	longDescription: string
	image: ImageSourceType
}

export type DestinationCardProps = {
	item: DestinationItemType
	navigation: DestinationScreenProps["navigation"]
}
