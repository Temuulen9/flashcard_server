import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import {
  getAllUsersController,
  getUserByIdController,
} from "../controllers/userController.ts";

const userRouter = new Router();

userRouter
  .get("/api/users", getAllUsersController)
  .get("/api/users/:id", getUserByIdController);

export default userRouter;
