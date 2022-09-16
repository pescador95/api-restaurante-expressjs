import { Router } from "express";
import ClienteController from "./controller/ClienteController";
import FornecedorController from "./controller/FornecedorController";
import FuncionarioController from "./controller/FuncionarioController";
import ProdutoController from "./controller/ProdutoController";
import ControleEstoqueController from "./controller/ControleEstoqueController";
import LancamentoPedidoController from "./controller/LancamentoPedidoController";
import FechamentoPedidoController from "./controller/FechamentoPedidoController";

const routes = new Router();

//Rota Clientes
routes.get("/cliente", ClienteController.index);
routes.post("/cliente", ClienteController.create);
routes.get("/cliente/:id", ClienteController.get);
routes.put("/cliente/:id", ClienteController.update);
routes.delete("/cliente/:id", ClienteController.delete);

//Rota Fornecedor
routes.get("/fornecedor", FornecedorController.index);
routes.post("/fornecedor", FornecedorController.create);
routes.get("/fornecedor/:id", FornecedorController.get);
routes.put("/fornecedor/:id", FornecedorController.update);
routes.delete("/fornecedor/:id", FornecedorController.delete);

//Rota Funcionario
routes.get("/funcionario", FuncionarioController.index);
routes.post("/funcionario", FuncionarioController.create);
routes.get("/funcionario/:id", FuncionarioController.get);
routes.put("/funcionario/:id", FuncionarioController.update);
routes.delete("/funcionario/:id", FuncionarioController.delete);

//Rota Produto
routes.get("/produto", ProdutoController.index);
routes.post("/produto", ProdutoController.create);
routes.get("/produto/:id", ProdutoController.get);
routes.put("/produto/:id", ProdutoController.update);
routes.delete("/produto/:id", ProdutoController.delete);

//Rota Controle Estoque
routes.get("/controleEstoque", ControleEstoqueController.index);
routes.post("/controleEstoque", ControleEstoqueController.create);
routes.get("/controleEstoque/:id", ControleEstoqueController.get);
routes.put("/controleEstoque/:id", ControleEstoqueController.update);
routes.delete("/controleEstoque/:id", ControleEstoqueController.delete);

//Rota Lancamento Pedido
routes.get("/lancamentoPedido", LancamentoPedidoController.index);
routes.post("/lancamentoPedido", LancamentoPedidoController.create);
routes.get("/lancamentoPedido/:id", LancamentoPedidoController.get);
routes.put("/lancamentoPedido/:id", LancamentoPedidoController.update);
routes.delete("/lancamentoPedido/:id", LancamentoPedidoController.delete);

//Rota Fechamento Pedido
routes.get("/fechamentoPedido", FechamentoPedidoController.index);
routes.post("/fechamentoPedido", FechamentoPedidoController.create);
routes.get("/fechamentoPedido/:id", FechamentoPedidoController.get);
routes.put("/fechamentoPedido/:id", FechamentoPedidoController.update);
routes.delete("/fechamentoPedido/:id", FechamentoPedidoController.delete);

export default routes;
