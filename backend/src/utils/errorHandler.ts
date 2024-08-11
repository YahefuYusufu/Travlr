import { Request, Response, NextFunction } from "express"
import { AppError } from "./AppError" // Assuming AppError is in a utils directory

const handleError = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	// Check if the error is an instance of AppError
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			status: "error",
			message: err.message,
		})
	} else {
		// Handle other errors
		console.error(err)
		res.status(500).json({
			status: "error",
			message: "An error occurred",
		})
	}
}

export default handleError
