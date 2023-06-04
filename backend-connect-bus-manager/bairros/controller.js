// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import { Bairro } from './model.js';


export class BairroController {
  listAll(request, response) {
    const bairro = new Bairro();

    bairro.listAll().then(bairros => {
      response.json(bairros);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }

  findByName(request, response){
    const bairro = new Bairro();
    // bairro.name = request.name;

    bairro.findByName().then(bairros => {
      response.json(bairros);
    }).catch(error => {
      response.status(error.code).json(error);
    })
  }
}