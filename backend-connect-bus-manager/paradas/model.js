// Camada de Modelo
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

import { NeighborhoodNotFoundError } from "../neighborhoods/errors/neighborhood-not-found.error.js";
import { NeighborhoodRepository } from "../neighborhoods/repository.js";
import { ParadaRepository } from "./repository.js";

export class Parada {
  docID;
  id;
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
}
