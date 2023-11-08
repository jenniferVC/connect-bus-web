import { NeighborhoodDocIDNotInformedError } from './errors/docID-not-informed.error.js';
import { NeighborhoodNotFoundError } from './errors/neighborhood-not-found.error.js';
import { NeighborhoodSameNameError } from './errors/same-name.error.js';
import { NeighborhoodRepository } from './repository.js';
// Camada de Modelo 
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

export class Neighborhood {
  docID;
  nome;
  numBairro;
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
    return this.#instanceRepository.findByName(this.nome);
  }

  findByEqualName(){
    return this.#instanceRepository.findByEqualName(this.nome).then((documents) => {
      if (documents.length > 0) {
        return Promise.reject(new NeighborhoodSameNameError());
      }
    })
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

    this.#instanceRepository.qtdBairros().then(count => this.numBairro = count);

    return this.findByEqualName().then(() =>{
     this.#instanceRepository.create(this).then(response => this.docID = response.id);
    })
  }

  update(params) {
    return this.findByDocID().then(() => {
      this.nome = params.nome;
      return this.findByEqualName().then(() => {
        return this.#instanceRepository.update(this);
      });
    })
  }

  delete(){
    console.log("delete: ",this);
    return this.findByDocID().then(() => {
      return this.#instanceRepository.delete(this.docID);
    })
  }
}