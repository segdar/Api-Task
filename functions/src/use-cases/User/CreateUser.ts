import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/interfaces/user";

export class CreateUser {

    constructor(private userRepository: UserRepository) {}

    async create(user: Partial<User>) {
        if (!user.emial) {
            throw new Error("Email is required");
        }
        return await this.userRepository.CreateUser(user);
    }

}