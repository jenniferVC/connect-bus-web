export class NeighborhoodNameNotInformedError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super("Nome do bairro nao foi informado");
    // 'name' é o nome do erro
    this.name = "neighborhood-name-not-informed";
    this.code = 500;
  }
}