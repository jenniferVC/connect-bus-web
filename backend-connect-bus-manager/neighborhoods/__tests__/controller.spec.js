import { NeighborhoodController } from '../controller.js';

// Função 'describe()' agrupa varios testes.
// Mais informações: https://jestjs.io/pt-BR/docs/api#describename-fn
describe('Neighborhood controller', () => {
  let request;
  let response;

  // Antes de cada teste
  beforeEach(() => {
    request = {};
    response = new ResponseMock();
  })

  // Testing findByName()
  describe('given find neighborhoods by name', () => {
    test('when success, then return neighborhood', (done) => {
      const neighborhoods = [{ name: "name1" }, { name: "name2" }];

      const controller = new NeighborhoodController({
        findByName: () => Promise.resolve(neighborhoods)
      });

      controller.findByName(request, response).then(() => {
        expect(response._json).toEqual(neighborhoods)

        // Função done() responsável por finalizar o teste, pois a função findByName() é async
        // tendo isso em vista, depois que findByName() retorna um erro é que o teste é finalizado.
        done();
      })
    })

    test('when fail, then return error', (done) => {
      const error = { code: 500 };
      const controller = new NeighborhoodController({
        findByName: () => Promise.reject(error)
      });

      controller.findByName(request, response).then(() => {
        expect(response._json).toEqual(error);
        done();
      })
    })

    test('when fail, then return error status 500', (done) => {
      const error = { code: 500 };
      const controller = new NeighborhoodController({
        findByName: () => Promise.reject(error)
      });

      controller.findByName(request, response).then(() => {
        expect(response._status).toEqual(500);
        done();
      })
    })
  })

  class ResponseMock {
    _json = null;
    _status = 0;
    json(value) {
      this._json = value;
    }
    status(value) {
      this._status = value;
      return this;
    }
  }

})