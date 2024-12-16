import { userDb } from "../db/database.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const collection = userDb.collection("users");

const registerUser = async (
  firstname: string,
  lastname: string,
  phoneNumber: string,
  password: string,
) => {
  try {
    const user = await collection.findOne({ phoneNumber: phoneNumber });

    if (user) {
      return {
        "message": "User already registered",
      };
    } else {
      const _id = await collection.insertOne({
        firstname,
        lastname,
        phoneNumber,
        password: await bcrypt.hash(password),
      });

      const user = await collection.findOne({ _id: _id.insertedId }, {
        projection: { _id: 0, password: 0 },
      });

      return user;
    }
  } catch (e) {
    return e;
  }
};

const loginUser = async (phoneNumber: string) => {
  try {
    const user = await collection.findOne({ phoneNumber: phoneNumber });

    return user;
  } catch (e) {
    return e;
  }
};

export { loginUser, registerUser };
