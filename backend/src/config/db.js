import mongoose from 'mongoose';

let cachedConnection = null;

const connectDB = async () => {
  // If already connected, reuse existing database connection (critical for Serverless/Vercel)
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is not defined in environment variables.');
    throw new Error('Database connection string (MONGO_URI) is missing.');
  }

  try {
    cachedConnection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB Atlas Connected: ${cachedConnection.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;

