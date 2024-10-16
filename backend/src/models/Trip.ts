import mongoose, { Schema, Document } from "mongoose"

export interface ITrip extends Document {
	country: string
	city: string
	date: Date
	category?: string
	summary?: string
	rating?: number
	images: Array<{
		data: string
		contentType: string
	}>
}

const TripSchema: Schema = new Schema({
	country: { type: String, required: true },
	city: { type: String, required: true },
	date: { type: Date, required: true },
	category: { type: String },
	summary: { type: String },
	rating: { type: Number },
	images: [
		{
			data: String,
			contentType: String,
		},
	],
})

export default mongoose.model<ITrip>("Trip", TripSchema)
