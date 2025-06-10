import { Task } from "../../domain/entities/task";
import { TaskRepository } from "../../domain/interfaces/task";

export class UpdateTask {

    constructor(private taskRepository: TaskRepository){

    }

    async execute(id: string, task: Partial<Task>) {
        if(!id){
            throw new Error("ID is required");
        }
       return await this.taskRepository.updateTask(id, task)
    }

}