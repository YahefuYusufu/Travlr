import express, { Express, Request, Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import tourRoutes from "./src/routes/tourRoutes"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const mongoUri: String = process.env?.MONGODB_URI as string

mongoose
	.connect(mongoUri, {
		useBigInt64: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err))

// Define routes
app.use("/api/tours", tourRoutes)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
