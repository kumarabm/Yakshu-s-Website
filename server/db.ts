import dotenv from 'dotenv';
dotenv.config(); 
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is required. Please set up MongoDB Atlas and add your connection string.');
    }
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB connected successfully');
    
    // // Create default admin user if none exists
    // const AdminUser = (await import('./models/AdminUser')).default;
    // const adminCount = await AdminUser.countDocuments();
    
    // if (adminCount === 0) {
    //   await AdminUser.create({
    //     email: 'admin@yakshu.com',
    //     password: 'admin123'
    //   });
    //   console.log('Default admin user created: admin@yakshu.com');
    // }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default mongoose;
