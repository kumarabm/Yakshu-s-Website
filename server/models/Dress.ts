
import mongoose, { Schema, Document } from 'mongoose';

export interface IDress extends Document {
  name: string;
  price: number;
  sizes: string[];
  image: string;
  description: string;
  createdAt: Date;
}

const DressSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IDress>('Dress', DressSchema);
