// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Neighborhood } from './model.js';


export class NeighborhoodController {
  #instanceNeighborhood;

  /**
   * Construtor de NeighborhoodController com Singleton
   * @param {Neighborhood} instanceNeighborhood 
   */
  constructor(instanceNeighborhood) {
    this.#instanceNeighborhood = instanceNeighborhood || new Neighborhood();
  }

  listAll(request, response) {
    return this.#instanceNeighborhood.listAll().then(neighborhoods => {
      response.json(neighborhoods);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  findByName(request, response) {
    this.#instanceNeighborhood.nome = request.nome;
          console.log('buscando bairro pelo nome');


    // return this.#instanceNeighborhood.findByName().then(neighborhoods => {
    //   response.json(neighborhoods);
    // }).catch(error => {
    //   response.status(error.code).json(error);
    // })
  }

  findByDocID(request, response) {
    this.#instanceNeighborhood.docID = request.params.docID;

    return this.#instanceNeighborhood.findByDocID().then(() => {
      response.status(200).json(this.#instanceNeighborhood);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  create(request, response) {
    return this.#instanceNeighborhood.create(request.body).then(() => {
      response.status(200).json(this.#instanceNeighborhood);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  update(request, response) {
    this.#instanceNeighborhood.docID = request.params.docID;
    this.#instanceNeighborhood.nome = request.params.nome;

    return this.#instanceNeighborhood.update(request.body).then(() => {
      response.status(200).json(this.#instanceNeighborhood);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  delete(request, response) {
    this.#instanceNeighborhood.docID = request.params.docID;

    return this.#instanceNeighborhood.delete().then(() => {
      response.status(200).json({message: "Bairro deletado com sucesso"});
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}