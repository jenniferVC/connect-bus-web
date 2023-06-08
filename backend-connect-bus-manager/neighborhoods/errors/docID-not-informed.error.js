export class NeighborhoodDocIDNotInformedError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super();
    // 'name' é o nome do erro
    this.name = "neighborhood-docID-not-informed";
    this.message = "docID do bairro nao informado";
    this.code = 500;
  }
}