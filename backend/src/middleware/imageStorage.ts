import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import dotenv from "dotenv"
import path from "path"
import crypto from "crypto"
import mongoose from "mongoose"

const mongoURI = process.env.MONGODB_URI as string

dotenv.config()
const storage = new GridFsStorage({
	url: mongoURI,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req: Request, file: Express.Multer.File) => {
		return new Promise((resolve, reject) => {
			// Generate a unique filename using crypto
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err)
				}
				const filename = buf.toString("hex") + path.extname(file.originalname)
				const fileInfo = {
					filename: filename,
					bucketName: "uploads", // Name of the GridFS bucket
				}
				resolve(fileInfo)
			})
		})
	},
})

// File filtering
const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	const fileTypes = /jpeg|jpg|png/
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = fileTypes.test(file.mimetype)

	if (mimetype && extname) {
		cb(null, true)
	} else {
		cb(new Error("Error: Images Only!"))
	}
}

// Initialize Multer with GridFS storage and file filtering
const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

export default upload
