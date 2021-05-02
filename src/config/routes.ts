import { Router } from "express";
import { FilmeController } from "../controllers/FilmeController";
import { LocacaoController } from "../controllers/LocacaoController";
import { ClienteController } from "../controllers/ClienteController";
import { FavoritoController } from "../controllers/FavoritoController";

const router = Router();
const filmeController = new FilmeController();
const locacaoController = new LocacaoController();
const clienteController = new ClienteController();
const favoritoController = new FavoritoController();

// Rotas endpoint de filmes
router.get("/", filmeController.listar);
router.get("/catalogo/listar-filme/:id", filmeController.listarPorId);
router.post("/catalogo/cadastrar-filme", filmeController.cadastrar);
router.delete("/catalogo/excluir-filme/:id", filmeController.excluir);
router.put("/catalogo/editar-filme/:id", filmeController.editar);

// Rotas endpoints de locação
router.get("/catalogo/locacao", locacaoController.listar);
router.get("/catalogo/listar-locacao/:id", locacaoController.listarPorId);
router.post("/catalogo/cadastrar-locacao", locacaoController.cadastrar);
router.delete("/catalogo/excluir-locacao/:id", locacaoController.excluir);
router.put("/catalogo/editar-locacao/:id", locacaoController.editar);

// Rotas endpoint de usuário
router.get("/catalogo/cliente", clienteController.listar);
router.post("/catalogo/cadastrar-usuario", clienteController.cadastrar);

// Rotas endpoint de favoritos
router.post("/catalogo/cadastrar-favorito", favoritoController.cadastrar);
router.delete("/catalogo/excluir-favorito", favoritoController.excluir);

export { router };
