import { Task } from "../../domain/entities/task";
import { TaskRepository } from "../../domain/interfaces/task";

export class CreateTask {
    constructor(private taskRepository: TaskRepository) {}

    async create(task: Omit<Task,'id'>) {
        if (!task.title) {
            throw new Error("Title is required");
        }
        if (!task.description) {
            throw new Error("Description is required");
        }
        return await this.taskRepository.createTask(task);
    }
}