const { Pool } = require('pg')


// Conexion a Postgres 
const pool = new Pool({
    host: 'localhost',
    user: 'neil',
    password: '123',
    database: 'likeme',
    allowExitOnIdle: true,   // Corta  la conexion si deja de usarse (en reposo).
});


// Ruta GET para mostrar la tabla posts, lo probe y da un Posts: [] (probado, esta ok)
const getPosts = async () => {
    const result = await pool.query(`SELECT * FROM posts`);
    return result.rows;
}


const agregarPost = async (req, res) => {

    const { titulo, img, descripcion, likes } = req.body;

    const query = `INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [titulo, img, descripcion, likes];

    const result = await pool.query(query, values);

    console.log('Nuevo registro insertado:', result.rows[0]);
    res.status(201).json(result.rows[0]);
};

// Ruta DELETE
const eliminarPosts = async (id) => {
    const result = await pool.query(`DELETE FROM posts WHERE id =$1`, [id]);
    return result.rows;
}


//*PUT**
// Incrementar los likes de un post
const incrementarLikes = async (id) => {
    const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes';
    const result = await pool.query(query, [id]);
    return result.rows[0].likes;
};






module.exports = {
    getPosts,
    agregarPost,
    eliminarPosts,
    incrementarLikes
}