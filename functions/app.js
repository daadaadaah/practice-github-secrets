import express from "express";

import cors from 'cors';

import hellowordRouter from './routes/helloword.route';
import authRouter from './routes/auth.route';

const app = express();
app.use(express.json());

app.use( cors( { origin: true }));
app.use('/hello-world', hellowordRouter);
app.use("/auth", authRouter);

export default app;
