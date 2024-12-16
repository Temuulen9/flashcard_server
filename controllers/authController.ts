import { loginUser, registerUser } from "../services/authService.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create, decode, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import "@std/dotenv/load";
import {
  generateAccessToken,
  generateRefreshToken,
  getSecretKey,
} from "../utils/generateTokens.ts";

const refreshToken = async (ctx: Context) => {
  const { refreshToken } = await ctx.request.body.json();

  try {
    const key = await getSecretKey();

    const payload = await verify(refreshToken, key, "HS256");

    const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp

    if (payload.exp && payload.exp < currentTime) {
      // Refresh token expired
      ctx.response.status = 401;
      ctx.response.body = { error: "Refresh token expired" };
      return;
    }

    const newAccessToken = await generateAccessToken(payload.userId);

    // Send back the new access token
    ctx.response.status = 200;
    ctx.response.body = { accessToken: newAccessToken };
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid refresh token" };
  }
};

const registerUserController = async (ctx: Context) => {
  const { firstname, lastname, phoneNumber, password } = await ctx.request.body
    .json();

  const user = await registerUser(firstname, lastname, phoneNumber, password);

  ctx.response.body = user;
};

const loginUserController = async (ctx: Context) => {
  const  { phoneNumber, password } = await ctx.request.body.json();
  const phone : string = phoneNumber as string;
  const user = await loginUser(phone);

  if (!user) {
    ctx.response.body = 404;
    ctx.response.body = {
      "message": "User not found",
    };
    return;
  }

  console.log(password),
  console.log(user.password),
  if (!await bcrypt.compare(password, user.password)) {
    ctx.response.body = 401;
    ctx.response.body = {
      "message": "Incorrect password",
    };
    return;
  }

  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  ctx.response.body = {
    "accessToken": accessToken,
    "refreshToken": refreshToken,
  };
};

export { loginUserController, refreshToken, registerUserController };
