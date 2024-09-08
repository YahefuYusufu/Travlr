import { Request, Response, NextFunction } from "express"
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
					return reject(err) // Handle error
				}
				const fileInfo = {
					filename: `${Date.now()}-${file.originalname}`,
					bucketName: "uploads", // Ensure this bucket exists in MongoDB GridFS
				}
				console.log("Generated file info:", fileInfo) // Debugging line

				resolve(fileInfo)
			})
		})
	},
})

// Filter for allowed file types (JPEG, PNG)
const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	const allowedTypes = /jpeg|jpg|png/
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	)
	const mimeType = allowedTypes.test(file.mimetype)

	if (mimeType && extname) {
		cb(null, true)
	} else {
		cb(new Error("Only JPEG, JPG, and PNG image files are allowed!"))
	}
}

const uploadImage = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
})

// Updated uploadSingleImage function
const uploadSingleImage = (req: Request, res: Response, next: NextFunction) => {
	uploadImage.single("file")(req, res, (err: any) => {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.error("Multer error:", err)
			return res
				.status(400)
				.json({ error: "File upload failed.", details: err.message })
		} else if (err) {
			// An unknown error occurred when uploading.
			console.error("Unknown error during file upload:", err)
			return res
				.status(500)
				.json({ error: "An unexpected error occurred.", details: err.message })
		}

		// Success: Proceed to next middleware or the main controller function
		if (!req.file) {
			console.error("No file uploaded")
			return res.status(400).json({ error: "No file uploaded." })
		}

		// Log the file details for debugging
		console.log("Uploaded file:", req.file)
		console.log("Request body:", req.body)

		// Add the file to the request object, if needed in the next handler
		req.file = req.file
		next()
	})
}

export default uploadSingleImage
