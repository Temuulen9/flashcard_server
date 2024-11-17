import { Context } from "https://deno.land/x/oak/mod.ts";
import { verify } from "https://deno.land/x/djwt/mod.ts";

async function authMiddleware(ctx: Context, next: () => Promise<unknown>) {
  const authHeader = ctx.request.headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Authorization header missing" };
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, SECRET_KEY, "HS256");
    ctx.state.user = payload.userId;
    await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid or expired token" };
  }
}

export { authMiddleware };
