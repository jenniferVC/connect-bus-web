import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { NeighborhoodController } from './controller.js';

const app = express();

const neighborhoodsController = new NeighborhoodController();

app.get('/',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => neighborhoodsController.listAll(request, response)
);

export const neighborhoodsRouter = app;