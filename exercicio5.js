const express = require('express');
const server = express();

server.use(express.json()); 


let artists = [
    { id: 1, name: 'Item 1', description: 'Mikael Jackson' },
    { id: 2, name: 'Item 2', description: 'Tchu Pack' },
    { id: 3, name: 'Item 3', description: 'Eminemi' }
];


server.get('/artists/:id', (req, res) => {
    const artistId = parseInt(req.params.id);
    const artist = artists.find(a => a.id === artistId);

    if (artist) {
        res.status(200).json(artist);
    } else {
        res.status(404).json({ error: 'Artista não encontrado' });
    }
});


server.patch('/artists/:id', (req, res) => {
    const artistId = parseInt(req.params.id);
    const artist = artists.find(a => a.id === artistId);

    if (artist) {
        if (req.body.name) {
            artist.name = req.body.name;
            res.status(200).json(artist); 
        } else {
            res.status(400).json({ error: 'Campo "name" é obrigatório para atualizar' }); 
        }
    } else {
        res.status(404).json({ error: 'Artista não encontrado' }); 
    }
});


server.delete('/artists', (req, res) => {
    artists = []; 
    res.status(200).json({ message: 'Todos os artistas foram removidos' });
});


server.get('/artists/count', (req, res) => {
    const count = artists.length; 
    res.status(200).json({ count }); 
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
