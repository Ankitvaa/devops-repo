import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error");
    console.error(error.message);
    throw error;
  }
};
