import express from "express"
import {
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	deleteUser,
} from "../controllers/profileController"
// import router from "./authRoutes"
import uploadSingleImage from "../middleware/uploadImage"

const router = express.Router()
router.get("/users", getAllUsers)
router.get("/users/:userId", getUserProfile)
router.post("/users/:userId", uploadSingleImage, updateUserProfile)
router.delete("/users/:userId", deleteUser)

export default router
