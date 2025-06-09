import { Request, Response } from 'express';
import { UserRepository } from "../../domain/interfaces/user";

export class UserController {

    constructor(private userRepository: UserRepository) {


    }

    async getId(req: Request, res: Response) {
        try {
            const email = req.params.email as string;
            const userInfo = await this.userRepository.findById(email);
            if (userInfo === null) {
                return res.status(200).json({ value: "", error: "" });
            }
            return res.status(200).json({ value: userInfo, error: "" });
        } catch (error) {
            return res.status(400).json({ value: "", error: "Error retrieving user" });
        }
    }

    async cretedUser(req: Request, res: Response) { 
        try {
            const user = req.body;
            const result = await this.userRepository.CreateUser(user);
            if (result) {
                return res.status(201).json({ value: result, error: "" });
            } else {
                return res.status(400).json({ value: "", error: "Failed to create user" });
            }
        } catch (error) {
            return res.status(400).json({ value: "", error: "Error in creating user" });
        }
    }

}