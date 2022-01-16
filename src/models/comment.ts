import { Schema, model, Types } from 'mongoose';

interface Comment {
  id_class: Types.ObjectId,
  comment: string,
  date_created: Date,
}

const CommentSchema = new Schema<Comment>({
  id_class: { type: 'ObjectId', ref: 'Class', required: true },
  comment: { type: String, required: true },
  date_created: { type: Date, required: true },
});

export default model<Comment>('Comment', CommentSchema);
