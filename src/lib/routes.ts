export const publicRoutes = [
  "/",
];

export const authRoutes = [
  "/login",
  "/register",
  "/error",
];

/**
 * Rute yang hanya bisa diakses oleh ADMIN
 */
export const adminRoutes = [
  "/admin",
];

/**
 * Rute yang hanya bisa diakses oleh PELAPOR
 */
export const pelaporRoutes = [
  "/report",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";