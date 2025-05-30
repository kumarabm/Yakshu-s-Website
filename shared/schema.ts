import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

export interface IAdminUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export interface IDress extends Document {
  name: string;
  price: number;
  sizes: string[];
  shortDescription: string;
  fullDescription: string;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const adminUserSchema = new Schema<IAdminUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

const dressSchema = new Schema<IDress>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: String, required: true }],
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);
export const AdminUser = mongoose.model<IAdminUser>('AdminUser', adminUserSchema);
export const Dress = mongoose.model<IDress>('Dress', dressSchema);

import { z } from 'zod';

export type { IUser as User, IAdminUser as AdminUser, IDress as Dress };
export type InsertUser = Pick<IUser, 'username' | 'password'>;
export type InsertAdminUser = Pick<IAdminUser, 'name' | 'email' | 'password' | 'role'>;
export type InsertDress = Pick<IDress, 'name' | 'price' | 'sizes' | 'shortDescription' | 'fullDescription' | 'category' | 'imageUrl'>;
export type UpdateDress = Partial<InsertDress>;

// Validation schemas for compatibility
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertAdminUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  role: z.string().default('admin'),
});

export const insertDressSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  sizes: z.array(z.string()),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  category: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const updateDressSchema = insertDressSchema.partial();