import { Context } from "https://deno.land/x/oak/mod.ts";
import { verify } from "https://deno.land/x/djwt/mod.ts";
import { getSecretKey } from "./generateTokens.ts";


async function authMiddleware(ctx: Context, next: () => Promise<unknown>) {
  const authHeader = ctx.request.headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Authorization header missing" };
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const key = await getSecretKey();
    const payload = await verify(token, key, "HS256");
    ctx.state.userId = payload.userId;
    await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid or expired token " + err };
  }
}

export { authMiddleware };
