export class NeighborhoodNameNotInformedError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super();
    // 'name' é o nome do erro
    this.name = "neighborhood-name-not-informed";
    this.message = "Nome do bairro nao foi informado";
    this.code = 500;
  }
}