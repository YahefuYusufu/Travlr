import { AppError } from "./AppError"

export class DuplicateEmailError extends AppError {
	constructor(message: string = "Duplicate email") {
		super(message, 400)
	}
}
