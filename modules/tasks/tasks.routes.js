import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from './tasks.controller.js';
import { verifyToken } from '../../middleware/generatToken.js';

const taskRouter = Router();
taskRouter.get('/tasks',verifyToken, getTasks);
taskRouter.post('/tasks',verifyToken, createTask);
taskRouter.put('/tasks/:id',verifyToken, updateTask);
taskRouter.delete('/tasks/:id',verifyToken, deleteTask);

export default taskRouter;
