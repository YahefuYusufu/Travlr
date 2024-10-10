import React from "react"
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native"

interface ImageCaptureButtonsProps {
	onGalleryPick: () => void
	onCameraCapture: () => void
	images: string[] // Array of image URIs
}

const ImageCaptureButtons: React.FC<ImageCaptureButtonsProps> = ({
	onGalleryPick,
	onCameraCapture,
	images,
}) => {
	return (
		<View className="bg-white">
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				className="mb-4">
				{images.map((uri, index) => (
					<Image
						key={index}
						source={{ uri }}
						className="w-20 h-20 mr-2 rounded"
					/>
				))}
			</ScrollView>
			<View className="flex-row justify-around mt-2 mb-4">
				<TouchableOpacity
					onPress={onGalleryPick}
					className="bg-blue-500 px-4 py-2 rounded-md">
					<Text className="text-white font-semibold">Gallery</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onCameraCapture}
					className="bg-green-500 px-4 py-2 rounded-md">
					<Text className="text-white font-semibold">Camera</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ImageCaptureButtons
