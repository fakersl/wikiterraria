// src/routes/npcRoutes.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Rota para obter todos os NPCs
router.get('/npcs', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM npcs');  // Substitua com sua query SQL
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao recuperar os NPCs');
    }
});

// Rota para criar um NPC
router.post('/npcs', async (req, res) => {
    const { nome, bioma, imagem, ama, gosta, naoGosta, odeia } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO npcs (nome, bioma, imagem, ama, gosta, nao_gosta, odeia) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nome, bioma, imagem, ama, gosta, naoGosta, odeia]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar o NPC');
    }
});

module.exports = router;
