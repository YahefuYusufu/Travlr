import express, { Express } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./src/routes/authRoutes"
import profileRoutes from "./src/routes/profileRoutes"
import tourRoutes from "./src/routes/tourRoutes"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const mongoUri: string = process.env?.MONGODB_URI as string

const connectDB = async () => {
	try {
		mongoose.connect(mongoUri, {
			useBigInt64: true,
		})
		console.log("MongoDB connected")
	} catch (error) {
		console.error("MongoDB   connection error:", error)
		process.exit(1)
	}
}
connectDB()

// Define routes
app.use("/api/v1/users", authRoutes)
app.use("/api/v1", profileRoutes)

app.use("/api/v1/tours", tourRoutes)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
