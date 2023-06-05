import { NeighborhoodController } from "../controller.js";

describe('Neighborhood controller', () => {

  let request;
  let response;

  // Antes de cada teste
  beforeEach(() => {
    request = {};
    response = new ResponseMock();
  })

  test('given find neighborhood by name, when success, the return neighborhoods', (done) => {
    const controller = new NeighborhoodController({
      findByName: () => Promise.resolve([{name: "name1"}, {name: "name2"}])
    });

    controller.findByName(request, response).then((done) => {
      expect(response._json).toEqual([{name: "name1"}, {name: "name2"}]);
      
      // Função responsável por finalizar o teste, pois a função findByName() é async
      // tendo isso em vista, depois que findByName() retorna um erro é que o teste é finalizado.
      done();
    })
  })

  class ResponseMock {
    _json = null;
    json(value) {
      this._json = value;
    }
    status(value) {
      return this;
    }
  }
})