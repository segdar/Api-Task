import { UserRepository } from "../../domain/interfaces/user";

export class GetFindUser {
    
 constructor ( private userRepository: UserRepository){};

 async getfind(id:string) {
    return await this.userRepository.findById(id);
 }

}