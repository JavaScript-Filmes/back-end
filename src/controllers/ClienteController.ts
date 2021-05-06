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
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível encontrar clientes",
      });
    }
  }

  async cadastrar(request: Request, response: Response) {
    try {
      const list = await clienteSchema.find();

      const isListed = list.find(
        (data: any) => data.usuario === request.body.usuario
      );

      if (!isListed) {
        const result = await clienteSchema.create(request.body);
        response.status(201).json({
          data: result,
          error: false,
          msg: "Cadastro efetuado com sucesso",
        });
      } else {
        response.status(409).json({
          error: true,
          msg: "Erro! Este usuário já está em nossa base de dados.",
        });
      }
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Erro ao realizar este cadastro",
      });
    }
  }
}

export { ClienteController };
