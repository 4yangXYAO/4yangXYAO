export const API_BASE_URL =
  import.meta.env.VITE_API_URL || (window.location.origin.includes("localhost") ? "http://localhost:5000" : "");

// Backend base URL for serving static files (uploads)
export const BACKEND_URL = API_BASE_URL.replace("/api/v1", "");

// Helper to get full image URL from backend path
export const getImageUrl = (path?: string): string => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/media")) return path;
  return `${BACKEND_URL}${path}`;
};
