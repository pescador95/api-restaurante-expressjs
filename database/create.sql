-- DROP SCHEMA public;

-- CREATE DATABASE API_RESTAURANTE;

-- CREATE SCHEMA PUBLIC x-access-token POSTGRES;

-- public."cliente" definition

-- Drop table

-- DROP TABLE public."cliente";

CREATE TABLE PUBLIC."cliente" (
    ID SERIAL PRIMARY KEY,
    NOME VARCHAR(255),
    CPF VARCHAR(11) UNIQUE,
    TELEFONE VARCHAR(20),
    DATANASCIMENTO TIMESTAMP,
    ENDERECO VARCHAR(255)
);

-- ALTER TABLE PUBLIC.CLIENTE OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.CLIENTE TO POSTGRES;

-- Drop table

-- DROP TABLE public."fornecedor";

CREATE TABLE PUBLIC."fornecedor" (
    ID SERIAL PRIMARY KEY,
    NOMEFORNECEDOR VARCHAR(255),
    CNPJ VARCHAR(14)
);

-- ALTER TABLE PUBLIC.FORNECEDOR OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.FORNECEDOR TO POSTGRES;

-- Drop table

-- DROP TABLE public."funcionario";

CREATE TABLE PUBLIC."funcionario" (
    ID SERIAL PRIMARY KEY,
    NOME VARCHAR(255),
    CPF VARCHAR(11) UNIQUE,
    TELEFONE VARCHAR(20),
    DATANASCIMENTO TIMESTAMP,
    ENDERECO VARCHAR(255)
);

-- ALTER TABLE PUBLIC.FUNCIONARIO OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.FUNCIONARIO TO POSTGRES;

-- Drop table

-- DROP TABLE public."produto";

CREATE TABLE PUBLIC."produto" (
    ID SERIAL PRIMARY KEY,
    IDFORNECEDOR INT8,
    NOMEPRODUTO VARCHAR(255),
    TIPOPRODUTO VARCHAR(255),
    DESCRICAO VARCHAR(255),
    VALORUNIDADE DOUBLE PRECISION,
    DATACOMPRA TIMESTAMP,
    CONSTRAINT FK_ID_FORNECEDOR FOREIGN KEY (IDFORNECEDOR) REFERENCES PUBLIC.FORNECEDOR(ID)
);

-- ALTER TABLE PUBLIC.PRODUTO OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.PRODUTO TO POSTGRES;

-- Drop table

-- DROP TABLE public."estoque";

CREATE TABLE PUBLIC."estoque" (
    ID SERIAL PRIMARY KEY,
    IDPRODUTO INT8,
    QUANTIDADE BIGINT,
    CUSTOUNIDADE DOUBLE PRECISION,
    CONSTRAINT FK_ID_PRODUTO FOREIGN KEY (IDPRODUTO) REFERENCES PUBLIC.PRODUTO(ID)
);

-- ALTER TABLE PUBLIC.ESTOQUE OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.ESTOQUE TO POSTGRES;

-- Drop table

-- DROP TABLE public."pedidofornecedor";

CREATE TABLE PUBLIC."pedidofornecedor" (
    ID SERIAL PRIMARY KEY,
    NUMEROPEDIDO SERIAL,
    IDFORNECEDOR INT8,
    IDFUNCIONARIO INT8,
    VALORTOTALPEDIDO DOUBLE PRECISION,
    DATAPEDIDO TIMESTAMP,
    CONSTRAINT FK_ID_FORNECEDOR FOREIGN KEY (IDFORNECEDOR) REFERENCES PUBLIC.FORNECEDOR(ID),
    CONSTRAINT FK_ID_IDFUNCIONARIO FOREIGN KEY (IDFUNCIONARIO) REFERENCES PUBLIC.FUNCIONARIO(ID)
);

-- ALTER TABLE PUBLIC.PEDIDOFORNECEDOR OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.PEDIDOFORNECEDOR TO POSTGRES;

-- Drop table

-- DROP TABLE public."pedidocliente";

CREATE TABLE PUBLIC."pedidocliente" (
    ID SERIAL PRIMARY KEY,
    NUMEROPEDIDO SERIAL,
    IDCLIENTE INT8,
    IDFUNCIONARIO INT8,
    VALORTOTALPEDIDO DOUBLE PRECISION,
    DATAPEDIDO TIMESTAMP,
    CONSTRAINT FK_ID_CLIENTE FOREIGN KEY (IDCLIENTE) REFERENCES PUBLIC.CLIENTE(ID),
    CONSTRAINT FK_ID_IDFUNCIONARIO FOREIGN KEY (IDFUNCIONARIO) REFERENCES PUBLIC.FUNCIONARIO(ID)
);

-- ALTER TABLE PUBLIC.PEDIDOCLIENTE OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.PEDIDOCLIENTE TO POSTGRES;

-- DROP TABLE public."usuario";

CREATE TABLE PUBLIC."usuario" (
    ID SERIAL PRIMARY KEY,
    LOGIN VARCHAR(255),
    SENHA VARCHAR(255),
    IDFUNCIONARIO INT8,
    CONSTRAINT FK_ID_IDFUNCIONARIO FOREIGN KEY (IDFUNCIONARIO) REFERENCES PUBLIC.FUNCIONARIO(ID)
);

-- ALTER TABLE PUBLIC.USUARIO OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.USUARIO TO POSTGRES;

-- DROP TABLE public."itempedido";

CREATE TABLE PUBLIC."itempedido" (
    ID SERIAL PRIMARY KEY,
    IDPEDIDOCLIENTE INT8,
    IDPEDIDOFORNECEDOR INT8,
    IDPRODUTO INT8,
    QUANTIDADE BIGINT,
    VALORUNITARIO DOUBLE PRECISION,
    PEDIDOCLIENTE BOOLEAN,
    CONSTRAINT FK_ID_PEDIDOCLIENTE FOREIGN KEY (IDPEDIDOCLIENTE) REFERENCES PUBLIC.PEDIDOCLIENTE(ID),
    CONSTRAINT FK_ID_PEDIDOFORNECEDOR FOREIGN KEY (IDPEDIDOFORNECEDOR) REFERENCES PUBLIC.PEDIDOFORNECEDOR(ID),
    CONSTRAINT FK_ID_PRODUTO FOREIGN KEY (IDPRODUTO) REFERENCES PUBLIC.PRODUTO(ID)
);

-- ALTER TABLE PUBLIC.ITEMPEDIDO OWNER TO POSTGRES;

-- GRANT ALL ON TABLE PUBLIC.ITEMPEDIDO TO POSTGRES;