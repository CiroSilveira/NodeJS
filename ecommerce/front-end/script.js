// buscar o elemento lista que vai listar os meus produtos

const lista = document.querySelector('#lista');
const urlApi = 'http://localhost:3000/products/';
// busco os meus inputs para pegar o que o usuário digitou

const name = document.querySelector('#iname');
const category = document.querySelector('#icategory');
const price = document.querySelector('#iprice');

const getProducts = async () => {
    const response = await fetch(urlApi);
    console.log(response);
    const products = await response.json();
    console.log(products);

    products.map((product) => {
        lista.insertAdjacentHTML('beforeend', `
            <li>${product.name}</li>
            <li>${product.category}</li>
            <li>${product.price}</li>
        `)
    })
}

// POST

const submitForm = (event) => {
    event.preventDefault();
    const product = {
        name: name.value,
        category: category.value,
        price: price.value
    }
    console.log(product);
}

getProducts();