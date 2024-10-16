const express = require('express');
const server = express();

server.use(express.json()); 



let products = [
    { id: 1, name: 'Produto 1', description: 'Descrição do Primeiro prod' },
    { id: 2, name: 'Produto 2', description: 'Descrição do Segundo prod' },
    { id: 3, name: 'Produto 3', description: 'Descrição do Terceiro prod' }
];


server.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});


server.patch('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        if (req.body.name) {
            product.name = req.body.name;
            res.status(200).json(product);
        } else {
            res.status(400).json({ error: 'Campo "name" é obrigatório ' });
        }
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});


server.delete('/products', (req, res) => {
    products = []; 
    res.status(200).json({ message: 'Todos os produtos foram removidos' }); 
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
