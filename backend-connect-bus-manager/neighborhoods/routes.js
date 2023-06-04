import express from 'express';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { NeighborhoodController } from './controller.js';

const app = express();


const neighborhoodsController = new NeighborhoodController();
app.get('/', authenticateToken, neighborhoodsController.listAll);


export const neighborhoodsRouter = app;