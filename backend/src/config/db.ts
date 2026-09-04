import mongoose from "mongoose";

let conn: Promise<typeof mongoose> | null = null;

// Cached singleton: one real connect per cold start; a failed connect is
// retried on the next call instead of poisoning the cache.
export const connectDB = (): Promise<typeof mongoose> => {
  if (!conn) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      return Promise.reject(new Error("MONGO_URI is required"));
    }
    conn = mongoose.connect(uri);
    conn.catch(() => {
      conn = null;
    });
  }
  return conn;
};
