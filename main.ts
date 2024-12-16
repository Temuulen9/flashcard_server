// main.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/index.ts"; // Import the combined router

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running");
await app.listen({ port: 80 });
