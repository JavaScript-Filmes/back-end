import { Request, Response } from "express";
import favoritoSchema from "../models/FavoritoSchema";

class FavoritoController {
  async cadastrar(request: Request, response: Response) {
    try {
      const catalogo = await favoritoSchema.create(request.body);
      response.status(201).json({ data: catalogo });
    } catch (error) {
      response.status(400).json({ data: `${error.message}` });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const id = request.query.id;
      const catalogo = await favoritoSchema.findByIdAndDelete(id);
      response.status(201).json({
        data: catalogo,
        error: false,
        msg: "Filme favorito excluído com sucesso",
      });
    } catch (error) {
      response.status(400).json({
        error: true,
        msg: "Não foi possível excluir o filme favorito",
      });
    }
  }
}

export { FavoritoController };
