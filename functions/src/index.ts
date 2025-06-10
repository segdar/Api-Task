import express from "express";
import userRoute from "./interface/routes/userRoute";
import taskRouter from "./interface/routes/taskRoute";
import { onRequest } from "firebase-functions/v2/https";

const app = express();

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/tasks', taskRouter);


export const appTask = onRequest({cors:true},app);