import { Context } from "https://deno.land/x/oak/mod.ts";
import { verify  } from "https://deno.land/x/djwt/mod.ts";

async function authMiddleware(ctx: Context, next: () => Promise<unknown>) {
  const authHeader = ctx.request.headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Authorization header missing" };
    return;
  }

  const token = authHeader.split(" ")[1];
  try {

    const base64Key = Deno.env.get("SECRET_KEY");
    const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );
    const payload = await verify(token, key, "HS256");
    ctx.state.userId = payload.userId;
    await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid or expired token " + err };
  }
}

export { authMiddleware };
