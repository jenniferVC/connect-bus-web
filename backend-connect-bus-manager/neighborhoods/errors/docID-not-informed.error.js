export class NeighborhoodDocIDNotInformedError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super("docID do bairro nao informado");
    // 'name' é o nome do erro
    this.name = "neighborhood-docID-not-informed";
    this.code = 500;
  }
}