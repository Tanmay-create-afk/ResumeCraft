import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let cachedConnection = null;

const DEFAULT_MONGO_URI = 'mongodb://tanmayyawalkar3_db_user:dkE08MRqWr0Xenr7@ac-zx3aohw-shard-00-00.qhkt9lz.mongodb.net:27017,ac-zx3aohw-shard-00-01.qhkt9lz.mongodb.net:27017,ac-zx3aohw-shard-00-02.qhkt9lz.mongodb.net:27017/resumecraft?ssl=true&replicaSet=atlas-yyapov-shard-0&authSource=admin';

const connectDB = async () => {
  // If already connected, reuse existing database connection (critical for Serverless/Vercel)
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || DEFAULT_MONGO_URI;

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

