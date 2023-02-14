import { model, Schema, Document } from 'mongoose'

export interface IMovie extends Document {
	title: string,
	runtime?: number,
	releaseYear?: number,
}

const MovieSchema: Schema = new Schema<IMovie>({
	title: { type: String, required: true },
	runtime: Number,
	releaseYear: Number,
})

export const Movie = model<IMovie>('Movie', MovieSchema)
