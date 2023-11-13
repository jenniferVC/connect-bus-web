// Camada de Modelo
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

import { BadRequestError } from "../neighborhoods/errors/bad-request.error.js";
import { HorarioRepository } from "./repository.js";


export class Horario {
  linha;
  bairros;
  diaDeFuncionamento;
  horaPartidaBairro;
  horaPartidaRodoviaria;
  // Hashtag '#' na frente do atributo pois o JS entende que ele é privado
  #instanceRepository;

  /**
   *
   * @param {HorarioRepository} instanceRepository
   */
  constructor(instanceRepository) {
    // Singleton
    this.#instanceRepository =
      instanceRepository || new HorarioRepository();
  }

  async listAll() {
    try {
      return this.#instanceRepository.listAll();
    } catch (error) {
      return Promise.reject(new BadRequestError("Erro ao listas: " + error));
    }
  }
}