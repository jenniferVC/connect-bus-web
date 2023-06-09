import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { NeighborhoodController } from './controller.js';
import { validateNeighborhood } from './validators/create.validator.js';

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
app.post('/novo',
  (request, response, next) => validateNeighborhood(request, response, next),
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => neighborhoodsController.create(request, response)
)

// Atualiza bairro
app.post('/update/:docID',
  (request, response, next) => validateNeighborhood(request, response, next),
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => neighborhoodsController.update(request, response)
)

export const neighborhoodsRouter = app;