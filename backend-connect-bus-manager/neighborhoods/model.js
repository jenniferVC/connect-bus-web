import { NameNotInformedError } from './errors/name-not-informed.error.js';
import { NeighborhoodRepository } from './repository.js';
// Camada de Modelo 
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

export class Neighborhood {
  name;
  // Hashtag '#' na frente do atributo pois o JS entende que ele é privado 
  #instanceRepository;

  // Singleton
  constructor(instanceRepository) {
    this.#instanceRepository = instanceRepository || new NeighborhoodRepository();
  }

  listAll() {
    return this.#instanceRepository.listAll();
  }

  findByName() {
    if (!this.name) {
      return Promise.reject(new NameNotInformedError)
    }

    return this.#instanceRepository.findByName(this.name);
  }
}