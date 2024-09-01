import { Request } from "express"
import multer, { StorageEngine, FileFilterCallback } from "multer"
import path from "path"

// Set up multer storage
const storage: StorageEngine = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	) => {
		cb(null, "uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
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

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

export default upload
