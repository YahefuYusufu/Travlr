import express from "express"
import {
	registerUser,
	loginUser,
	createUserProfile,
	getUserProfileById,
	getAllUsers,
	updateUserProfile,
} from "../controllers/authController"
import { authenticateToken } from "../middleware/authMiddleware"
import { Request, Response } from "express"
const router = express.Router()

//Protected route
router.get(
	"/protected-route",
	authenticateToken,
	(req: Request, res: Response) => {
		// Access authenticated user data through req.user
		res.json({ message: "Protected route accessed", user: req.user })
	}
)

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", getAllUsers)
router.post("/:userId/profile", createUserProfile)
router.get("/:userId/profile", getUserProfileById)
router.put("/:userId/profile", updateUserProfile)

export default router
