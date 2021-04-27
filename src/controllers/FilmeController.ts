import { Request, Response } from "express";
import { filmeSchema } from "../models/FilmeSchema";

class FilmeController {
  async listar(request: Request, response: Response) {
    try {
      const catalogo = await filmeSchema.find();
      response
        .status(200)
        .json({ data: catalogo, error: false, msg: "Filmes encontrados" });
    } catch (error) {
      response
        .status(400)
        .json({ error: true, msg: "Não foi possível encontrar filmes" });
    }
  }

  async listarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const catalogo = await filmeSchema.find({ _id: id });
      response
        .status(201)
        .json({ data: catalogo, error: false, msg: "Filme encontrado" });
    } catch (error) {
      response
        .status(400)
        .json({ error: true, msg: "Não foi possível encontrar este filme" });
    }
  }

  async cadastrar(request: Request, response: Response) {
    try {
      const catalogo = await filmeSchema.create(request.body);
      response.status(201).json({ data: catalogo });
    } catch (error) {
      response.status(400).json({ data: `${error.message}` });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const id = request.query.id;
      const catalogo = await filmeSchema.findByIdAndDelete(id);
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

      const catalogo = await filmeSchema.findOneAndUpdate(id, body, {
        returnOriginal: false,
        useFindAndModify: false,
      });

      response.status(204).json({
        data: catalogo,
        error: false,
        msg: "Locação editada com sucesso",
      });
    } catch (error) {
      response.status(400).json({ error: `${error.message}` });
    }
  }
}

export { FilmeController };
