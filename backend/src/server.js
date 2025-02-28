// src/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('./db'); // Conexão com o banco de dados

const app = express();
const port = 5000;
app.use(express.json());

// Configurar multer para armazenar imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Adicionar NPC
app.post('/api/items', upload.single('imagem'), async (req, res) => {
  const { nome, bioma, ama, gosta, odeia } = req.body;
  const imagem = `/images/${req.file.filename}`;

  try {
    const result = await pool.query(
      'INSERT INTO npcs (nome, bioma, ama, gosta, odeia, imagem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, bioma, ama, gosta, odeia, imagem]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('ERRO AO CADASTRAR NPC:', error);
    res.status(500).json({ error: 'Erro ao cadastrar NPC' });
  }
});

// Listar NPCs
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM npcs');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('ERRO AO BUSCAR NPCS:', error);
    res.status(500).json({ error: 'Erro ao buscar NPCs' });
  }
});

// Editar NPC
app.put('/api/items/:id', upload.single('imagem'), async (req, res) => {
  const { nome, bioma, ama, gosta, odeia } = req.body;
  const imagem = req.file ? `/images/${req.file.filename}` : null;
  const npcId = req.params.id;

  try {
    const result = await pool.query(
      'UPDATE npcs SET nome = $1, bioma = $2, ama = $3, gosta = $4, odeia = $5, imagem = $6 WHERE id = $7 RETURNING *',
      [nome, bioma, ama, gosta, odeia, imagem, npcId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('ERRO AO EDITAR NPC:', error);
    res.status(500).json({ error: 'Erro ao editar NPC' });
  }
});

// Deletar NPC
app.delete('/api/items/:id', async (req, res) => {
  const npcId = req.params.id;

  try {
    await pool.query('DELETE FROM npcs WHERE id = $1', [npcId]);
    res.status(204).send();
  } catch (error) {
    console.error('ERRO AO DELETAR NPC:', error);
    res.status(500).json({ error: 'Erro ao deletar NPC' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});