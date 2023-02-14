import { model, Schema, Document } from 'mongoose'

export interface IMovie extends Document {
	title: string,
	runtime?: number,
	releaseYear?: number,
}

const MovieSchema: Schema = new Schema<IMovie>({
	title: { type: String, required: true },
	runtime: { type: Number, min: 1 },
	releaseYear: { type: Number, min: 1888 },
})

export const Movie = model<IMovie>('Movie', MovieSchema)
