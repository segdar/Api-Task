import { TaskRepository } from "../../domain/interfaces/task";

export class DeleteTask {
    
    constructor(private taskRepository: TaskRepository) {}

    async delete(id: string) {
        if (!id) {
            throw new Error("ID is required");
        }
        return await this.taskRepository.deleteTask(id);
    }

}