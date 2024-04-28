const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../dbConfig');

const products = []

router.get('/', async (req, res) => {
    try {
        const {rows} = await pool.query('select * from products order by id');
        res.send(rows);
    } catch (error) {
        console.error('O erro foi: ' + error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        // Faço a query no DB e retorno o valor dela para a constante rows que é um array de objetos
        const {rows} = await pool.query('select * from products where id = $1', [req.params.id]);
        // Pocuro por um produto no array rows cujo id coincide com o id que veio no parâmetro da URL 'req.params.id'
        // A constante products é um objeto que tem um array chamado rows. Nesse array vem os itens cadastrados na minha tabela
        
        // Se não houver produto cadastrado com o id passado via parâmetro URL eu devolvo um 404 e respondo a mensagem do res.send()
        if(rows.length === 0) {
            res.status(404).send('Produto não encontrado!');
        } else { // Se houver produto cadastrado com o id passado via parâmetro URL eu devolvo os dados do produto
            res.send(rows);
        }
        
    } catch (error) {
        console.error('ERROOO: ' + error);
    }
    
})

// CRUD (CREATE - POST) (READ - GET) (UPDATE - PUT) (DELETE - DELETE)

// [POST] - CADASTRA UM NOVO PRODUTO
router.post('/add', async (req, res) => {
    const product = req.body;
    
    if(!product.name || !product.category || !product.price) {
        res.status(400).send('Está faltando dados do produto.');
    } else {
        const {rows} = await pool.query('insert into products (name, category, price) values ($1, $2, $3) RETURNING *', [product.name, product.category, product.price]);

        res.status(201).json({
            status: 'Produto cadastrado com sucesso!',
            data: rows
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const {rows} = await pool.query('delete from products where id = $1 returning *', [id]);
    res.status(200).json({
        status: 'Produto excluído com sucesso!',
        data: rows
    })
})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const {rows} = await pool.query('update products set name = $2, category = $3, price = $4 where id = $1 returning *', [id, req.body.name, req.body.category, req.body.price])

    res.status(200).json({
        status: 'Produto atualizado com sucesso!',
        data: rows
    })
})


// Exportamos o router para ser utilizado no index
module.exports = router;