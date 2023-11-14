import { BadRequestError } from "../../neighborhoods/errors/bad-request.error.js";

export function validateHorario(request, response, next) {
  const linha = request.body.linha;
  const diaDeFuncionamento = request.body.diaDeFuncionamento;
  const bairros = request.body.bairros;
  const horaPartidaBairro = request.body.horaPartidaBairro;
  const horaPartidaRodoviaria = request.body.horaPartidaRodoviaria;

  if (!linha) {
    return response
      .status(400)
      .json(new BadRequestError("Linha não informado"));
  }
  if (!diaDeFuncionamento) {
    return response
      .status(400)
      .json(new BadRequestError("Dia de funcionamento não informado"));
  }
  if (bairros.length === 0) {
    return response
      .status(400)
      .json(new BadRequestError("Bairro não informado"));
  }
  if (horaPartidaBairro.length === 0) {
    return response
      .status(400)
      .json(new BadRequestError("Hora partida do bairro não informado"));
  }
  if (horaPartidaRodoviaria.length === 0) {
    return response
      .status(400)
      .json(new BadRequestError("Hora partida da rodoviária não informado"));
  }

  next();
}
