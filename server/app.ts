import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import authRouter from './routes/auth';

const app = express();

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use('/auth', authRouter);

app.get('/', (req, res, err) => res.send('HELLO WORLD'));

// error handling endware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  console.error(err.stack);
  res.status(500).send(err.message || 'Internal server error.');
  // res.status(err.status || 500).send(err.message || 'Internal server error.');
});

export default app;
