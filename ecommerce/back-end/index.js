const express = require('express');
const app = express();
const port = 3000;
const produtsRouter = require('./routes/routes');
const cors = require('cors');
// Habilito o middleware de json do express
app.use(express.json());
app.use(cors());
// Inicializa a rota /products de acordo com as configurações do meu arquivo de rota que é o segundo parâmetro
app.use('/products', produtsRouter);


app.get('/', (req, res) => {
    // setTimeout(() => { // espere 5000ms witch is the same as 5s
    res.send('Bem-vindo!');
    // }, 5000);
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
})