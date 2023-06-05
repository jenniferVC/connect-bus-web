export class NeighborhoodNotFoundError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super("Bairro nao encontrado");
    // 'name' é o nome do erro
    this.name = "neighborhood-not-found";
    this.code = 404;
  }
}