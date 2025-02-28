const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

// Rota para adicionar um NPC
app.post("/npcs", (req, res) => {
  const { nome, bioma, imagem, ama, gosta, nao_gosta, odeia } = req.body;

  // Certifique-se de que a instância do db está funcionando
  console.log(db); // Verifique se a instância é válida

  // Preparando e rodando a consulta de inserção
  const stmt = db.prepare(
    "INSERT INTO npcs (nome, bioma, imagem, ama, gosta, nao_gosta, odeia) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const info = stmt.run(nome, bioma, imagem, ama, gosta, nao_gosta, odeia);

  res.json({
    id: info.lastInsertRowid,
    nome,
    bioma,
    imagem,
    ama,
    gosta,
    nao_gosta,
    odeia,
  });
});

// Rota para buscar todos os NPCs
app.get("/npcs", (req, res) => {
  const stmt = db.prepare("SELECT * FROM npcs");
  const npcs = stmt.all(); // Recupera todos os NPCs
  res.json(npcs);
});

// Rota para adicionar um relacionamento entre NPCs
app.post("/npcs/:id/relacionamentos", (req, res) => {
  const npc_id = req.params.id; // Pega o ID do NPC da URL
  const { relacionado_id, tipo_relacionamento } = req.body;

  // Verifica se os NPCs com os IDs fornecidos existem na tabela npcs
  const stmtNpc = db.prepare("SELECT * FROM npcs WHERE id = ?");
  const npc = stmtNpc.get(npc_id);

  const stmtRelacionado = db.prepare("SELECT * FROM npcs WHERE id = ?");
  const relacionado = stmtRelacionado.get(relacionado_id);

  // Se algum dos NPCs não existir, retorna um erro
  if (!npc) {
    return res
      .status(400)
      .json({ error: `NPC com id ${npc_id} não encontrado.` });
  }

  if (!relacionado) {
    return res
      .status(400)
      .json({ error: `NPC com id ${relacionado_id} não encontrado.` });
  }

  // Certifique-se de que todos os campos necessários estão presentes
  if (!relacionado_id || !tipo_relacionamento) {
    return res.status(400).json({ error: "Faltando parâmetros obrigatórios" });
  }

  try {
    // Preparando e rodando a consulta de inserção
    const stmt = db.prepare(
      "INSERT INTO npc_relacionamentos (npc_id, relacionado_id, tipo_relacionamento) VALUES (?, ?, ?)"
    );
    const info = stmt.run(npc_id, relacionado_id, tipo_relacionamento);

    res.json({
      id: info.lastInsertRowid,
      npc_id,
      relacionado_id,
      tipo_relacionamento,
    });
  } catch (err) {
    console.error("Erro ao adicionar relacionamento:", err);
    res.status(500).json({ error: "Erro ao adicionar relacionamento" });
  }
});

// Rota para buscar os relacionamentos de um NPC
app.get("/npcs/:id/relacionamentos", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`SELECT * FROM npc_relacionamentos WHERE npc_id = ?`);
  const relacionamentos = stmt.all(id);
  res.json(relacionamentos);
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
