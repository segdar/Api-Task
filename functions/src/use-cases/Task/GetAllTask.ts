import { TaskRepository } from "../../domain/interfaces/task";

export class GetAllTask {
    constructor(private taskRepository: TaskRepository) {}

    async getAll(iduser:string) {
        return await this.taskRepository.getAllTasks(iduser);
    }
}