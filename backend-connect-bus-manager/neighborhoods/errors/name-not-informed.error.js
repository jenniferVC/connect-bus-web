export class NameNotInformedError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super("Nome nao informado");
    // 'name' é o nome do erro
    this.name = "name-not-informed";
    this.code = 500;
  }
}