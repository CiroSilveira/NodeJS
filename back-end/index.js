console.clear();
//API = Application Programming Interface
//Importamos o express
const express = require('express');
//Inicializa um servidor WEB com express
const app = express();
const cors = require('cors');
const crypto = require('crypto');

//Fala para o express utilizar o middleware que trabalharemos com o json(javascript object notation)
app.use(express.json());
app.use(cors());

// Lista de tarefas
const tarefas = [
    {
        id: crypto.randomUUID(),
        nome: 'Ir ao mercado',
        prazo: '2 dias'
    },
    {
        id: crypto.randomUUID(),
        nome: 'Estudar sobre Git',
        prazo: '3 dias'
    },
    {
        id: crypto.randomUUID(),
        nome: 'Estudar Javascript',
        prazo: '10 dias'
    },
    {
        id: crypto.randomUUID(),
        nome: 'Estudar Desenvolvimento de jogos',
        prazo: '20 dias'
    }

]
app.get('/', (req, res) => {
    console.log(`${req}`);
    res.send('Olá galera!');
})

app.get('/tarefas', (req, res) => {
    res.send(tarefas)    
})

app.get('/tarefas/:id', (req, res) => {
    // acessando o parâmetro da URL
    const idParam = req.params.id;
    const tarefa = tarefas.find((tarefa) =>  tarefa.id == idParam)
})

//Defino uma porta de rede para rodar o meu servidor web
const port = 3000;

//Inicializamos o servidor na porta predefinida
app.listen(port, () => {
    console.log(`O app está rodando na porta 3000`);
})
