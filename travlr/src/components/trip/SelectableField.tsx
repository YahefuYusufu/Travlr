import React, { useState, useEffect, useRef } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Animated,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native"
import {
	ChevronDownIcon,
	MagnifyingGlassIcon,
	XCircleIcon,
} from "react-native-heroicons/outline"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useTheme } from "../../theme/ThemeProvider"

interface SelectableFieldProps {
	label: string
	value: string
	options: string[]
	onSelect: (value: string) => void
	containerClassName?: string
}

const SelectableField: React.FC<SelectableFieldProps> = ({
	label,
	value,
	options,
	onSelect,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [filteredOptions, setFilteredOptions] = useState(options)
	const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })
	const animatedHeight = useRef(new Animated.Value(0)).current
	const { colors } = useTheme()
	const boxWidth = wp(40) // Adjust as needed
	const boxHeight = hp(30) // Adjust as needed

	useEffect(() => {
		setFilteredOptions(
			options.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase())
			)
		)
	}, [searchTerm, options])

	useEffect(() => {
		Animated.timing(animatedHeight, {
			toValue: isOpen ? boxHeight : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()
	}, [isOpen])

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
		if (!isOpen) {
			setSearchTerm("")
		}
	}

	const closeDropdown = () => {
		setIsOpen(false)
		setSearchTerm("")
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				closeDropdown()
				Keyboard.dismiss() // Dismiss the keyboard if open
			}}>
			<View className="flex-1 mr-1 mb-3" style={{ zIndex: 1000 }}>
				<Text
					className="mb-2 text-lg font-semibold"
					style={{ color: colors.text }}>
					{label}
				</Text>
				<TouchableOpacity
					className="flex-row items-center justify-between border border-gray-400 rounded-lg p-2"
					style={{ backgroundColor: colors.bgNatural }}
					onPress={toggleDropdown}
					onLayout={(event) => {
						const { x, y, width, height } = event.nativeEvent.layout
						setLayout({ x, y, width, height })
					}}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						className="mb-1 text-base font-sans text-gray-300">
						{value || `Select ${label}`}
					</Text>
					<ChevronDownIcon size={wp(5)} color="white" />
				</TouchableOpacity>
				<Animated.View
					style={{
						position: "absolute",
						top: layout.height + 42,
						left: 12,
						width: boxWidth,
						height: animatedHeight,
						overflow: "hidden",
						zIndex: 1001, // Increased zIndex here
					}}>
					<View className="flex justify-center items-center bg-white rounded-lg shadow-lg border border-gray-400">
						{/* Search bar */}
						<View
							className="flex-row items-center justify-between mt-1 border-b border-gray-500 p-1 rounded-md space-x-5"
							style={{ backgroundColor: "gray", width: "90%", height: 40 }}>
							<View className="flex-row items-center flex-1">
								<MagnifyingGlassIcon size={wp(5)} color="white" />
								<TextInput
									className="flex-1 ml-2"
									placeholder={`Search ${label}`}
									placeholderTextColor="white"
									value={searchTerm}
									onChangeText={setSearchTerm}
									style={{ flexShrink: 1, maxWidth: "90%" }}
								/>
							</View>
							<TouchableOpacity onPress={closeDropdown} className="ml-2">
								<XCircleIcon size={wp(7)} color="white" />
							</TouchableOpacity>
						</View>

						{/* Scrollable list with fixed height */}
						<ScrollView
							style={{ maxHeight: 200 /* Adjust this value as needed */ }}>
							{filteredOptions.map((option) => (
								<TouchableOpacity
									key={option}
									className="py-2 px-3 border-b border-gray-100"
									onPress={() => {
										onSelect(option)
										closeDropdown() // Close dropdown on selection
									}}>
									<Text className="text-base text-gray-800 py-0.3 text-center">
										{option}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default SelectableField
