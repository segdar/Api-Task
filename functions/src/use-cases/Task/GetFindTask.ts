import { TaskRepository } from "../../domain/interfaces/task";

export class GetFindTask {
    constructor(private taskRepository: TaskRepository) {}

    async find(id: string) {
        if (!id) {
            throw new Error("ID is required");
        }
        return await this.taskRepository.findById(id);
    }
}