// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Neighborhood } from './model.js';


export class NeighborhoodController {
  #instance;

  /**
   * 
   * @param {Neighborhood} instance 
   */
  constructor(instance) {
    // Singleton
    this.#instance = instance || new Neighborhood();
  }

  listAll(request, response) {
    return this.#instance.listAll().then(neighborhoods => {
      response.json(neighborhoods);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  findByName(request, response) {
    this.#instance.name = request.name;

    return this.#instance.findByName().then(neighborhoods => {
      response.json(neighborhoods);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}