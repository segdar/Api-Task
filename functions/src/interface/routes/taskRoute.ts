import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth";


const router = Router();    


router.get('/',authenticateToken, taskController.getAllTasks.bind(taskController));
router.post('/',authenticateToken, taskController.createTask.bind(taskController));
router.put('/:taskId',authenticateToken, taskController.updateTask.bind(taskController));
router.delete('/:taskId',authenticateToken, taskController.deleteTask.bind(taskController));

export default router;