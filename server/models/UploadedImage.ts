
import mongoose, { Schema, Document } from 'mongoose';

export interface IUploadedImage extends Document {
  filename: string;
  originalName: string;
  path: string;
  url: string;
  uploadedAt: Date;
}

const UploadedImageSchema: Schema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  originalName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IUploadedImage>('UploadedImage', UploadedImageSchema);
