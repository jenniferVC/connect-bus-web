import express from 'express';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { BairrosController } from './controller.js';

const app = express();


const bairrosController = new BairrosController();
app.get('/', authenticateToken, bairrosController.listAll);


export const bairrosRouter = app;