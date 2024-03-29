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

  findByDocID(request, response) {
    this.#instanceParada.docID = request.params.docID;

    return this.#instanceParada
      .findByDocID()
      .then(() => {
        response.status(200).json(this.#instanceParada);
      })
      .catch((error) => {
        response.status(error.code).json(error);
      });
  }

  update(request, response) {
    this.#instanceParada.docID = request.params.docID;
    // this.#instanceParada.bairro = request.body.bairro;
    // this.#instanceParada.latitude = request.params.latitude;
    // this.#instanceParada.longitude = request.params.longitude;

    return this.#instanceParada
      .update(request.body)
      .then(() => {
        response.status(200).json(this.#instanceParada);
      })
      .catch((error) => {
        response.status(error.code).json(error);
      });
  }

  findByBairro(request, response) {
    this.#instanceParada.bairro = request.params.bairro;

    return this.#instanceParada.findByBairro().then(paradas => {
      response.json(paradas);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  delete(request, response) {
    this.#instanceParada.docID = request.params.docID;

    return this.#instanceParada.delete().then(() => {
      response.status(200).json({message: "Parada deletado com sucesso"});
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}