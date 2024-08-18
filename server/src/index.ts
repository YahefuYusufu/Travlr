import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./router"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(
	cors({
		credentials: true,
	})
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)
const mongoDBUri: string = process.env?.MONGODB_URL as string

const connectDB = async () => {
	try {
		mongoose.connect(mongoDBUri, {
			useBigInt64: true,
		})
		console.log("MongoDB connected: 🤑🐸🦖🐛🐍")
	} catch (error) {
		console.error("MongoDB connection error: ", error)
		process.exit(1)
	}
}

connectDB()

app.use("/", router())

server.listen(port, () => {
	console.log(`Server running on  http://localhost:${port}`)
})
