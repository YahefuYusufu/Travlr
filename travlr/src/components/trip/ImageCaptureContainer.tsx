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
import * as ImagePicker from "expo-image-picker"
import { useTripContext } from "../../context/TripContext"

const ImageCaptureContainer: React.FC = () => {
	const { images, updateImages } = useTripContext()
	const [modalVisible, setModalVisible] = useState(false)
	const fadeAnim = useRef(new Animated.Value(0)).current

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

	const handleGalleryPick = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled && result.assets && result.assets.length > 0) {
			const newImage = result.assets[0].uri
			updateImages([...images, newImage])
		}
		closeModal()
	}

	const handleCameraCapture = async () => {
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled && result.assets && result.assets.length > 0) {
			const newImage = result.assets[0].uri
			updateImages([...images, newImage])
		}
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

				{images.map((uri, index) => (
					<Image
						key={`image-${index}`}
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
								className="bg-slate-100 rounded-xl p-6 w-4/5 max-w-sm shadow-lg">
								<Text className="text-xl font-bold mb-4 text-center">
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
