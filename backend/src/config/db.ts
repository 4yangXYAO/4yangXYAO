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
    // ponytail: fail fast when Mongo is unreachable so the static fallback
    // in server.ts engages in ~3s instead of hanging on the 30s default.
    conn = mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    conn.catch(() => {
      conn = null;
    });
  }
  return conn;
};
