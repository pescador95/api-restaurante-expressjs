import { Router } from "express";
import ClienteController from "./controller/ClienteController";
import FornecedorController from "./controller/FornecedorController";
import FuncionarioController from "./controller/FuncionarioController";
import ProdutoController from "./controller/ProdutoController";
import EstoqueController from "./controller/EstoqueController";
import PedidoClienteController from "./controller/PedidoClienteController";
import PedidoFornecedorController from "./controller/PedidoFornecedorController";

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

//Rota Estoque
routes.get("/estoque", EstoqueController.index);
routes.post("/estoque", EstoqueController.create);
routes.get("/estoque/:id", EstoqueController.get);
routes.put("/estoque/:id", EstoqueController.update);
routes.delete("/estoque/:id", EstoqueController.delete);

//Rota Lancamento Pedido Cliente
routes.get("/pedidoCliente", PedidoClienteController.index);
routes.post("/pedidoCliente", PedidoClienteController.create);
routes.get("/pedidoCliente/:id", PedidoClienteController.get);
routes.put("/pedidoCliente/:id", PedidoClienteController.update);
routes.delete("/pedidoCliente/:id", PedidoClienteController.delete);

//Rota Lancamento Pedido
routes.get("/pedidoFornecedor", PedidoFornecedorController.index);
routes.post("/pedidoFornecedor", PedidoFornecedorController.create);
routes.get("/pedidoFornecedor/:id", PedidoFornecedorController.get);
routes.put("/pedidoFornecedor/:id", PedidoFornecedorController.update);
routes.delete("/pedidoFornecedor/:id", PedidoFornecedorController.delete);

export default routes;
