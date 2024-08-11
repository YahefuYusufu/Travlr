import nodemailer from "nodemailer"

export const sendEmail = async (options: {
	to: string
	subject: string
	text: string
}) => {
	const transporter = nodemailer.createTransport({
		// Replace with your email service configuration
		service: "gmail",
		auth: {
			user: "yusufuyahefu@gmail.com",
			pass: "Pargu155867",
		},
	})

	const mailOptions = {
		from: "PRG yusufuyahefu@gmail.com",
		to: options.to,
		subject: options.subject,
		text: options.text,
	}

	await transporter.sendMail(mailOptions)
}
