const Database = require("better-sqlite3");
// Crie e exporte a instância do banco de dados
const db = new Database("./wikiterraria.db", { verbose: console.log });
module.exports = db;

// Criação das tabelas caso não existam
db.prepare(`
  CREATE TABLE IF NOT EXISTS npcs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    bioma TEXT,
    imagem BLOB,
    ama TEXT,
    gosta TEXT,
    nao_gosta TEXT,
    odeia TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS npc_relacionamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    npc_id INTEGER NOT NULL,
    relacionado_id INTEGER NOT NULL,
    tipo_relacionamento TEXT,
    FOREIGN KEY (npc_id) REFERENCES npcs(id) ON DELETE CASCADE,
    FOREIGN KEY (relacionado_id) REFERENCES npcs(id) ON DELETE CASCADE
  )
`).run();

/* const stmt = db.prepare("SELECT * FROM npcs");
const rows = stmt.all(); // Pega todas as linhas
console.log(rows); */