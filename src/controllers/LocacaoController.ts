import { Request, Response } from "express";
import locacaoSchema from "../models/LocacaoSchema";

class LocacaoController {
  async listar(request: Request, response: Response) {
    try {
      const catalogo = await locacaoSchema.find();
      response
        .status(200)
        .json({ data: catalogo, error: false, msg: "Locações encontradas" });
    } catch (error) {
      response
        .status(400)
        .json({ error: true, msg: "Não foi possível localizar as locações" });
    }
  }

  async listarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const catalogo = await locacaoSchema.find({ _id: id });
      response
        .status(201)
        .json({ data: catalogo, error: false, msg: "Locação encontrado" });
    } catch (error) {
      response
        .status(400)
        .json({ error: true, msg: "Não foi possível localizar esta locação" });
    }
  }

  async cadastrar(request: Request, response: Response) {
    try {
      const catalogo = await locacaoSchema.create(request.body);
      response.status(201).json({ data: catalogo });
    } catch (error) {
      response.status(400).json({ error: true, data: `${error.message}` });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const id = request.query.id;
      const catalogo = await locacaoSchema.findByIdAndDelete(id);
      response.status(201).json({
        data: catalogo,
        error: false,
        msg: "Filme excluído com sucesso",
      });
    } catch (error) {
      response
        .status(400)
        .json({ error: true, msg: "Não foi possível excluir o filme" });
    }
  }

  async editar(request: Request, response: Response) {
    try {
      const id = { _id: request.query.id };
      const body = request.body;

      const catalogo = await locacaoSchema.findOneAndUpdate(id, body, {
        returnOriginal: false,
        useFindAndModify: false,
      });

      response.status(204).json({
        data: catalogo,
        error: false,
        msg: "Locação editada com sucesso",
      });
    } catch (error) {
      response.status(400).json({ error: true, msg: `${error.message}` });
    }
  }
}

export { LocacaoController };
