export class NeighborhoodNotFoundError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super();
    // 'name' é o nome do erro
    this.name = "neighborhood-not-found";
    this.message = "Bairro nao encontrado";
    this.code = 404;
  }
}