import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is missing. Please define it in your .env file.");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      family: 4, 
      serverSelectionTimeoutMS: 10000, 
    };

    console.log("[MongoDB] Initializing connection...");

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("[MongoDB] Connection established successfully.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("[MongoDB] Connection failed. Please verify your credentials and network status:", e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;