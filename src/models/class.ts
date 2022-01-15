import { Schema, model } from 'mongoose';

interface Class {
  name: string,
  description: string,
  video: string,
  date_init: Date,
  date_end: Date,
  date_created: Date,
  date_updated: Date,
  total_comments: number,
}

const ClassSchema = new Schema<Class>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
  date_init: { type: Date, required: true },
  date_end: { type: Date, required: true },
  date_created: { type: Date, required: true },
  date_updated: { type: Date, required: true },
  total_comments: { type: Number, required: true },
});

export default model<Class>('Class', ClassSchema);
