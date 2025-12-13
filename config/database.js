import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log("MongoDB is connected");
    return;
  }
  try {
     await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('MongoDB connected!');
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
export default connectDB;
