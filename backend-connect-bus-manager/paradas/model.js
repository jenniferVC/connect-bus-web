// Camada de Modelo
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

import { BadRequestError } from "../neighborhoods/errors/bad-request.error.js";
import { NeighborhoodNotFoundError } from "../neighborhoods/errors/neighborhood-not-found.error.js";
import { NeighborhoodRepository } from "../neighborhoods/repository.js";
import { ParadaRepository } from "./repository.js";

export class Parada {
  docID;
  longitude;
  latitude;
  bairro;
  // Hashtag '#' na frente do atributo pois o JS entende que ele é privado
  #instanceRepository;

  /**
   *
   * @param {ParadaRepository} instanceRepository
   */
  constructor(instanceRepository) {
    // Singleton
    this.#instanceRepository = instanceRepository || new ParadaRepository();
  }

  listAll() {
    return this.#instanceRepository.listAll();
  }

  create(params) {
    this.bairro = params.bairro;
    this.latitude = params.latitude;
    this.longitude = params.longitude;

    try {
      return this.#instanceRepository
        .create(this)
        .then((response) => (this.docID = response.id));
    } catch (error) {
      return Promise.reject(
        new BadRequestError("Erro ao cadastrar parada: " + error)
      );
    }
  }

  findByDocID() {
    if (!this.docID) {
      return Promise.reject(new BadRequestError("id de Parada não informado"));
    }

    return this.#instanceRepository.findByDocID(this.docID).then((parada) => {
      if (!parada) {
        return Promise.reject(new BadRequestError("Parada não encontrada"));
      }
      this.bairro = parada.bairro;
      this.latitude = parada.latitude;
      this.longitude = parada.longitude;
    });
  }

  update(params) {
    return this.findByDocID().then(() => {
      this.bairro = params.bairro;
      this.latitude = params.latitude;
      this.longitude = params.longitude;
      return this.#instanceRepository.update(this);
    });
  }

  findByBairro() {
    return this.#instanceRepository.findByBairro(this.bairro);
  }

  // delete() {
  //   console.log("delete: ", this);
  //   return this.findByDocID().then(() => {
  //     return this.#instanceRepository.delete(this.docID);
  //   });
  // }
}
