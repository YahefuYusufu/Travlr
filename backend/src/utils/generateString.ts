const crypto = require("crypto")
const fs = require("fs")

export const generateRandomString = (length: number): string => {
	return crypto.randomBytes(length).toString("base64")
}

const randomString = generateRandomString(32) // Generate a 32-character random string

try {
	fs.writeFileSync(".env", `JWT_SECRET=${randomString}`)
	console.log("New .env file created with random secret")
} catch (err) {
	console.error("Error writing to .env file:", err)
}
