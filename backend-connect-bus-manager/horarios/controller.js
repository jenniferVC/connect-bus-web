// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Horario } from "./model.js";

export class HorarioController {
  #instanceHorario;

  /**
   * Construtor de HorarioController com Singleton
   * @param {Horario} instanceHorario
   */
  constructor(instanceHorario) {
    this.#instanceHorario = instanceHorario || new Horario();
  }

  listAll(request, response) {
    return this.#instanceHorario
      .listAll()
      .then((horarios) => {
        response.json(horarios);
      })
      .catch((error) => {
        response.status(error.code).json(error);
      });
  }

  create(request, response) {
    return this.#instanceHorario
      .create(request.body)
      .then(() => {
        response.status(200).json(this.#instanceHorario);
      })
      .catch((error) => {
        response.status(error.code).json(error);
      });
  }
}
