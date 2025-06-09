import { Task } from "../entities/task";

export interface TaskRepository {
    findById(id: string): Promise<Task | null>;
    createTask(task: Task): Promise<boolean>;
    updateTask(id: string, task: Partial<Task>): Promise<boolean>;
    deleteTask(id: string): Promise<boolean>;
    getAllTasks(): Promise<Task[]>;

}