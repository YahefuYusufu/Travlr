import React, { useState } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Pressable,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type LogoutButtonProps = {
	handleLogout: () => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
	const [modalVisible, setModalVisible] = useState(false)

	const openModal = () => setModalVisible(true)
	const closeModal = () => setModalVisible(false)

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={openModal}>
				<MaterialCommunityIcons name="logout" size={24} color="#fff" />
			</TouchableOpacity>

			<Modal
				transparent={true}
				animationType="fade"
				visible={modalVisible}
				onRequestClose={closeModal}>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>
							Are you sure you want to logout?
						</Text>

						<View style={styles.buttonContainer}>
							<Pressable
								onPress={closeModal}
								style={[styles.modalButton, styles.cancelButton]}>
								<Text style={styles.cancelText}>Cancel</Text>
							</Pressable>

							<Pressable
								onPress={() => {
									closeModal()
									handleLogout()
								}}
								style={[styles.modalButton, styles.logoutButton]}>
								<Text style={styles.logoutText}>Logout</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default LogoutButton

const styles = StyleSheet.create({
	container: {},
	button: {
		backgroundColor: "#333",
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
	},
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Blurred background
	},
	modalContainer: {
		width: 300,
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	modalButton: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		alignItems: "center",
		marginHorizontal: 5,
	},
	cancelButton: {
		backgroundColor: "gray",
	},
	logoutButton: {
		backgroundColor: "#333",
	},
	cancelText: {
		color: "#fff",
		fontSize: 16,
	},
	logoutText: {
		color: "#fff",
		fontSize: 16,
	},
})
