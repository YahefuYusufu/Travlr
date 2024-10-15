import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import tripRoutes from "./routes/trips"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/trip-app"

mongoose
	.connect(MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err))

// Routes will be added here
app.use("/api/trips", tripRoutes)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
