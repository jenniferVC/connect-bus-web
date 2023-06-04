import admin from 'firebase-admin';
import { NeighborhoodRepository } from './repository.js';
// Camada de Modelo 
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

export class Neighborhood {
  name;
  // Hashtag '#' na frente do atributo pois o JS entende que ele é privado 
  #repository;

  constructor() {
    this.#repository = new NeighborhoodRepository();
  }

  listAll() {
    return this.#repository.listAll();
  }

  findByName() {
    if (!this.name) {
      return Promise.reject({
        code: 500,
        message: "Nome de neighborhood nao informado"
      })
    }

    return this.#repository.findByName(this.name);
  }
}