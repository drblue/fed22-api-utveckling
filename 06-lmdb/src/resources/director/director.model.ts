import { model, Schema, Document } from 'mongoose'

export interface IDirector extends Document {
	name: string,
}

const DirectorSchema: Schema = new Schema<IDirector>({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
	},
})

export const Director = model<IDirector>('Director', DirectorSchema)
