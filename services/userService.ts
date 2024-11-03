import { userDb } from "../db/database.ts";
import {  BSON } from "npm:mongodb@5.6.0";


interface User {
    _id: string;  // MongoDB ObjectId as string
    name: string;
    email: string;
    // Add other fields as necessary
}


const getAllUsers = async (): Promise<User[]> => {
    
    const collection = userDb.collection("users");

    const usersCursor = await collection.find({},{ projection: { password: 0} });
    const documents = await usersCursor.toArray();

        // Map the MongoDB documents to the User interface
        const users: User[] = documents.map((doc : any) => ({
            _id: doc._id.toString(),  // Convert ObjectId to string
            name: doc.name,
            email: doc.email,
        }));
        
    return users;
};

const getUserById = async (id: string): Promise<User | null> => {
    try {
       

        const collection = userDb.collection("users");
        const objectId = new BSON.ObjectId(id);
        const userDoc = await collection.findOne({ _id: objectId }, { projection: { password: 0 } });
    
        if (!userDoc) {
            return null; // If no user is found, return null
        }
    
        // Map the MongoDB document to the User interface
        const user: User = {
            _id: userDoc._id.toString(),  // Convert ObjectId to string
            name: userDoc.name,
            email: userDoc.email,
            // Include other fields as needed
        };
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};


// const getUserById = async (id: string): Promise<any> => {
//     const collection = userDb.collection("users");
//     const objectId = new BSON.ObjectId(id);
//     const user = await collection.findOne({_id: objectId},{ projection: { password: 0} });

//     return user;
// };

export { getAllUsers, getUserById };
