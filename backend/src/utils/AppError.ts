export class AppError extends Error {
	statusCode: number
	message: string
	isOperational: boolean

	constructor(message: string = "An error occurred", statusCode = 400) {
		super(message)
		this.statusCode = statusCode
		this.message = message // Initialize message with the provided value
		this.isOperational = true
		Error.captureStackTrace(this, this.constructor)
	}
}
