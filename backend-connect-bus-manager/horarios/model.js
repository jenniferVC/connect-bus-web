// Camada de Modelo
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

import { BadRequestError } from "../neighborhoods/errors/bad-request.error.js";
import { HorarioRepository } from "./repository.js";

export class Horario {
  docID;
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
    this.#instanceRepository = instanceRepository || new HorarioRepository();
  }

  listAll() {
    try {
      return this.#instanceRepository.listAll();
    } catch (error) {
      return Promise.reject(new BadRequestError("Erro ao listas: " + error));
    }
  }

  create(params) {
    this.nome = params.nome;
    this.linha = params.linha;
    this.diaDeFuncionamento = params.diaDeFuncionamento;
    this.bairros = params.bairros;
    this.horaPartidaBairro = params.horaPartidaBairro;
    this.horaPartidaRodoviaria = params.horaPartidaRodoviaria;

    try {
      return this.#instanceRepository
        .create(this)
        .then((response) => (this.docID = response.id));
    } catch (error) {
      return Promise.reject(
        new BadRequestError("Erro ao cadastrar horario: " + error)
      );
    }
  }
}
