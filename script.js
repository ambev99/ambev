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
        {id:13, nome:"corona", preco:5.19, img:"img/corona.jpg"}
    ];

    let carrinho = [];
    const produtosContainer = document.getElementById("produtos-container");

    // Exibir produtos dinamicamente
    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto-card");
        card.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
            <input type="number" min="1" value="1" id="quantidade-${produto.id}" style="width:60px;">
            <button class="btn btn-primary" onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(card);
    });

    window.adicionarCarrinho = function(id) {
        const produto = produtos.find(p => p.id === id);
        const quantidade = parseInt(document.getElementById(`quantidade-${id}`).value);
        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({...produto, quantidade});
        }
        atualizarCarrinho();
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
            document.getElementById("btn-pix").style.display = "none";
            document.getElementById("btn-whatsapp").style.display = "none";
            document.getElementById("total").textContent = "";
            return;
        }

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
        document.getElementById("btn-pix").style.display = "inline-block";
        document.getElementById("btn-whatsapp").style.display = "inline-block";
    }

    // Modal PIX
    const pixModal = document.getElementById("pix-modal");
    const closePix = document.getElementById("close-pix");

    document.getElementById("btn-pix").addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        pixModal.style.display = "flex";
    });

    closePix.addEventListener("click", () => pixModal.style.display = "none");
    window.onclick = e => { if (e.target === pixModal) pixModal.style.display = "none"; };

    // Enviar via WhatsApp
    document.getElementById("btn-whatsapp").addEventListener("click", () => {
        const nome = document.getElementById("nomeCliente").value.trim();
        const endereco = document.getElementById("enderecoCliente").value.trim();

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        if (!nome || !endereco) {
            alert("Por favor, preencha seu nome e endereço.");
            return;
        }

        let mensagem = `🛒 *Pedido de Bebidas*%0A`;
        carrinho.forEach(item => {
            mensagem += `• ${item.nome} x ${item.quantidade} = R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
        });
        mensagem += `%0A💰 Total: ${document.getElementById("total").textContent}%0A`;
        mensagem += `%0A👤 *Nome:* ${nome}%0A🏠 *Endereço:* ${endereco}%0A`;

        const numero = "5591999999999"; // Troque pelo seu número real
        const url = `https://wa.me/${numero}?text=${mensagem}`;
        window.open(url, "_blank");
    });
});









