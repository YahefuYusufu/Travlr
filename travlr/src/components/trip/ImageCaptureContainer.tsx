import React, { useState, useRef, useEffect } from "react"
import {
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	Image,
	Modal,
	TouchableWithoutFeedback,
	Animated,
} from "react-native"
import { BlurView } from "expo-blur"
import { Entypo } from "@expo/vector-icons"

interface ImageCaptureButtonsProps {
	onGalleryPick: () => void
	onCameraCapture: () => void
	images: string[] // Array of image URIs
}

const ImageCaptureContainer: React.FC<ImageCaptureButtonsProps> = ({
	onGalleryPick,
	onCameraCapture,
	images,
}) => {
	const [modalVisible, setModalVisible] = useState(false)
	const fadeAnim = useRef(new Animated.Value(0)).current

	// Dummy images
	const dummyImages = [
		"https://via.placeholder.com/150/FF5733/FFFFFF?text=1",
		"https://via.placeholder.com/150/33FF57/000000?text=2",
		"https://via.placeholder.com/150/5733FF/FFFFFF?text=3",
		"https://via.placeholder.com/150/FFFF33/000000?text=4",
		"https://via.placeholder.com/150/FFFF33/000000?text=5",
	]

	useEffect(() => {
		if (modalVisible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start()
		}
	}, [modalVisible])

	const toggleModal = () => {
		if (modalVisible) {
			closeModal()
		} else {
			setModalVisible(true)
		}
	}

	const closeModal = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setModalVisible(false)
		})
	}

	const handleGalleryPick = () => {
		onGalleryPick()
		closeModal()
	}

	const handleCameraCapture = () => {
		onCameraCapture()
		closeModal()
	}

	return (
		<View className="bg-gray-200 rounded-xl mt-2 p-2">
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ alignItems: "center" }}
				className="flex-row">
				<TouchableOpacity
					onPress={toggleModal}
					className="w-20 h-20 bg-gray-300 rounded-lg mr-2 items-center justify-center">
					<Entypo name="plus" size={24} color="black" />
				</TouchableOpacity>

				{images.length > 0
					? images.map((uri, index) => (
							<Image
								key={`actual-${index}`}
								source={{ uri }}
								className="w-20 h-20 rounded-lg mr-2"
							/>
					  ))
					: dummyImages.map((uri, index) => (
							<Image
								key={`dummy-${index}`}
								source={{ uri }}
								className="w-20 h-20 rounded-lg mr-2"
							/>
					  ))}
			</ScrollView>

			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}>
				<TouchableWithoutFeedback onPress={closeModal}>
					<BlurView
						intensity={10}
						tint="light"
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<TouchableWithoutFeedback>
							<Animated.View
								style={{ opacity: fadeAnim }}
								className="bg-slate-700 rounded-xl p-6 w-4/5 max-w-sm shadow-lg">
								<Text className="text-xl font-bold mb-4 text-center text-white">
									Choose an option
								</Text>
								<View className="flex-row justify-between mb-4">
									<TouchableOpacity
										onPress={handleGalleryPick}
										className="bg-blue-500 px-4 py-3 rounded-lg flex-1 mr-2">
										<Text className="text-white text-center text-base">
											Gallery
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={handleCameraCapture}
										className="bg-green-500 px-4 py-3 rounded-lg flex-1 ml-2">
										<Text className="text-white text-center text-base">
											Camera
										</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									onPress={closeModal}
									className="bg-gray-300 px-4 py-3 rounded-lg">
									<Text className="text-gray-700 text-center text-lg">
										Cancel
									</Text>
								</TouchableOpacity>
							</Animated.View>
						</TouchableWithoutFeedback>
					</BlurView>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	)
}

export default ImageCaptureContainer
