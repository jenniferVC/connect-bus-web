import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { HorarioController } from './controller.js';

const app = express();

// Lista os Horarios
app.get('/',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new HorarioController().listAll(request, response)
);

export const horariosRouter = app;
