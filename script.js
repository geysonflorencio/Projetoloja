const urlApi = "https://fakestoreapi.com/products";
let carrinhoDeCompras = [];

function adicionarAoCarrinho(produto) {
    carrinhoDeCompras.push(produto);
    exibirCarrinho();
}

function removerDoCarrinho(index) {
    carrinhoDeCompras.splice(index, 1);
    exibirCarrinho();
}

function calcularTotal() {
    let total = 0;
    carrinhoDeCompras.forEach(produto => {
        total += produto.price;
    });
    return total.toFixed(2);
}

function exibirCarrinho() {
    const carrinhoItemsContainer = document.getElementById('carrinho-items');
    carrinhoItemsContainer.innerHTML = '';

    carrinhoDeCompras.forEach((produto, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const titulo = document.createElement('h3');
        titulo.textContent = produto.title;

        const preco = document.createElement('p');
        preco.textContent = "Preço: $" + produto.price;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener('click', () => removerDoCarrinho(index));

        itemDiv.appendChild(titulo);
        itemDiv.appendChild(preco);
        itemDiv.appendChild(botaoRemover);

        carrinhoItemsContainer.appendChild(itemDiv);
    });

    const carrinhoTotalContainer = document.getElementById('carrinho-total');
    carrinhoTotalContainer.textContent = "Total: $" + calcularTotal();
}

function finalizarCompra() {
    alert("Compra finalizada com sucesso!");
    carrinhoDeCompras = [];
    exibirCarrinho();
}

function buscarProdutos() {
    fetch(urlApi)
        .then(response => response.json())
        .then(produtos => {
            const produtosContainer = document.getElementById('produtos-container');
            produtosContainer.innerHTML = ''; 
            produtos.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');

                const imagem = document.createElement('img');
                imagem.src = produto.image;
                imagem.alt = produto.title;

                const titulo = document.createElement('h2');
                titulo.textContent = produto.title;

                const categoria = document.createElement('p');
                categoria.textContent = "Categoria: " + produto.category;

                const preco = document.createElement('p');
                preco.textContent = "Preço: $" + produto.price;

                const descricao = document.createElement('p');
                descricao.textContent = "Descrição: " + produto.description;

                const botaoAdicionar = document.createElement('button');
                botaoAdicionar.textContent = "Adicionar ao Carrinho";
                botaoAdicionar.addEventListener('click', () => adicionarAoCarrinho(produto));

                produtoDiv.appendChild(imagem);
                produtoDiv.appendChild(titulo);
                produtoDiv.appendChild(categoria);
                produtoDiv.appendChild(preco);
                produtoDiv.appendChild(descricao);
                produtoDiv.appendChild(botaoAdicionar);

                produtosContainer.appendChild(produtoDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar produtos na API:", error);
        });
}

function pesquisarProduto() {
    const termoBusca = document.getElementById('search-input').value.trim().toLowerCase();
    fetch(urlApi)
        .then(response => response.json())
        .then(produtos => {
            const resultados = produtos.filter(produto =>
                produto.title.toLowerCase().includes(termoBusca) ||
                produto.category.toLowerCase().includes(termoBusca) ||
                produto.description.toLowerCase().includes(termoBusca)
            );
            const produtosContainer = document.getElementById('produtos-container');
            produtosContainer.innerHTML = ''; 
            if (resultados.length === 0) {
                produtosContainer.textContent = "Nenhum produto encontrado.";
            } else {
                resultados.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.classList.add('produto');

                    const imagem = document.createElement('img');
                    imagem.src = produto.image;
                    imagem.alt = produto.title;

                    const titulo = document.createElement('h2');
                    titulo.textContent = produto.title;

                    const categoria = document.createElement('p');
                    categoria.textContent = "Categoria: " + produto.category;

                    const preco = document.createElement('p');
                    preco.textContent = "Preço: $" + produto.price;

                    const descricao = document.createElement('p');
                    descricao.textContent = "Descrição: " + produto.description;

                    const botaoAdicionar = document.createElement('button');
                    botaoAdicionar.textContent = "Adicionar ao Carrinho";
                    botaoAdicionar.addEventListener('click', () => adicionarAoCarrinho(produto));

                    produtoDiv.appendChild(imagem);
                    produtoDiv.appendChild(titulo);
                    produtoDiv.appendChild(categoria);
                    produtoDiv.appendChild(preco);
                    produtoDiv.appendChild(descricao);
                    produtoDiv.appendChild(botaoAdicionar);

                    produtosContainer.appendChild(produtoDiv);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao buscar produtos na API:", error);
        });
}

document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
document.getElementById('search-input').addEventListener('input', pesquisarProduto);

buscarProdutos();


