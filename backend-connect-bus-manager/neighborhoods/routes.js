import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { NeighborhoodController } from './controller.js';
import { validateNeighborhood } from './validators/create.validator.js';

const app = express();

// Lista os Bairros
app.get('/',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new NeighborhoodController().listAll(request, response)
);

// Busca bairro pelo Id do Document
app.get('/:docID',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new NeighborhoodController().findByDocID(request, response)
);

// Busca bairro pelo nome
app.get('/:nome',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => {
    response.json('issoo');
  }
);

// Adiciona bairro
app.post('/novo',
  (request, response, next) => validateNeighborhood(request, response, next),
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new NeighborhoodController().create(request, response)
)

// Atualiza bairro
app.post('/update/:docID',
  (request, response, next) => validateNeighborhood(request, response, next),
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new NeighborhoodController().update(request, response)
)

// Remove bairro
app.post('/delete/:docID',
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new NeighborhoodController().delete(request, response)
)

export const neighborhoodsRouter = app;