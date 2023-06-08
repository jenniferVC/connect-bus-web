import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { NeighborhoodController } from './controller.js';

const app = express();

const neighborhoodsController = new NeighborhoodController();

// Lista os Bairros
app.get('/',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => neighborhoodsController.listAll(request, response)
);

// Busca bairro pelo Id do Document
app.get('/:docID',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => neighborhoodsController.findByDocID(request, response)
);

// Adiciona bairro
app.post('/create',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => neighborhoodsController.create(request, response)
)


export const neighborhoodsRouter = app;