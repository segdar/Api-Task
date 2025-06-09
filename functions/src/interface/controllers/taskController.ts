import { Request, Response } from 'express';
import { TaskRepositorieFirestore } from "../../infrastructure/repositories/taskRepositoriefirestore";

export class TaskController {

    constructor(private taskRepository: TaskRepositorieFirestore) {}

    async getId (req: Request, res: Response) {
        try{
        const id = req.params.taskId as string;
        const taskInfo = await this.taskRepository.findById(id);
         if (taskInfo === null) {
            return res.status(200).json({ value: "", error: "" });
        }
        return res.status(200).json({ value: taskInfo,  error: "" });
        } catch (error) {   
        
        return res.status(400).json({ value: "",  error: "Error retrieving task" });

        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const task = req.body;
            const result = await this.taskRepository.createTask(task);
            if (result) {
                return res.status(201).json({ value: result,  error: "" });
            } else {
                return res.status(400).json({ value: "",  error: "Failed to create task" });
            }
        } catch (error) {
            return res.status(400).json({ value: "",  error: "Error in creating task" });
        }
    }

    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await this.taskRepository.getAllTasks();
            return res.status(200).json({ value: tasks, error: "" });
        } catch (error) {
            return res.status(400).json({ value: "",  error: "Error retrieving tasks" });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const id = req.params.taskId as string;
            const result = await this.taskRepository.deleteTask(id);
            if (result) {
                return res.status(200).json({ value: result, error: "" });
            } else {
                return res.status(400).json({ value: "", error: "Failed to delete task" });
            }
        } catch (error) {
            return res.status(400).json({ value: "", error: "Error in deleting task" });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const id = req.params.taskId as string;
            const task = req.body;
            const result = await this.taskRepository.updateTask(id, task);
            if (result) {
                return res.status(200).json({ value: result, error: "" });
            } else {
                return res.status(400).json({ value: "", error: "Failed to update task" });
            }
        } catch (error) {
            return res.status(400).json({ value: "", error: "Error in updating task" });
        }
    }

    



}