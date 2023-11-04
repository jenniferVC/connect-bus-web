export class NeighborhoodSameNameError extends Error {
  constructor(){
    // 'super' chama o construtor da classe Pai
    super();
    // 'name' é o nome do erro
    this.name = "neighborhood-same-name";
    this.message = "Nome já cadastrado";
    this.code = 500;
  }
}