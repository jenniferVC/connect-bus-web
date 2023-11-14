import { BadRequestError } from "../../neighborhoods/errors/bad-request.error.js";

export function validateParada(request, response, next) {
  const bairro = request.body.bairro;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;

  if (!bairro) {
    return response
      .status(400)
      .json(new BadRequestError("Bairro não informado"));
  }
  if (!latitude) {
    return response
      .status(400)
      .json(new BadRequestError("Latitude não informado"));
  }
  if (!longitude) {
    return response
      .status(400)
      .json(new BadRequestError("Longitude não informado"));
  }

  next();
}
