import { model, Schema, Document } from 'mongoose'

export interface IPerson extends Document {
	name: string,
}

const PersonSchema: Schema = new Schema<IPerson>({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
	},
})

export const Person = model<IPerson>('Person', PersonSchema)
