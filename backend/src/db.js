const { Pool } = require("pg");

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: "postgres", // Substitua pelo seu usuário
  host: "localhost", // O host pode ser localhost se estiver rodando localmente
  database: "terrariawiki", // Nome do banco de dados
  password: "root", // Substitua pela sua senha do banco
  port: 5432, // Porta padrão do PostgreSQL
});

// Função para realizar a consulta
const query = (text, params) => pool.query(text, params);

// Exportando a função query para ser utilizada no server.js
module.exports = {
  query,
};

// Verificar a conexão
pool
  .connect()
  .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados", err));

module.exports = pool;
