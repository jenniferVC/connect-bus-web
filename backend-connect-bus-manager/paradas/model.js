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

    this.findBairroByName(this.bairro).then(
      (docIdBairro) => {

        this.#instanceRepository
        .create(this, docIdBairro)
        .then((response) => {
          this.docID = response.id;
          
          this.#instanceRepository.generateIdParada(docIdBairro,this.docID);
        });
      }
    );
    return this;
  }

 /**
  * Verificando se existe um bairro com o nome idêntico ao informado pelo usuário.
  * @param {string} nomeBairro 
  * @returns 
  */
  findBairroByName(nomeBairro) {
    let neighborhoodRepository = new NeighborhoodRepository();
    return neighborhoodRepository.findByEqualName(nomeBairro).then((documents) => {
      if (documents.length === 0) {
        return Promise.reject(new NeighborhoodNotFoundError());
      }
      documents.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        return doc.id;
      });
    });
  }
}
