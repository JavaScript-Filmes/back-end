import { Request, Response } from "express";
import { clienteSchema } from "../models/ClienteSchema";

class ClienteController {
  async listar(request: Request, response: Response) {
    try {
      const catalogo = await clienteSchema.find();
      response
        .status(200)
        .json({ data: catalogo, error: false, msg: "Clientes encontrados" });
    } catch (error) {
      response
        .status(400)
        .json({ error: true, msg: "Não foi possível encontrar clientes" });
    }
  }

  async cadastrar(request: Request, response: Response) {
    try {
      const catalogo = await clienteSchema.create(request.body);
      response.status(201).json({ data: catalogo });
    } catch (error) {
      response.status(400).json({ data: `${error.message}` });
    }
  }
}

export { ClienteController };
