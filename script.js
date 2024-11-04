document.getElementById('registerForm').onsubmit = function (event) {
    event.preventDefault();
    const data = {
        nomeUsuario: event.target.nomeUsuario.value,
        email: event.target.email.value,
        senha: event.target.senha.value
    };
    fetch('/usuario/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => console.log(data));
};

document.getElementById('loginForm').onsubmit = function (event) {
    event.preventDefault();
    const data = {
        email: event.target.email.value,
        senha: event.target.senha.value
    };
    fetch('/logar/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => console.log(data));
};

// Função para listar produtos
fetch('/produtos/listar')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        data.data.forEach(produto => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${produto.nomeProduto}</h3><p>${produto.descricao}</p><p>R$${produto.precoProdutos}</p>`;
            productList.appendChild(div);
        });
    });

    // Função para listar produtos
function loadProducts() {
    fetch('/produtos/listar')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; // Limpa a lista antes de recarregar

            data.data.forEach(produto => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                
                productItem.innerHTML = `
                    <img src="/uploads/${produto.imagemProduto}" alt="${produto.nomeProduto}">
                    <h3>${produto.nomeProduto}</h3>
                    <p>${produto.descricao}</p>
                    <p><strong>Preço:</strong> R$${produto.precoProdutos.toFixed(2)}</p>
                `;
                
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

// Chama a função para carregar produtos ao iniciar a página
loadProducts();

// Função para adicionar produto e atualizar a lista
document.getElementById('addProductForm').onsubmit = function (event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    fetch('/cadastrar/produto', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Produto adicionado com sucesso!');
            loadProducts(); // Atualiza a lista de produtos
        } else {
            alert('Erro ao adicionar produto: ' + data.message);
        }
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
};
