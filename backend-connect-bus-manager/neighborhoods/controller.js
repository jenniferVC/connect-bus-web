// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Neighborhood } from './model.js';


export class NeighborhoodController {
  #instance;

  /**
   * Construtor de NeighborhoodController com Singleton
   * @param {Neighborhood} instance 
   */
  constructor(instance) {
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

  findByDocID(request, response) {
    this.#instance.docID = request.params.docID;

    return this.#instance.findByDocID().then(() => {
      response.status(200).json(this.#instance);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  create(request, response) {
    return this.#instance.create(request.body).then(() => {
      response.status(200).json(this.#instance);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  update(request, response) {
    this.#instance.docID = request.params.docID;

    return this.#instance.update(request.body).then(() => {
      response.status(200).json(this.#instance);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  delete(request, response) {
    this.#instance.docID = request.params.docID;

    return this.#instance.delete().then(() => {
      response.status(200);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}