import express from "express"
import {
	createTour,
	getTours,
	getTourById,
	updateTour,
	deleteTour,
} from "../controllers/tourController"

const router = express.Router()

router.post("/", createTour)
router.get("/", getTours)
router.get("/:id", getTourById)
router.put("/:id", updateTour)
router.delete("/:id", deleteTour)

export default router
