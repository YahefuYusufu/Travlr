import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import dotenv from "dotenv"
import path from "path"
import crypto from "crypto"

dotenv.config()
const mongoURI = process.env.MONGODB_URI

if (!mongoURI) {
	throw new Error("MongoDB URI is not defined in environment variables")
}

const storage = new GridFsStorage({
	url: mongoURI,
	file: (req: Request, file: Express.Multer.File) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err)
				}
				const fileInfo = {
					filename: `${Date.now()}-${file.originalname}`,
					bucketName: "uploads",
				}
				resolve(fileInfo)
			})
		})
	},
})

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	const allowedTypes = /jpeg|jpg|png/
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	)
	const mimetype = allowedTypes.test(file.mimetype)

	if (mimetype && extname) {
		cb(null, true)
	} else {
		cb(new Error("Only JPEG, JPG, and PNG image files are allowed!"))
	}
}

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})

export default upload
