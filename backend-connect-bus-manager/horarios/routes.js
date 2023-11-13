import express from "express";
import admin from "firebase-admin";
import { authenticateToken } from "../middlewares/authenticate-jwt.js";
import { HorarioController } from "./controller.js";
import { validateHorario } from "./validators/horario.validator.js";
import { Horario } from "./model.js";
import { HorarioRepository } from "./repository.js";

const app = express();

// Lista os Horarios
app.get(
  "/",
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  (request, response) => new HorarioController().listAll(request, response)
);

// Adiciona horario
app.post(
  "/novo",
  (request, response, next) => validateHorario(request, response, next),
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
    (request, response) => new HorarioController().create(request, response)
);

// Busca horario pelo Id do Document
app.get(
  "/:docID",
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  async (request, response) => {
    const horarioRepository = new HorarioRepository();
    horarioRepository.findByDocID(request.params.docID);
    response.json("test");
  }
);

export const horariosRouter = app;
