// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Parada } from "./model.js";

export class ParadaController {
  #instanceParada;

  /**
   * Construtor de ParadaController com Singleton
   * @param {Parada} instanceParada 
   */
  constructor(instanceParada) {
    this.#instanceParada = instanceParada || new Parada();
  }

  listAll(request, response) {
    return this.#instanceParada.listAll().then(paradas => {
      response.json(paradas);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  create(request, response) {
    return this.#instanceParada.create(request.body).then(() => {
      response.status(200).json(this.#instanceParada);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}