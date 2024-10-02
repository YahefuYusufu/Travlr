// types/navigation.ts
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
	Welcome: undefined
	Home: undefined
	Destination: undefined
}

export type WelcomeScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"Welcome"
>
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">

export type DestinationScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"Destination"
>
