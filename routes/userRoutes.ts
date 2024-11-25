import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import {
  getAllUsersController,
  getUserByIdController,
  mGetUserInfoController,
} from "../controllers/userController.ts";
import { authMiddleware } from "../utils/authMiddleware.ts";

const userRouter = new Router();

userRouter
  .get("/api/users", getAllUsersController)
  .get("/api/users/:id", getUserByIdController)
  .get("/api/mGetUserInfo", authMiddleware, mGetUserInfoController);

export default userRouter;
