import { Request, Response } from "express";
import { filme } from "../models/FilmeSchema";

class FilmeController {
  async listar(request: Request, response: Response) {
    try {
      const catalogo = await filme.find();
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
      const catalogo = await filme.find({ _id: id });
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
      const catalogo = await filme.create(request.body);
      response.status(201).json({ data: catalogo });
    } catch (error) {
      response.status(201).json({ data: `${error.message}` });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const id = request.query.id;
      const catalogo = await filme.findByIdAndDelete(id);
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

      const result = await filme.findById(id);
      result.genero = body.genero;
      result.status = body.status;
      result.descricao = body.descricao;
      result.duracao = body.duracao;
      result.titulo = body.titulo;

      const catalogo = await filme.updateOne(id, result);

      response.status(204).json({
        data: catalogo,
        error: false,
        msg: "Filme editado com sucesso",
      });
    } catch (error) {
      response.status(201).json({ error: `${error.message}` });
    }
  }
}

export { FilmeController };
