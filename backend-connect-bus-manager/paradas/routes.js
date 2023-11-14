import express from "express";
import admin from "firebase-admin";
import { authenticateToken } from "../middlewares/authenticate-jwt.js";
import { ParadaController } from "./controller.js";
import { validateParada } from "./validators/parada.validator.js";

const app = express();

// Lista as Paradas
app.get(
  "/",
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  async (request, response) => new ParadaController().listAll(request, response)
);

// Adiciona parada
app.post(
  "/novo",
  (request, response, next) => validateParada(request, response, next),
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  (request, response) => new ParadaController().create(request, response)
);

// Busca horario pelo Id do Document
app.get(
  "/:docID",
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  (request, response) => new ParadaController().findByDocID(request, response)
);

// Atualiza parada
app.post('/update/:docID',
  (request, response, next) => validateParada(request, response, next),
  (request, response, next) => authenticateToken(request, response, next, admin.auth()),
  (request, response) => new ParadaController().update(request, response)
)

// Busca horario pela linha
// app.get('/encontrar/:linha',
//   (request, response, next) => authenticateToken(request, response, next, admin.auth()),
//   (request, response) => new HorarioController().findByLinha(request, response)
// );

// Remove horario
// app.post('/delete/:docID',
//   (request, response, next) => authenticateToken(request, response, next, admin.auth()),
//   (request, response) => new HorarioController().delete(request, response)
// )

export const paradasRouter = app;
