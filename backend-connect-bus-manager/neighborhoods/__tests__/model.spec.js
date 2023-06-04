
import { NameNotInformedError } from "../errors/name-not-informed.error.js";
import { Neighborhood } from "../model.js"

// Função 'describe()' agrupa varios testes.
// Mais informações: https://jestjs.io/pt-BR/docs/api#describename-fn
describe("Neighborhood model", () => {

  const neighborhoodRepositoryMock = {
    findByName: () => Promise.resolve([{ name: "name1" }, { name: "name2" }])
  }

  describe("given find neighborhood by name", () => {
    test("when name is not informed, then return error 500", async () => {
      const model = new Neighborhood();
      const response = model.findByName();

      // .toBeInstanceOf(Class) para verificar que um objeto é uma instância de uma classe.
      await expect(response).rejects.toBeInstanceOf(NameNotInformedError);
    })

    test("when name is informed, then return neighborhoods", async () => {
      // No construtor de Neighborhood() é passado um falso repository, pois nao precisamos usar o repositorio
      // real para realizar testes, pois o foco é testar o Modelo Neighborhood() e nao o seu repositorio 
      const model = new Neighborhood(neighborhoodRepositoryMock);
      model.name = "anyName";
      const response = model.findByName();

      // .toBeInstanceOf(Class) para verificar que um objeto é uma instância de uma classe.
      await expect(response).resolves.toEqual([{ name: "name1" }, { name: "name2" }]);
    })

  })
})