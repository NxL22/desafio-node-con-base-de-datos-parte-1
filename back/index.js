const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 
const { getPosts, agregarPost } = require('./consultas')


// Levanto el servidor.
app.listen(3001, console.log(`Servidor en funcionamiento en el puerto: ${port}`))

// Middleware:
app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());


// Ruta GET para devolver la página web, "aqui uni el back con el front",
// lo hice por medio de usar el mismo PORT, y npm estar en ambas consolas (el front y el back).
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../front/public/index.html');
});


// Por aca hago que los post se vean en la web.
app.get('/posts', async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.post('/posts', async (req, res) => {
    try {
        const posts = await agregarPost(req, res);
        res.json(posts);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).send('Error en el servidor');
    }
});





