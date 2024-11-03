import { log } from "node:console";
import { client } from "../db/database.ts";

// services/userService.ts
interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];

const db= client.db("sample_flix");
const collection = db.collection("users");
const user = await collection.findOne({"name": "Robb Stark"});
log(user );


const getAllUsers = async (): Promise<User[]> => {
    


    
    return users;
};

const getUserById = async (id: number): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
};

export { getAllUsers, getUserById };
