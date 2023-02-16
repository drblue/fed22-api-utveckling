import { model, Schema, Document } from 'mongoose'

export interface IMovie extends Document {
	title: string,
	runtime: number | null,
	releaseYear?: number,
	genres: string[],
	watched?: Date,
}

const MovieSchema: Schema = new Schema<IMovie>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		unique: true,
	},
	runtime: {
		type: Number,
		default: null,
		// min: 1,
		validate(value: number) {
			if (value < 1 && value !== null) {
				throw new Error("Just because you thought the movie was bad, it shouldn't have a zero or negative runtime.")
			}
		},
	},
	releaseYear: {
		type: Number,
		min: 1888,
		max: new Date().getFullYear(),
	},
	genres: {
		type: [String],
		lowercase: true,
		default: [],
		// enum: ["action", "sci-fi", "bromance", "realism"],
	},
	watched: {
		type: Date,
		default() {
			return Date.now()
		},
	}
})

export const Movie = model<IMovie>('Movie', MovieSchema)
