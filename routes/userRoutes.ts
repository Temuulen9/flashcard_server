import { Router } from "https://deno.land/x/oak/mod.ts";
import { getAllUsersController, getUserByIdController } from "../controllers/userController.ts";

const userRouter = new Router();


userRouter
    .get("/users", getAllUsersController)
    .get("/users/:id", getUserByIdController);

export default userRouter;
