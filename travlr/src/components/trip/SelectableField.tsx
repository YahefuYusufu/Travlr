import React, { useState, useEffect, useRef } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Animated,
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

interface SelectableFieldProps {
	label: string
	value: string
	options: string[]
	onSelect: (value: string) => void
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

	const boxWidth = wp(45) // Adjust as needed
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
		<View className="flex-1 mr-2">
			<Text className="mb-1">{label}</Text>
			<TouchableOpacity
				className="flex-row items-center justify-between border border-gray-300 rounded p-2"
				onPress={toggleDropdown}
				onLayout={(event) => {
					const { x, y, width, height } = event.nativeEvent.layout
					setLayout({ x, y, width, height })
				}}>
				<Text numberOfLines={1} ellipsizeMode="tail">
					{value || `Select ${label}`}
				</Text>
				<ChevronDownIcon size={wp(5)} color="black" />
			</TouchableOpacity>
			<Animated.View
				style={{
					position: "absolute",
					top: layout.height + 22,
					left: 0,
					width: boxWidth,
					height: animatedHeight,
					overflow: "hidden",
					zIndex: 1000,
				}}>
				<View className="bg-white rounded-lg shadow-lg border border-gray-200">
					<View className="flex-row items-center justify-between border-b border-gray-200 p-2">
						<View className="flex-row items-center flex-1">
							<MagnifyingGlassIcon size={wp(5)} color="gray" />
							<TextInput
								className="flex-1 ml-2"
								placeholder={`Search ${label}`}
								value={searchTerm}
								onChangeText={setSearchTerm}
							/>
						</View>
						<TouchableOpacity onPress={closeDropdown} className="ml-2">
							<XCircleIcon size={wp(7)} color="green" />
						</TouchableOpacity>
					</View>
					<ScrollView>
						{filteredOptions.map((option) => (
							<TouchableOpacity
								key={option}
								className="py-2 px-3 border-b border-gray-100"
								onPress={() => {
									onSelect(option)
									closeDropdown()
								}}>
								<Text>{option}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</Animated.View>
		</View>
	)
}

export default SelectableField
