// buscar o elemento lista que vai listar os meus produtos

let lista = document.querySelector('#lista');
const urlApi = 'http://localhost:3000/products';
// busco os meus inputs para pegar o que o usuário digitou

const name = document.querySelector('#iname');
const category = document.querySelector('#icategory');
const price = document.querySelector('#iprice');

// GET
const getProducts = async () => {
    lista.innerHTML = '';
    name.value = "", category.value = "", price.value = "";
    const response = await fetch(urlApi);
    const products = await response.json();

    products.map((product) => {
        lista.insertAdjacentHTML('beforeend', `
            <li><p>ID: ${product.id} - Name: ${product.name}</p> <p>Category: ${product.category} Price: ${product.price}</p></li>
            <button onclick="deleteItem(${product.id})">Excluir</button>
        `)
    })
}

// POST
const submitForm = async (event) => {
    event.preventDefault();
    const product = {
        name: name.value,
        category: category.value,
        price: price.value
    }
    // Construindo a minha requisição de POST
    const request = new Request(`${urlApi}/add`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    const response = await fetch(request);
    console.log(response);
    const data = await response.json();
    console.log(data);

    alert(`Produto ${data.data[0].name} cadastrado com sucesso!`);
    getProducts();
}

// DELETE
const deleteItem = async (id) => {
    const request = new Request(`${urlApi}/delete/${id}`, {
        method: 'delete'
    });
    const response = await fetch(request);
    console.log(response);
    const result = await response.json();
    console.log(result);
    getProducts();

}

getProducts();