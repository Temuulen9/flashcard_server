// controllers/userController.ts
import { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { getAllUsers, getUserById } from "../services/userService.ts";




const getAllUsersController = async (ctx: Context) => {
    const users = await getAllUsers();
    ctx.response.status = 200;
    ctx.response.body = { success: true, data: users };
};

// deno-lint-ignore no-explicit-any
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

export { getAllUsersController, getUserByIdController };
