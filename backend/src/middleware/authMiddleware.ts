import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

interface UserInterface {
	userId: string
}

declare module "express" {
	interface Request {
		user?: UserInterface
	}
}

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader && authHeader.split(" ")[1]

	if (!token) return res.sendStatus(401) // Unauthorized

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as unknown as UserInterface
		req.user = decoded
		next()
	} catch (err) {
		console.error("Error verifying token:", err)
		res.sendStatus(403) // Forbidden
	}
	return undefined
}
