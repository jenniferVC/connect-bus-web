import express from 'express';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { BairroController } from './controller.js';

const app = express();


const bairrosController = new BairroController();
app.get('/', authenticateToken, bairrosController.listAll);


export const bairrosRouter = app;