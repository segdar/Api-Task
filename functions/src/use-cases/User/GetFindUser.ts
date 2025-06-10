import { UserRepository } from "../../domain/interfaces/user";
import { generateToken } from "../../interface/middleware/auth";

export class GetFindUser {
    
 constructor ( private userRepository: UserRepository){};

 async getfind(email:string) {
    const user = await this.userRepository.findById(email);
   
    if (user === null) {
        return null;
    }
    const tmp = user; 
    const token = generateToken(tmp.id);
    return  token;
 }

}