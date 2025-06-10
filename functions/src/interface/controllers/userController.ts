import { Request, Response } from 'express';
import { UserRepositoryFirestore } from '../../infrastructure/repositories/userRepositoriefirestore';
import { GetFindUser } from '../../use-cases/User/GetFindUser';
import { CreateUser } from '../../use-cases/User/CreateUser';



export class UserController {

    constructor(public findUseCase: GetFindUser, public createUseCase: CreateUser) {


    }

    async getId(req: Request, res: Response) {
        try {
            const email = req.params.email as string;
            
            const token = await this.findUseCase.getfind(email);
            return res.status(200).json({ value: token, error: "" });
        } catch (error) {
            
            return res.status(400).json({ value: "", error: "Error retrieving user" });
        }
    }

    async cretedUser(req: Request, res: Response) { 
        try {
            const user = req.body;
            const result = await this.createUseCase.create(user);
            
            return res.status(201).json({ value: result, error: "" });
           
        } catch (error) {
            return res.status(400).json({ value: "", error: "Error in creating user" });
        }
    }

}

const userRepository = new UserRepositoryFirestore();
const getFindUser = new GetFindUser(userRepository);
const createUser = new CreateUser(userRepository);
export const userController = new UserController(getFindUser,createUser);