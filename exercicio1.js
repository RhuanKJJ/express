const express = require('express');
const fs = require('fs'); 
const app = express();
const port = 3000;


app.use(express.json());


app.post('/items', (req, res) => {
  const { name } = req.body;


  if (!name || typeof name !== 'string' || name.length < 3) {
    return res.status(400).json({ error: "O campo 'name' é obrigatório e deve ter pelo menos 3 caracteres." });
  }


  fs.readFile('items.json', 'utf8', (err, data) => {
    let items = [];
    if (!err) {
      items = JSON.parse(data);  
    }


    const newItem = { id: Date.now(), name };

    
    items.push(newItem);

    
    fs.writeFile('items.json', JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar o item no arquivo.' });
      }
      console.log('Item salvo com sucesso:', newItem);
      return res.status(201).json(newItem);
    });
  });
});


app.listen(port, () => {
  console.log(`Servido rodando na porta ${port}`);
});
