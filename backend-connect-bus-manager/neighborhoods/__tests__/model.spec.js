
import { NameNotInformedError } from "../errors/name-not-informed.error.js";
import { Neighborhood } from "../model.js"

// Função 'describe()' agrupa varios testes.
// Mais informações: https://jestjs.io/pt-BR/docs/api#describename-fn
describe("Neighborhood model", () => {
  test("given find neighborhood by name, when name is not informed, then return error 500", async () => {
     const model = new Neighborhood();

     const response = model.findByName();

     // .toBeInstanceOf(Class) para verificar que um objeto é uma instância de uma classe.
     await expect(response).rejects.toBeInstanceOf(NameNotInformedError);
  })
})