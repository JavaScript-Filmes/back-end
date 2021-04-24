import { Router } from "express";
import { FilmeController } from "../controllers/FilmeController";
import { LocacaoController } from "../controllers/LocacaoController";

const router = Router();
const filmeController = new FilmeController();
const locacaoController = new LocacaoController();

// Rotas endpoint de filmes
router.get("/", filmeController.listar);
router.get("/catalogo/listar-filme/:id", filmeController.listarPorId);
router.post("/catalogo/cadastrar-filme", filmeController.cadastrar);
router.delete("/catalogo/excluir-filme", filmeController.excluir);
router.put("/catalogo/editar-filme", filmeController.editar);

// Rotas endpoints de locação
router.get("/catalogo/locacao", locacaoController.listar);
router.get("/catalogo/listar-locacao/:id", locacaoController.listarPorId);
router.post("/catalogo/cadastrar-locacao", locacaoController.cadastrar);
router.delete("/catalogo/excluir-locacao", filmeController.excluir);
router.put("/catalogo/editar-locacao", locacaoController.editar);

export { router };
