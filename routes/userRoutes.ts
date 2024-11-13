import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import {
  getAllUsersController,
  getUserByIdController,
  loginUserController,
  registerUserController,
} from "../controllers/userController.ts";

const userRouter = new Router();

userRouter
  .get("/api/users", getAllUsersController)
  .get("/api/users/:id", getUserByIdController)
  .post("/api/registerUser", registerUserController)
  .post("/api/loginUser", loginUserController);

export default userRouter;
