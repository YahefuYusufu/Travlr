import mongoose from "mongoose"

interface PasswordResetTokenInterface {
	user: mongoose.Schema.Types.ObjectId
	token: string
	createdAt: Date
}

const passwordResetTokenSchema =
	new mongoose.Schema<PasswordResetTokenInterface>({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			expires: 3600, // Token expires in 1 hour
		},
	})

const PasswordResetToken = mongoose.model<PasswordResetTokenInterface>(
	"PasswordResetToken",
	passwordResetTokenSchema
)

export default PasswordResetToken
