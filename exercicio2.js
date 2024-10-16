const express = require('express');
const server = express();


let times = [
    { id: 1, name: 'A', description: 'Loud' },
    { id: 2, name: 'B', description: 'Pain' },
    { id: 3, name: 'C', description: 'SKTT1' }
];


server.get('/times/:id', (req, res) => {
    const timesId = parseInt(req.params.id); 
    const times = times.find(t => t.id === timesId); 
    if (times) {
        res.status(200).json(times); 
    } else {
        res.status(404).json({ error: 'Esse time não existe' }); 
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
