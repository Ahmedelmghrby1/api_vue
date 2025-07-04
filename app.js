import express from 'express'
import taskRouter from './modules/tasks/tasks.routes.js';
import authRouter from './modules/user/user.routes.js';
import cors from 'cors'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter);
app.use('/api', taskRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))