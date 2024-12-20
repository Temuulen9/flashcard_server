// db/database.ts
import { Db, MongoClient } from "npm:mongodb@5.6.0";

// Initialize the MongoDB client
const client = new MongoClient(
  "mongodb+srv://9temuulen9:9temuulen9@flash-card-app-dev-clus.irjrb.mongodb.net/?retryWrites=true&w=majority&appName=flash-card-app-dev-cluster",
);
let userDb : Db;
// Connect to the MongoDB server
try {
  await client.connect();

  // connect to Users Database
  userDb = client.db("memigo_dev_users");

  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  Deno.exit(1);
}

export { userDb };
