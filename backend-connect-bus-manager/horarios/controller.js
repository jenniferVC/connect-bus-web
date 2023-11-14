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

  update(request, response) {
    this.#instanceHorario.docID = request.params.docID;
    this.#instanceHorario.linha = request.params.linha;
    this.#instanceHorario.diaDeFuncionamento =
      request.params.diaDeFuncionamento;
    this.#instanceHorario.bairros = request.params.bairros;
    this.#instanceHorario.horaPartidaBairro = request.params.horaPartidaBairro;
    this.#instanceHorario.horaPartidaRodoviaria =
      request.params.horaPartidaRodoviaria;

    return this.#instanceHorario
      .update(request.body)
      .then(() => {
        response.status(200).json(this.#instanceHorario);
      })
      .catch((error) => {
        response.status(error.code).json(error);
      });
  }

  findByDocID(request, response) {
    this.#instanceHorario.docID = request.params.docID;

    return this.#instanceHorario
      .findByDocID()
      .then(() => {
        response.status(200).json(this.#instanceHorario);
      })
      .catch((error) => {
        response.status(error.code).json(error);
      });
  }

  findByLinha(request, response) {
    this.#instanceHorario.linha = request.params.linha;

    return this.#instanceHorario.findByLinha().then(horarios => {
      response.json(horarios);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}
