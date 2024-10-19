import mongoose, { Schema, Document } from "mongoose"

export interface ITrip extends Document {
	country: string
	city: string
	date: Date
	category?: string
	summary?: string
	rating?: number
	images: Array<
		| string
		| {
				data: string
				contentType: string
		  }
	>
}

type ValidatorProps = {
	value: any
	path: string
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
			type: Schema.Types.Mixed,
			validate: [
				{
					validator: function (this: any, v: any): boolean {
						return typeof v === "string" || (v && v.data && v.contentType)
					},
					message: function (this: any, props: ValidatorProps): string {
						return `${props.value} is not a valid image format!`
					},
				},
			],
		},
	],
})

export default mongoose.model<ITrip>("Trip", TripSchema)
