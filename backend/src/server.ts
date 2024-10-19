import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import tripRoutes from "./routes/trips"
import fs from "fs"

dotenv.config()

const app = express()

app.use(
	cors({
		origin: ["http://localhost:3000", "http://172.20.10.7"],
	})
)
app.use(express.json())

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/trip-app"

const uploadsDir = path.join(__dirname, "../uploads")
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true })
}
mongoose
	.connect(MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err))

app.use("/api/trips", tripRoutes)
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
