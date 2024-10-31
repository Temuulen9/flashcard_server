// routes/index.ts
import { Router } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./userRoutes.ts";

const router = new Router();

router.use(userRouter.routes(), userRouter.allowedMethods());

export default router;
