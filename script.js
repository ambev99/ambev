document.addEventListener("DOMContentLoaded", () => {
    const produtos = [
        {id:1, nome:"Cerveja Skol 350ml", preco:2.29, img:"img/skol.jpg"},
        {id:2, nome:"Cerveja Brahma 350ml", preco:3.49, img:"img/brahma.jpg"},
        {id:3, nome:"Refrigerante Guaraná 2L", preco:6.99, img:"img/guarana.jpg"},
        {id:4, nome:"Energético Red Bull 250ml", preco:6.99, img:"img/redbull.jpg"},
        {id:5, nome:"Itaipava Pilsen", preco:2.59, img:"img/itaipava.jpg"},
        {id:6, nome:"Petra Puro Malte", preco:2.19, img:"img/petra.jpg"},
        {id:7, nome:"Império Puro Malte", preco:2.29, img:"img/imperio.jpg"},
        {id:8, nome:"Budweiser", preco:4.49, img:"img/budweiser.jpg"},
        {id:9, nome:"Heineken", preco:4.59, img:"img/heineken.jpg"},
        {id:10, nome:"Stella Artois", preco:4.99, img:"img/stella.jpg"},
        {id:11, nome:"Spaten", preco:3.29, img:"img/spaten.jpg"},
        {id:12, nome:"Heineken Zero", preco:3.99, img:"img/heineken-zero.jpg"},
        {id:13, nome:"Corona", preco:5.19, img:"img/corona.jpg"}
    ];

    let carrinho = [];
    const produtosContainer = document.getElementById("produtos-container");

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto-card");
        card.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <input type="number" min="1" value="1" id="quantidade-${produto.id}">
            <button class="btn btn-primary" onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(card);
    });

    const badge = document.createElement("div");
    badge.id = "carrinho-badge";
    badge.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: #1e90ff; color: #fff; padding: 10px 15px;
        border-radius: 50px; cursor: pointer; z-index: 1000;
        font-weight: bold;
    `;
    badge.textContent = "🛒 0";
    document.body.appendChild(badge);
    badge.addEventListener("click", () => {
        document.getElementById("carrinho-container").scrollIntoView({behavior: "smooth"});
    });

    const mensagemDiv = document.createElement("div");
    mensagemDiv.id = "msg-adicionado";
    mensagemDiv.style.cssText = `
        position: fixed; bottom: 80px; right: 20px;
        background: #007acc; color: #fff; padding: 10px 15px;
        border-radius: 8px; display: none; z-index: 1000; font-weight: bold;
    `;
    document.body.appendChild(mensagemDiv);

    window.adicionarCarrinho = function(id) {
        const produto = produtos.find(p => p.id === id);
        const quantidade = parseInt(document.getElementById(`quantidade-${id}`).value);
        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) itemExistente.quantidade += quantidade;
        else carrinho.push({...produto, quantidade});

        atualizarCarrinho();

        mensagemDiv.textContent = `${produto.nome} adicionado ao carrinho!`;
        mensagemDiv.style.display = "block";
        setTimeout(() => mensagemDiv.style.display = "none", 2000);
    };

    window.removerCarrinho = function(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    };

    function atualizarCarrinho() {
        const container = document.getElementById("carrinho-container");
        container.innerHTML = "";
        let total = 0;

        if (carrinho.length === 0) {
            container.innerHTML = "<p>Seu carrinho está vazio.</p>";
            document.getElementById("btn-whatsapp").style.display = "none";
            document.getElementById("total").textContent = "";
        } else {
            carrinho.forEach((item, index) => {
                const subtotal = item.preco * item.quantidade;
                total += subtotal;

                const div = document.createElement("div");
                div.classList.add("carrinho-item");
                div.innerHTML = `
                    <span>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = <strong>R$ ${subtotal.toFixed(2)}</strong></span>
                    <button onclick="removerCarrinho(${index})">Remover</button>
                `;
                container.appendChild(div);
            });
            document.getElementById("total").textContent = "💰 Total: R$ " + total.toFixed(2);
            document.getElementById("btn-whatsapp").style.display = "inline-block";
        }

        const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
       
        badge.textContent = `🛒 ${quantidadeTotal}`;
    }

    document.getElementById("btn-whatsapp").addEventListener("click", () => {
        if (carrinho.length === 0) return;
        let mensagem = "Olá, gostaria de fazer o seguinte pedido:%0A";
        carrinho.forEach(item => {
            mensagem += `- ${item.nome} x ${item.quantidade}%0A`;
        });
        const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
        const url = `https://wa.me/5511980946705?text=${mensagem}`;
        window.open(url, "_blank");
    });
}); 
