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

const getAllUsers = async (): Promise<User[]> => {
    return users;
};

const getUserById = async (id: number): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
};

export { getAllUsers, getUserById };
