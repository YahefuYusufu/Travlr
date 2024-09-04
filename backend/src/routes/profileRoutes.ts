import express from "express"
import {
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	deleteUser,
} from "../controllers/profileController"
import router from "./authRoutes"

router.get("/users", getAllUsers)
router.get("/users/:userId", getUserProfile)
router.put("/users/:userId", updateUserProfile)
router.delete("/users/:userId", deleteUser)

export default router
