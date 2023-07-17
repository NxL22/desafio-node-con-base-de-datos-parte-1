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


// POST
// Función para agregar un nuevo post a la base de datos
const agregarPost = async (req, res) => {
    try {
        // Extraer los datos del post del cuerpo de la solicitud
        const { titulo, img, descripcion, likes } = req.body;

        // Consulta SQL para insertar un nuevo registro en la tabla "posts"
        const query = `INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [titulo, img, descripcion, likes];

        // Ejecutar la consulta utilizando el objeto "pool" para interactuar con la base de datos
        const result = await pool.query(query, values);

        // Mostrar el nuevo registro insertado en la consola
        console.log('Nuevo registro insertado:', result.rows[0]);

        // Responder con el nuevo registro insertado en la respuesta HTTP
        res.status(201).json(result.rows[0]);
    } catch (error) {
        // Manejo de errores en caso de que ocurra un problema durante la inserción del post
        console.error('Error al agregar el post:', error);
        res.status(500).json({ error: 'Error al agregar el post' });
    }
};


// Función para eliminar un post de la base de datos por su ID
const eliminarPosts = async (id) => {
    try {
        // Consulta SQL para eliminar un registro de la tabla "posts" usando su ID
        const result = await pool.query(`DELETE FROM posts WHERE id =$1`, [id]);
        return result.rows;
    } catch (error) {
        // Manejo de errores en caso de que ocurra un problema durante la eliminación del post
        console.error('Error al eliminar el post:', error);
        throw error; // Propaga el error para que pueda ser manejado en otra parte del código
    }
};


// Función para incrementar el número de likes de un post por su ID
const incrementarLikes = async (id) => {
    try {
        // Consulta SQL para actualizar el campo "likes" de un post sumando 1 al valor actual
        const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes';
        const result = await pool.query(query, [id]);

        // Devuelve el número de likes actualizado
        return result.rows[0].likes;
    } catch (error) {
        // Manejo de errores en caso de que ocurra un problema durante la actualización de likes
        console.error('Error al incrementar los likes:', error);
        throw error; // Propaga el error para que pueda ser manejado en otra parte del código
    }
};




module.exports = {
    getPosts,
    agregarPost,
    eliminarPosts,
    incrementarLikes
}