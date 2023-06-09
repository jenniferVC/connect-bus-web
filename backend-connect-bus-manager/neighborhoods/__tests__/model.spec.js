
import { NeighborhoodDocIDNotInformedError } from "../errors/docID-not-informed.error.js";
import { NeighborhoodNameNotInformedError } from "../errors/name-not-informed.error.js";
import { NeighborhoodNotFoundError } from "../errors/neighborhood-not-found.error.js";
import { Neighborhood } from "../model.js"

// Função 'describe()' agrupa varios testes.
// Mais informações: https://jestjs.io/pt-BR/docs/api#describename-fn
describe("Neighborhood model", () => {
  const neighborhoodRepositoryMock = {
    findByName: () => Promise.resolve([{ name: "name1" }, { name: "name2" }])
  }

  //#region Testing findByName()
  describe("given find neighborhood by name", () => {

    // ------- When Fail ------------------

    test("when name is not informed, then return error 500", async () => {
      const model = new Neighborhood();
      const response = model.findByName();

      // .toBeInstanceOf(Class) para verificar que um objeto é uma instância de uma classe.
      await expect(response).rejects.toBeInstanceOf(NeighborhoodNameNotInformedError);
    })

    // ------- When Success ------------------

    test("when name is informed, then return neighborhoods", async () => {
      // No construtor de Neighborhood() é passado um falso repository, pois nao precisamos usar o repositorio
      // real para realizar testes, pois o foco é testar o Modelo Neighborhood() e nao o arquivo Repository 
      const model = new Neighborhood(neighborhoodRepositoryMock);
      model.name = "anyName";
      const response = model.findByName();

      // .toBeInstanceOf(Class) para verificar que um objeto é uma instância de uma classe.
      await expect(response).resolves.toEqual([{ name: "name1" }, { name: "name2" }]);
    })

  })
  //#endregion Testing findByName()

  //#region Testing findByDocID()
  describe('given find neighborhood by docID', () => {
    
    // ------- When Success ------------------

    test('then return neighborhood', async () => {
      const exampleNeighborhood = createExampleNeighborhood();
      const model = new Neighborhood({
        findByDocID: () => Promise.resolve(exampleNeighborhood)
      });
      model.docID = "anyID";
      await model.findByDocID();
      expect(model).toEqual(exampleNeighborhood)
    })

    // ------- When Fail ------------------

    test('when docID not present, then return error 500', async () => {
      const model = new Neighborhood();
      await expect(model.findByDocID()).rejects.toBeInstanceOf(NeighborhoodDocIDNotInformedError);
    })

    test('when neighborhood not found, then return error 404', async () => {
      const model = new Neighborhood({
        findByDocID: () => Promise.resolve(null)
      });
      model.docID = "any";
      await expect(model.findByDocID()).rejects.toBeInstanceOf(NeighborhoodNotFoundError);
    })

    function createExampleNeighborhood() {
      const neighborhood = new Neighborhood();
      neighborhood.docID = "anyID";
      neighborhood.name = "anyName";
      return neighborhood;
    }
  })
  //#endregion Testing findByDocID()

  //#region Testing create()
  // describe('given create new neighborhood', () => {
  //   // const params = {
  //   //   docID: "anyDocId",
  //   //   name: "anyName"
  //   // }

  //   const repositoryMock = {
  //     _hasSaved: false,
  //     create() {
  //       this._hasSaved = true;
  //       return Promise.resolve({ docID: "anyDocId"});
  //     }
  //   }

  //   test('then return new neighborhood', async () => {
  //     const model = new Neighborhood(repositoryMock);
  //     await model.create(params);
  //     const newNeighborhood = createNeighborhood();
  //     expect(model).toEqual(newNeighborhood);
  //   })
  // })
  //#endregion Testing create()

  //#region Testing update()
  describe('given update neighborhood', () => {
    let repositoryMock;
    beforeEach(() => {
      repositoryMock = {
        _hasUpdated: false,
        update() {
          this._hasUpdated = true;
          return Promise.resolve();
        }
      }
    })

    // ------- When Success ------------------

    test('then return updated neighborhood', async () => {
      const model = new Neighborhood(repositoryMock);
      model.docID = "anyDocId";

      const params = createNeighborhood();
      await model.update(params);

      const updatedNeighborhood = createNeighborhood();
      expect(model).toEqual(updatedNeighborhood);
    })

    test('then update neighborhood', async () => {
      const model = new Neighborhood(repositoryMock);
      model.docID = "anyDocId";

      const params = createNeighborhood();
      await model.update(params);

      expect(repositoryMock._hasUpdated).toBeTruthy();
    })


    // ------- When Fail ------------------

    // test('when neighborhood doesnt exist, then return not found error', async () => {
    //   const model = new Neighborhood(repositoryMock);
    //   model.docID = "anyDocId";

    //   const params = createNeighborhood();
    //   await model.update(params);

    // })
  })
  //#endregion Testing update()


  function createNeighborhood() {
    const neighborhood = new Neighborhood();
    neighborhood.docID = "anyDocId";
    neighborhood.name = "anyName";
    return neighborhood;
  }
})