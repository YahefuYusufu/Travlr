import React, { useState, useRef } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Modal,
	Dimensions,
} from "react-native"
import { ChevronDown, Check } from "lucide-react-native"

interface CategoryItem {
	label: string
	value: string
}

interface CategoryDropdownProps {
	items: CategoryItem[]
	placeholder?: string
	value: string
	onValueChange: (value: string) => void
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
	items,
	placeholder = "Select an option",
	value,
	onValueChange,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownLayout, setDropdownLayout] = useState({ top: 0, right: 0 })
	const DropdownButton = useRef<TouchableOpacity>(null)
	const { width: SCREEN_WIDTH } = Dimensions.get("window")

	const selectedItem = items.find((item) => item.value === value)

	const toggleDropdown = (): void => {
		isOpen ? setIsOpen(false) : openDropdown()
	}

	const openDropdown = (): void => {
		DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownLayout({
				top: py + h,
				right: SCREEN_WIDTH - (_px + _w),
			})
		})
		setIsOpen(true)
	}

	const renderItem = ({ item }: { item: CategoryItem }) => (
		<TouchableOpacity
			onPress={() => {
				onValueChange(item.value)
				setIsOpen(false)
			}}
			className="p-3 border-b border-gray-200">
			<View className="flex-row justify-between items-center">
				<Text>{item.label}</Text>
				{item.value === value && <Check size={16} color="#000" />}
			</View>
		</TouchableOpacity>
	)

	return (
		<View>
			<TouchableOpacity
				ref={DropdownButton}
				onPress={toggleDropdown}
				className="flex-row justify-between items-center bg-white border border-gray-300 rounded-md p-2"
				style={{ width: 120, height: 40 }}>
				<Text numberOfLines={1} className="flex-1">
					{selectedItem ? selectedItem.label : placeholder}
				</Text>
				<ChevronDown size={20} color="#000" />
			</TouchableOpacity>

			<Modal
				visible={isOpen}
				transparent
				animationType="none"
				onRequestClose={() => setIsOpen(false)}>
				<TouchableOpacity
					style={{ flex: 1 }}
					activeOpacity={1}
					onPress={() => setIsOpen(false)}>
					<View
						style={{
							position: "absolute",
							top: dropdownLayout.top,
							right: dropdownLayout.right,
							width: 120,
							backgroundColor: "white",
							borderRadius: 4,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}>
						<FlatList
							data={items}
							renderItem={renderItem}
							keyExtractor={(item: CategoryItem) => item.value}
							style={{ maxHeight: 200 }}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	)
}

export default CategoryDropdown
