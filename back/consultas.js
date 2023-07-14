const { Pool } = require('pg')
const express = require('express');
const app = express();

// Conexion a Postgres 
const pool = new Pool({
    host: 'localhost',
    user: 'neil',
    password: '123',
    database: 'likeme',
    allowExitOnIdle: true,   // Corta  la conexion si deja de usarse (en reposo).
});


// Ruta GET para mostrar la tabla posts
const getPosts = async () => {
    const result = await pool.query(`SELECT * FROM posts`);
    return result.rows;
}


const agregarPost = async () => {
    try {
        app.post('/posts', async (req, res) => {
            const { titulo, imgSrc, descripcion, likes } = req.body;

            const query = `INSERT INTO posts (titulo, imgSrc, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [titulo, imgSrc, descripcion, likes];

            const result = await pool.query(query, values);

            console.log('Nuevo registro insertado:', result.rows[0]);
            res.status(201).json(result.rows[0]);
        });
    } catch (error) {
        console.error('Error al agregar registro', error);
    }
}

agregarPost();



module.exports = {
    getPosts,
    agregarPost
}