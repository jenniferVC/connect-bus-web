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

export const paradasRouter = app;
