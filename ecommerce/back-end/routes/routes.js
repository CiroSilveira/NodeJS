const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const products = [];

router.get('/', (req, res) => {
    res.send(products)
})

router.get('/:id', (req, res) => {
    // Pocuro por um produto no array products cujo id coincide com o id que veio no parâmetro da URL 'req.params.id'
    const product = products.find(product => product.id == req.params.id);
    // Se não houver produto cadastrado com o id passado via parâmetro URL eu devolvo um 404 e respondo a mensagem do res.send()
    if(!product) res.status(404).send('Produto não encontrado!');
    // Se houver produto cadastrada com o id passado via parâmetro URL eu devolvo os dados do produto
    res.send(product);
})

// CRUD (CREATE - POST) (READ - GET) (UPDATE - PUT) (DELETE - DELETE)

// [POST] - CADASTRA UM NOVO PRODUTO
router.post('/add', (req, res) => {
    const product = req.body;
    if(!product.name || !product.category || !product.price) {
        res.status(400).send('Está faltando dados do produto.');
    } else {
        products.push({
            id: crypto.randomUUID(),
            ...product 
        });
        res.status(201).send('O produto foi cadastrado com sucesso!');
    }
})

router.delete('/delete/:id', (req, res) => {
    const index = products.findIndex(product => product.id == req.params.id);
    console.log(index);
    products.splice(index, 1);
    res.send('Produto excluído com sucesso!');
})



// Exportamos o router para ser utilizado no index
module.exports = router;