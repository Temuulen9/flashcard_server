// routes/index.ts
import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import userRouter from "./userRoutes.ts";
import authRouter from "./authRoutes.ts";

const router = new Router();

router.use(
  userRouter.routes(),
  authRouter.routes(),
  userRouter.allowedMethods(),
);

export default router;
