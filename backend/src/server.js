// src/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('./db'); // Conexão com o banco de dados

const app = express();
const port = 5000;

// Configurar multer para armazenar imagens na pasta 'public/images'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images')); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada imagem
  }
});

const upload = multer({ storage: storage });

// Rota para fazer upload da imagem
app.post('/api/upload', upload.single('imagem'), async (req, res) => {
  try {
    const { nome, bioma } = req.body;
    const imagemUrl = `/images/${req.file.filename}`; // Caminho da imagem no diretório

    // Salvar NPC no banco com o caminho da imagem
    const result = await pool.query(
      'INSERT INTO npcs (nome, bioma, imagem) VALUES ($1, $2, $3) RETURNING *',
      [nome, bioma, imagemUrl]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao fazer upload da imagem');
  }
});

// Rota para obter NPCs com as imagens
app.get('/api/npcs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM npcs');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar NPCs');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});