export class BadRequestError extends Error {
  constructor(description){
    // 'super' chama o construtor da classe Pai
    super();
    // 'name' é o nome do erro
    this.name = "bad-request";
    this.message = description;
    this.code = 400;
  }
}