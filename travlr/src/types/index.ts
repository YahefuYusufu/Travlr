// types/navigation.ts
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
	Welcome: undefined
	Home: undefined
}

export type WelcomeScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"Welcome"
>
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">
