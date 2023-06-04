// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Neighborhood } from './model.js';


export class NeighborhoodController {
  listAll(request, response) {
    const neighborhood = new Neighborhood();

    neighborhood.listAll().then(neighborhoods => {
      response.json(neighborhoods);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  findByName(request, response){
    const neighborhood = new Neighborhood();
    // neighborhood.name = request.name;

    neighborhood.findByName().then(neighborhoods => {
      response.json(neighborhoods);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}