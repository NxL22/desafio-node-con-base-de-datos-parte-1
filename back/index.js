const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const { getPosts, agregarPost, eliminarPosts, incrementarLikes } = require('./consultas')



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
        const get = await getPosts();
        res.json(get);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Por aca envio lo del input. 
app.post('/posts', async (req, res) => {
    try {
        const posts = await agregarPost(req, res);
        res.json(posts);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).send('Error en el servidor');
    }
});

/*
// PART II QUERY
app.get('posts/:id/:like', (req, res) => {
    const { like } = req.params
    const { id } = req.params
})
*/


// Borrar los posts.
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    const result = await eliminarPosts(id);
    res.send(result);
});


// Ruta PUT para incrementar los likes de un post
app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const likes = await incrementarLikes(id);
        res.json({ success: true, likes });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});



