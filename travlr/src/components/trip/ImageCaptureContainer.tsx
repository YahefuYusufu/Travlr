import React, { useState, useRef, useEffect } from "react"
import {
	View,
	ScrollView,
	Image,
	Modal,
	TouchableWithoutFeedback,
	Animated,
	Text,
	TouchableOpacity,
} from "react-native"
import { BlurView } from "expo-blur"
import { Entypo } from "@expo/vector-icons"
import { useTripContext } from "../../context/TripContext"
import ImagePicker from "../gallary/ImagePicker"

const ImageCaptureContainer: React.FC = () => {
	const { tripDetails, updateImages } = useTripContext()
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

	const handleImagePick = (imageUri: string) => {
		// Update images in context
		updateImages([...tripDetails.images, imageUri])
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

				{tripDetails.images.map((uri, index) => (
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
								<ImagePicker onTakeImage={handleImagePick} />
								<TouchableOpacity
									onPress={closeModal}
									className="bg-gray-300 px-4 py-3 rounded-lg mt-4">
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
