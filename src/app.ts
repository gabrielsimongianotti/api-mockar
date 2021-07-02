import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import { errors } from 'celebrate';
import express, {  Request, Response, NextFunction } from 'express';

import {router} from './routes';

import '@container/index';
import AppError from '@erros/AppError';


const app = express();
app.use(express.json());
app.use(router);
app.use(errors);


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export { app }