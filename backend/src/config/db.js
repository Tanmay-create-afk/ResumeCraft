import mongoose from 'mongoose';
import dns from 'dns';

// Ensure standard public DNS resolver for Windows SRV queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if in restricted environment
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Tip: Make sure your IP is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0 or your current IP).');
  }
};

export default connectDB;
