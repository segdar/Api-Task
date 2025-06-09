import { Task } from "../../domain/entities/task";
import { TaskRepository } from "../../domain/interfaces/task";
import FirestoreClient from "../database/firestoreClient";

export class TaskRepositorieFirestore implements TaskRepository {

    private db = FirestoreClient.getInstance();

    async findById(id: string): Promise<Task | null> {
      const task = await this.db.collection('task').doc(id).get();
		if (!task.exists) return null;
		return { id: task.id, ...task.data() } as Task;
    }


    async createTask(task: Task): Promise<boolean> {
      const docRef = await this.db.collection('task').add(task);
        if (!docRef.id) return false;
		return true;
    }


    async updateTask(id: string, task: Partial<Task>): Promise<boolean> {
        try{
        await this.db.doc(id).update(task);
        return true;
        } catch(error) {
            return false;
        }
    }


    async deleteTask(id: string): Promise<boolean> {
      try{
        await this.db.doc(id).delete();
        return true;

      }catch(error) {
        return false;
      }
    }


    async getAllTasks(): Promise<Task[]> {
    const docRef = await this.db.collection('task').get();
    if (docRef.empty) return [];
	return docRef.docs.map((task) => ({ id: task.id, ...task.data() } as Task));
    }

}