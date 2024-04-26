/* FETCH API - USADO PARA TRABALHAR COM REQUISIÇÕES HTTP COM JAVASCRIPT (GET / PUT / POST / DELETE)
O PRIMEIRO PARÂMETRO É O END POINT DA REQUISIÇÃO (PARA ONDE IREMOS ENVIAR A NOSSA 
REQUISIÇÃO DO FRONT (http://localhost:3000/tarefas))
O SEGUNDO PARÂMETRO É OPCIONAL - SÃO CONFIGURAÇÕES DA REQUISIÇÃO EX: MÉTODO (GET/PUT/POST/DELETE)

FUNÇÃO ASSÍNCRONA (PROMISE) */

const Api = fetch('http://localhost:3000/tarefas');
console.log(Api);
const listaTarefasHtml = document.getElementById('tarefas');
console.log(listaTarefasHtml);
Api.then((response) => {
    console.log(response);
    return response.json();
}).then((tarefas) => {
    console.log(tarefas);
    tarefas.map((tarefa) => {
        console.log(tarefa);
    listaTarefasHtml.insertAdjacentHTML('beforeend', `<li>
        <p>Tarefa: ${tarefa.nome}</p>
        <p>Prazo: ${tarefa.prazo}</p>
    </li>`)        
    })
})

