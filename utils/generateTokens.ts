import { create, getNumericDate } from "https://deno.land/x/djwt/mod.ts";

const SECRET_KEY = "your-secret-key"; // Ideally, use an environment variable for the secret key
const ACCESS_TOKEN_EXPIRY = 60 * 15; // Access token expiration time in seconds (15 minutes)
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7; // Refresh token expiration time in seconds (7 days)

// Generate Access Token
async function generateAccessToken(userId: string) {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: getNumericDate(ACCESS_TOKEN_EXPIRY) },
    SECRET_KEY,
  );
}

// Generate Refresh Token
async function generateRefreshToken(userId: string) {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: getNumericDate(REFRESH_TOKEN_EXPIRY) },
    SECRET_KEY,
  );
}

export { generateAccessToken, generateRefreshToken };
