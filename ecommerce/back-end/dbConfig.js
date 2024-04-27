// Importo o POOL do postgres-node
const { Pool } = require('pg');

// Crio a minha conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "ecommerce",
    password: '12319460',
    port: 5432
});


// Testando a conexão com o banco de dados
// const test = async () => {
//     const result = await pool.query('SELECT * FROM products');
//     console.log(result.rows);
// }

// test();

// Exporto a minha constante pool
module.exports = pool;