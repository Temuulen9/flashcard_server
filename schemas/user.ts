interface UserSchema {
  _id: string; // MongoDB ObjectId as string
  name: string;
  email: string;
  // Add other fields as necessary
}

export type { UserSchema };
