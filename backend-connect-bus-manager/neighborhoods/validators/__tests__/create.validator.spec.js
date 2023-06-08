import { NeighborhoodController } from "../../controller.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { validateCreateNeighborhood } from "../create.validator.js"

// Teste que valida a criação do bairro
describe('Create neighborhood validator', () => {
  let request;
  let response;

  // Antes de cada teste
  beforeEach(() => {
    request = { body: { name: "Vila" } };
    response = new ResponseMock();
  })

  // ------- When Success ------------------

  test('given neighborhood is valid, then go to next step', () => {
    let hasCalledNext = false;
    const next = () => { hasCalledNext = true; }
    validateCreateNeighborhood(request, response, next);
    expect(hasCalledNext).toBeTruthy();
  })


  // ------- When Fail ------------------

  test('given name not informed, then return error 400', () => {
    request.body.name = null;
    validateCreateNeighborhood(request, response);
    expect(response._status).toEqual(400);
  })

  test('given name not informed, then return error json', () => {
    request.body.name = null;
    validateCreateNeighborhood(request, response);
    expect(response._json).toBeInstanceOf(BadRequestError);
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