const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../dbConfig');

const products = pool.query('select * from products');

router.get('/', async (req, res) => {
    const products = await pool.query('select * from products');
    res.send(products.rows);
})

router.get('/:id', async (req, res) => {
    // Faço a query no db e retorno o valor dela para a constante products
    const products = await pool.query('select * from products');
    // Pocuro por um produto no array products cujo id coincide com o id que veio no parâmetro da URL 'req.params.id'
    // A constante products é um objeto que tem um array chamado rows. Nesse array vem os itens cadastrados na minha tabela
    const product = products.rows.find(product => product.id == req.params.id);
    // Se não houver produto cadastrado com o id passado via parâmetro URL eu devolvo um 404 e respondo a mensagem do res.send()
    if(!product) res.status(404).send('Produto não encontrado!');
    // Se houver produto cadastrado com o id passado via parâmetro URL eu devolvo os dados do produto
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

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const upd = req.body;
    const index = products.findIndex(product => product.id == id);
    products[index] = {
        ...products[index],
        ...upd
    }
    res.status(200).send('Produto atualizado com sucesso!')
})


// Exportamos o router para ser utilizado no index
module.exports = router;