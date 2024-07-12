/**
 * An array of public routes that do not require authentication.
 * These routes don't need to be authenticated.
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/verification"];

/**
 * An array of public routes that use for authentication.
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/password",
];

/**
 * The prefix for api authentication routes.
 * Routes that start with this prefic are used for authentication.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a user logs in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
