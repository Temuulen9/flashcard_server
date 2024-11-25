import { create, getNumericDate } from "https://deno.land/x/djwt/mod.ts";

const ACCESS_TOKEN_EXPIRY = 60; // Access token expiration time in seconds (15 minutes)
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7; // Refresh token expiration time in seconds (7 days)


const base64Key = Deno.env.get("SECRET_KEY");
const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
const key = await crypto.subtle.importKey(
  "raw",
  rawKey,
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);


// Generate Access Token
async function generateAccessToken(userId: string) {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: getNumericDate(ACCESS_TOKEN_EXPIRY) },
    key,
  );
}

// Generate Refresh Token
async function generateRefreshToken(userId: string) {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: getNumericDate(REFRESH_TOKEN_EXPIRY) },
    key,
  );
}

export { generateAccessToken, generateRefreshToken };
