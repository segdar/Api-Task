import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/interfaces/user";
import { generateToken } from "../../interface/middleware/auth";

export class CreateUser {

    constructor(private userRepository: UserRepository) {}

    async create(user:Omit<User, 'id'>) {
        if (!user.email) {
            throw new Error("Email is required");
        }
       const tmp = await this.userRepository.CreateUser(user);
       const token = generateToken(tmp.id);
       return  token;
    }

}