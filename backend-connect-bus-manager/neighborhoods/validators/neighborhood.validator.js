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
  const nome = request.body.nome;
  if (!nome) {
    return response.status(400).json(new BadRequestError("Nome não informado"));
  }


  // TODO: Precisa verificar de ao criar um bairro, o nome que for informado já existe no banco.
  // Isso é necessário para evitar duplicações no banco.
  next();
}