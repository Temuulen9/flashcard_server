// db/database.ts
import { MongoClient } from "npm:mongodb@5.6.0";

// Initialize the MongoDB client
const client = new MongoClient("mongodb+srv://9temuulen9:9temuulen9@flash-card-app-dev-clus.irjrb.mongodb.net/?retryWrites=true&w=majority&appName=flash-card-app-dev-cluster");

// Connect to the MongoDB server
try {
  await client.connect();
  await client.db("sample_mflix").command({ ping: 1 });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  Deno.exit(1);
}

console.log('connected to MongoDb');



export {client};
