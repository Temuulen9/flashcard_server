// db/database.ts
import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: "your_user",
  password: "your_password",
  database: "your_database",
  hostname: "localhost",
  port: 5432,
});

export async function connectToDatabase() {
  await client.connect();
  console.log("Connected to the database");
}

export async function disconnectFromDatabase() {
  await client.end();
  console.log("Disconnected from the database");
}

export { client };
