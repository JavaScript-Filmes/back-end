import { Request, Response } from "express";
import locacaoSchema from "../models/LocacaoSchema";
import filmeSchema from "../models/FilmeSchema";

class LocacaoController {
  async listar(request: Request, response: Response) {
    try {
      const catalogo = await locacaoSchema.find();
      response.status(200).json(catalogo);
      // .json({ data: catalogo, error: false, msg: "Locações encontradas" });
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível localizar as locações",
      });
    }
  }

  async listarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const catalogo = await locacaoSchema.find({ _id: id });
      response.status(201).json(catalogo);
      // .json({ data: catalogo, error: false, msg: "Locação encontrado" });
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível localizar esta locação",
      });
    }
  }

  async cadastrar(request: Request, response: Response) {
    try {
      const list = await filmeSchema.findById({ _id: request.body.filme });

      if (list && list.status === "DISPONÍVEL") {
        try {
          await filmeSchema.updateOne(
            { _id: request.body.filme },
            { $set: { status: "LOCADO" } }
          );

          const catalogo = await locacaoSchema.create(request.body);

          response.status(201).json(catalogo);
          // .json({
          //   data: catalogo,
          //   error: false,
          //   msg: "Locação cadastrada com sucesso",
          // });
        } catch (error) {
          response.status(400).json({
            error: true,
            msg: "Erro! Não foi possível realizar este cadastro de locação.",
          });
        }
      } else {
        response.status(409).json({
          error: true,
          msg: "Erro! Este filme não pode ser locado no momento.",
        });
      }
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível buscar o filme.",
      });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const { id } = request.params;

      let res: any;

      res = await locacaoSchema.find({ _id: id });

      try {
        await filmeSchema.updateOne(
          { _id: res[0].filme.join() },
          { $set: { status: "DISPONÍVEL" } }
        );

        try {
          const catalogo = await locacaoSchema.findByIdAndDelete(id);
          response.status(201).json(catalogo);
        } catch (er) {
          console.log(er);
        }
      } catch (error) {
        response.status(400).json({
          data: error.message,
          error: true,
          msg: "Não foi possível excluir esta locação",
        });
      }
    } catch (error) {
      response.status(400).json({
        data: error.message,
        error: true,
        msg: "Não foi possível buscar o filme.",
      });
    }
  }

  async editar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const body = request.body;

      let filmeAtual: any;

      filmeAtual = await locacaoSchema.find({ _id: id });

      await filmeSchema.updateOne(
        { _id: filmeAtual[0].filme.join() },
        { $set: { status: "DISPONÍVEL" } }
      );

      let filmeNovo: any;

      filmeNovo = request.body.filme;

      await filmeSchema.updateOne(
        { _id: filmeNovo },
        { $set: { status: "LOCADO" } }
      );

      await locacaoSchema.findOneAndUpdate({ _id: id }, body, {
        returnOriginal: false,
        useFindAndModify: false,
      });

      response.status(204).json({});
    } catch (error) {
      response.status(400).json({
        error: true,
        data: error.message,
        msg: "Não foi possível concluir esta edição.",
      });
    }
  }
}

export { LocacaoController };
