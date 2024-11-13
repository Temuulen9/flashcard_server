import { userDb } from "../db/database.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { UserSchema } from "../schemas/user.ts";

const collection = userDb.collection("users");

const registerUser = async (name: string, email: string, password: string) => {
  try {
    const _id = await collection.insertOne({
      name,
      email,
      password: await bcrypt.hash(password),
    });

    const user = await collection.findOne({ _id: _id.insertedId }, {
      projection: { _id: 0, password: 0 },
    });

    return user;
  } catch (e) {
    return e;
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const user = await collection.findOne({ email: email });

    return user;
  } catch (e) {
    return e;
  }
};

export { loginUser, registerUser };
