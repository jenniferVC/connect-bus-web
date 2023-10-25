import { NeighborhoodDocIDNotInformedError } from './errors/docID-not-informed.error.js';
import { NeighborhoodNameNotInformedError } from './errors/name-not-informed.error.js';
import { NeighborhoodNotFoundError } from './errors/neighborhood-not-found.error.js';
import { NeighborhoodRepository } from './repository.js';
// Camada de Modelo 
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

export class Neighborhood {
  docID;
  nome;
  // Hashtag '#' na frente do atributo pois o JS entende que ele é privado 
  #instanceRepository;

  /**
   * 
   * @param {NeighborhoodRepository} instanceRepository 
   */
  constructor(instanceRepository) {
    // Singleton
    this.#instanceRepository = instanceRepository || new NeighborhoodRepository();
  }

  listAll() {
    return this.#instanceRepository.listAll();
  }

  findByName() {
    if (!this.nome) {
      return Promise.reject(new NeighborhoodNameNotInformedError)
    }
    return this.#instanceRepository.findByName(this.nome);
  }

  findByDocID() {
    if (!this.docID) {
      return Promise.reject(new NeighborhoodDocIDNotInformedError());
    }

    return this.#instanceRepository.findByDocID(this.docID).then(neighborhood => {
      if (!neighborhood) {
        return Promise.reject(new NeighborhoodNotFoundError());
      }
      // this.docID = neighborhood.docID;
      this.nome = neighborhood.nome;
    })
  }

  create(params) {
    this.nome = params.nome;
    return this.#instanceRepository.create(this).then(response => {
      this.docID = response.id;
    })
  }

  update(params) {
    this.nome = params.nome;
    return this.findByDocID().then(() => {
      return this.#instanceRepository.update(this);
    })
  }

  delete(){
    return this.findByDocID().then(() => {
      return this.#instanceRepository.delete(this.docID);
    })
  }
}