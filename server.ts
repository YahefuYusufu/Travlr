import express, { Express, Request, Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import locationRoutes from "./routes/locationRoutes"
import tourRoutes from "./routes/tourRoutes" // Add this line when you create tourRoutes

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err))

// Define routes
app.use("/api/locations", locationRoutes) // Add this line
app.use("/api/tours", tourRoutes) // Add this line when you create tourRoutes

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
