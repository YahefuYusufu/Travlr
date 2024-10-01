// nativewind.d.ts
import "react-native"

declare module "react-native" {
	interface ViewProps {
		className?: string
	}

	interface TextProps {
		className?: string
	}

	interface ScrollViewProps {
		className?: string
	}

	interface FlatListProps<T> {
		className?: string
	}

	interface SectionListProps {
		className?: string
	}

	interface SafeAreaViewProps {
		className?: string
	}

	interface ImageProps {
		className?: string
	}

	interface TextInputProps {
		className?: string
	}

	interface TouchableHighlightProps {
		className?: string
	}

	interface TouchableOpacityProps {
		className?: string
	}

	interface TouchableWithoutFeedbackProps {
		className?: string
	}

	interface ModalProps {
		className?: string
	}

	interface ActivityIndicatorProps {
		className?: string
	}

	interface ButtonProps {
		className?: string
	}

	interface SwitchProps {
		className?: string
	}

	interface StatusBarProps {
		className?: string
	}

	interface RefreshControlProps {
		className?: string
	}

	interface PressableProps {
		className?: string
	}

	interface WebViewProps {
		className?: string
	}

	// Add any other components you plan to use
}

declare module "react-native-vector-icons/Ionicons" {
	import { IconProps } from "react-native-vector-icons/Icon"
	import { FC } from "react"

	export const Ionicons: FC<IconProps>
	export default Ionicons
}

declare module "react-native-heroicons/*" {
	import React from "react"
	import { SvgProps } from "react-native-svg"

	const Icon: React.FC<SvgProps>
	export default Icon
}
