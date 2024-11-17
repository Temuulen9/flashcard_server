import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";

import {
  loginUserController,
  registerUserController,
} from "../controllers/authController.ts";

const authRouter = new Router();

authRouter
  .post("/api/registerUser", registerUserController)
  .post("/api/loginUser", loginUserController);

export default authRouter;
