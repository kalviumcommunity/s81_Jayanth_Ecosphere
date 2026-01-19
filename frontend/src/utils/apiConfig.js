export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(
  /\/+$/,
  ""
);

export function buildBackendUrl(path = "") {
  if (!BACKEND_URL) {
    throw new Error(
      "VITE_BACKEND_URL is not set. Add it to frontend/.env (example: http://<host>:<port>)."
    );
  }

  if (!path) return BACKEND_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${BACKEND_URL}${path}`;
  return `${BACKEND_URL}/${path}`;
}
