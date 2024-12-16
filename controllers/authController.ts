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

  if (!await bcrypt.compareSync(password, user.password)) {
    ctx.response.body = 401;
    ctx.response.body = {
      "message": "Incorrect password",
    };
    return;
  }

  // const accessToken = await generateAccessToken(user._id);
  // const refreshToken = await generateRefreshToken(user._id);

  ctx.response.body = {
    "accessToken": "accessToken",
    "refreshToken": "refreshToken",
  };
};

export { loginUserController, registerUserController };
