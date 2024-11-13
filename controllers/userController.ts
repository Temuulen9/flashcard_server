// controllers/userController.ts
import { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { getAllUsers, getUserById } from "../services/userService.ts";
import { loginUser, registerUser } from "../services/authService.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create } from "https://deno.land/x/djwt@v3.0.2/mod.ts";


const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

const getAllUsersController = async (ctx: Context) => {
  const users = await getAllUsers();
  ctx.response.status = 200;
  ctx.response.body = { success: true, data: users };
};

const getUserByIdController = async (ctx: any) => {
  const id = ctx.params.id;
  const user = await getUserById(id);
  if (user) {
    ctx.response.status = 200;
    ctx.response.body = { success: true, data: user };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { success: false, message: "User not found" };
  }
};

const registerUserController = async (ctx: Context) => {
  const { name, email, password } = await ctx.request.body.json();

  const user = await registerUser(name, email, password);

  ctx.response.body = user;
};

const loginUserController = async (ctx: Context) => {
  const { email, password } = await ctx.request.body.json();

  const user = await loginUser(email, password);

  if (!user) {
    ctx.response.body = 404;
    ctx.response.body = {
      "message": "User not found",
    };
    return;
  }
  console.log(user);
  if (!await bcrypt.compare(password, user.password)) {
    ctx.response.body = 401;
    ctx.response.body = {
      "message": "Incorrect password",
    };
    return;
  }

  const jwt = await create({ alg: "HS512", typ: "JWT" }, { _id: user._id }, key);

  ctx.response.body = jwt;
};

export {
  getAllUsersController,
  getUserByIdController,
  loginUserController,
  registerUserController,
};
