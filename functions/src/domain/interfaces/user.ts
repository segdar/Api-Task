import { User } from "../entities/user";

export interface UserRepository {
    findById(email: string): Promise<User | null>;
    CreateUser(user: Omit<User, 'id'>): Promise<User>;
}