import { NeighborhoodController } from "../controller.js";
import { BadRequestError } from "../errors/bad-request.error.js";

/**
 * 
 * @param {Request} request 
 * @param {Response} response 
 * @param {()=>{}} next 
 * @returns 
 */
export function validateNeighborhood(request, response, next) {
  const name = request.body.name;
  if (!name) {
    return response.status(400).json(new BadRequestError("Nome nao informado"));
  }


  // TODO: Precisa verificar de ao criar um bairro, o nome que for informado já existe no banco.
  // Isso é necessário para evitar duplicações no banco.
  next();
}