interface UserSchema {
  _id: string; // MongoDB ObjectId as string
  firstname: string;
  lastname: string;
  phoneNumber: string;
  // Add other fields as necessary
}

export type { UserSchema };
