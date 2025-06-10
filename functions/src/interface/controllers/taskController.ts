import { Request, Response } from 'express';
import { TaskRepositorieFirestore } from "../../infrastructure/repositories/taskRepositoriefirestore";
import { TaskRepository } from '../../domain/interfaces/task';
import { CreateTask } from '../../use-cases/Task/CreateTask';
import { DeleteTask } from '../../use-cases/Task/DeleteTask';
import { GetAllTask } from '../../use-cases/Task/GetAllTask';
import { GetFindTask } from '../../use-cases/Task/GetFindTask';
import { UpdateTask } from '../../use-cases/Task/UpdateTask';


export class TaskController {

    constructor(private createUseCase: CreateTask, private deleteUseCase:  DeleteTask, private alltaskUseCase: GetAllTask, private findtaskUseCase:  GetFindTask, private updatataskUseCase:UpdateTask ) {}

    async getId (req: Request, res: Response) {
        try{
        const id = req.params.taskId as string;
        const taskInfo = await this.findtaskUseCase.find(id);
         if (taskInfo === null) {
            return res.status(200).json({ value: "", error: "" });
        }
        return res.status(200).json({ value: taskInfo,  error: "" });
        } catch (error) {   
        console.error(error);
        return res.status(400).json({ value: "",  error: "Error retrieving task" });

        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const userId = (req as any).user.iduser; 
            const task = req.body;
            const tmp = {
                ...task,
                user_creation: userId,
            }
            
            const result = await this.createUseCase.create(tmp);
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
            const userId = (req as any).user.iduser; 
            const tasks = await this.alltaskUseCase.getAll(userId);
            return res.status(200).json({ value: tasks, error: "" });
        } catch (error) {
            return res.status(400).json({ value: "",  error: "Error retrieving tasks" });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const id = req.params.taskId as string;
            const result = await this.deleteUseCase.delete(id);
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
             const userId = (req as any).user.iduser; 
            const id = req.params.taskId as string;
            const task = req.body;
            const tmp = {
                ...task,
                user_creation: userId,
            }
            
            const result = await this.updatataskUseCase.execute(id, tmp);
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
const taskRepository: TaskRepository = new TaskRepositorieFirestore();
const createUseCase = new CreateTask(taskRepository);
const deleteUseCase = new DeleteTask(taskRepository);   
const alltaskUseCase = new GetAllTask(taskRepository);
const findtaskUseCase = new GetFindTask(taskRepository);
const updatataskUseCase = new UpdateTask(taskRepository);
export const taskController = new TaskController(createUseCase, deleteUseCase, alltaskUseCase, findtaskUseCase, updatataskUseCase);
