import { Request, Response } from "express";
import favoritoSchema from "../models/FavoritoSchema";

class FavoritoController {
  async listar(request: Request, response: Response) {
    try {
      const catalogo = await favoritoSchema.find();
      response.status(200).json(catalogo);
      // .json({ data: catalogo, error: false, msg: "Favoritos encontrados" });
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível efetuar esta solicitação",
      });
    }
  }

  async cadastrar(request: Request, response: Response) {
    try {
      const catalogo = await favoritoSchema.create(request.body);
      response.status(201).json(catalogo);
      // .json({
      //   data: catalogo,
      //   error: false,
      //   msg: "Favoritado com sucesso",
      // });
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Erro ao favoritar",
      });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const catalogo = await favoritoSchema.findByIdAndDelete(id);
      response.status(201).json(catalogo);
      // .json({
      //   data: catalogo,
      //   error: false,
      //   msg: "Filme favorito excluído com sucesso",
      // });
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível excluir o filme favorito",
      });
    }
  }
}

export { FavoritoController };
