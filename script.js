let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const produtos = [
  {
    id: 1,
    nome: "Retatrutide ZPHC",
    cartao: 1390,
    pix: 1350,
    imagem: "imagens/produto_1_1.png",
    descricao: "Versão de retatrutida (agonista triplo GLP-1, GIP e Glucagon). Comercializada como pó liofilizado para reconstituição."
  },
  {
    id: 2,
    nome: "Lipoless 4 ampolas",
    cartao: 1200,
    pix: 1180,
    imagem: "imagens/produto_2_1.jpeg",
    descricao: "Produto à base de tirzepatida. Pode ser encontrado em ampolas ou seringas prontas, dependendo do fornecedor."
  },
  {
    id: 3,
    nome: "TG ampola",
    cartao: 430,
    pix: 420,
    imagem: "imagens/produto_3_1.png",
    descricao: "Tirzepatida em ampola com dosagens variadas. Atua aumentando saciedade e controle metabólico."
  },
  {
    id: 4,
    nome: "TG caixa",
    cartao: 1200,
    pix: 1180,
    imagem: "imagens/produto_4_1.png",
    descricao: "Caixa com múltiplas ampolas de tirzepatida. Mesmo mecanismo metabólico."
  },
  {
    id: 5,
    nome: "Lipoless 60mg",
    cartao: 1180,
    pix: 1160,
    imagem: "imagens/produto_5_1.png",
    descricao: "Tirzepatida com maior variedade de dosagens disponíveis."
  },
  {
    id: 6,
    nome: "Tirzec 60mg",
    cartao: 1190,
    pix: 1170,
    imagem: "imagens/produto_6_1.png",
    descricao: "Tirzepatida com apresentação padronizada, geralmente concentração fixa."
  },
  {
    id: 7,
    nome: "Lipoland 15mg",
    cartao: 430,
    pix: 420,
    imagem: "imagens/produto_7_1.png",
    descricao: "Tirzepatida com padrão de formulação próprio do fabricante."
  },
  {
    id: 8,
    nome: "Lipoless 15mg",
    cartao: 410,
    pix: 400,
    imagem: "imagens/produto_8_1.png",
    descricao: "Ampola individual de tirzepatida 15mg."
  },
  {
    id: 9,
    nome: "Retatrutide Verde",
    cartao: 1790,
    pix: 1750,
    imagem: "imagens/produto_9_1.png",
    descricao: "Retatrutida (agonista triplo). Pode variar concentração conforme lote."
  },
  {
    id: 10,
    nome: "GHK-CU",
    cartao: 1500,
    pix: 1450,
    imagem: "imagens/produto_10_1.png",
    descricao: "Peptídeo regenerativo ligado ao cobre. Estimula colágeno, melhora textura e qualidade da pele."
  }
];

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function verProduto(id) {
  const produto = produtos.find(p => p.id === id);
  localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
  window.location.href = "produto.html";
}

function carregarProduto() {
    const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));
    if (!produto) return;
  
    document.getElementById("imgProduto").src = produto.imagem;
    document.getElementById("nomeProduto").innerText = produto.nome;
    document.getElementById("descricaoProduto").innerText = produto.descricao;
    document.getElementById("precoCartao").innerText = "Cartão: R$ " + produto.cartao;
    document.getElementById("precoPix").innerText = "Pix: R$ " + produto.pix;
  
    document.getElementById("btnAdicionar").onclick = function() {

        carrinho.push({
            ...produto,
            quantidade: 1
          });
          
          salvar();
          window.location.href = "carrinho.html"};
}

  function mostrarCarrinho() {
    let lista = document.getElementById("lista");
    let tipo = document.getElementById("pagamento").value;
    lista.innerHTML = "";
  
    carrinho.forEach((item, index) => {
  
      if (!item.quantidade) {
        item.quantidade = 1;
      }
  
      let preco = tipo === "pix"
        ? parseFloat(item.pix)
        : parseFloat(item.cartao);
  
      lista.innerHTML += `
        <div class="item-carrinho">
          
          <div class="item-info">
            <img src="${item.imagem}" class="miniatura">
            <div>
              <strong>${item.nome}</strong>
              <p>R$ ${preco.toFixed(2)}</p>
            </div>
          </div>
  
          <div class="controles">
            <button onclick="diminuir(${index})">-</button>
            <span>${item.quantidade}</span>
            <button onclick="aumentar(${index})">+</button>
          </div>
  
          <div class="subtotal">
            R$ ${(preco * item.quantidade).toFixed(2)}
          </div>
  
          <button class="remover" onclick="remover(${index})">🗑️</button>
  
        </div>
      `;
    });
  
    salvar();
  atualizarTotal();
  atualizarContador();  // 👈 AQUI


  }

  function atualizarTotal() {
    let tipo = document.getElementById("pagamento").value;
    let total = 0;
    let totalCartao = 0;
  
    carrinho.forEach(item => {
      let precoPix = parseFloat(item.pix);
      let precoCartao = parseFloat(item.cartao);
  
      totalCartao += precoCartao * item.quantidade;
  
      let preco = tipo === "pix" ? precoPix : precoCartao;
      total += preco * item.quantidade;
    });
  
    document.getElementById("total").innerHTML =
      "Total: R$ " + total.toFixed(2);
  
    if (tipo === "pix") {
      let economia = totalCartao - total;
      if (economia > 0) {
        document.getElementById("total").innerHTML +=
          `<p style="color:green; font-size:14px;">
            Você economiza R$ ${economia.toFixed(2)} pagando no Pix 🎉
          </p>`;
      }
    }
  }

function remover(index) {
  carrinho.splice(index, 1);
  salvar();
  mostrarCarrinho();
}

function finalizar() {

  // Verifica se o carrinho está vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (carrinho.length === 0) {
  alert("Seu carrinho está vazio! Adicione um produto antes de finalizar.");
  return;
}

    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let telefone = document.getElementById("telefone").value;
    let tipo = document.getElementById("pagamento").value;
  
    if (!nome || !endereco || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }
  
    let mensagem = " *NOVO PEDIDO - TIRZEPBH* \n\n";
  
    carrinho.forEach(item => {
      let preco = tipo === "pix"
        ? parseFloat(item.pix)
        : parseFloat(item.cartao);
  
      mensagem += ` ${item.nome} x${item.quantidade} - R$ ${(preco * item.quantidade).toFixed(2)}\n`;
    });
  
    mensagem += "\n";
    mensagem += ` Pagamento: ${tipo.toUpperCase()}\n`;
    mensagem += "🚚 Frete: A negociar conforme região de BH\n";
    mensagem += ` Total: R$ ${document.getElementById("total").innerText.replace("Total: R$ ", "")}\n\n`;
  
    mensagem += " Dados do Cliente:\n";
    mensagem += `Nome: ${nome}\n`;
    mensagem += `Endereço: ${endereco}\n`;
    mensagem += `Telefone: ${telefone}`;
  
    let url = "https://wa.me/5537991236448?text=" + encodeURIComponent(mensagem);
  
    window.open(url, "_blank");
  }

function aumentar(index) {
    carrinho[index].quantidade++;
    salvar();
    mostrarCarrinho();
  }
  
  function diminuir(index) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade--;
    }
    salvar();
    mostrarCarrinho();
  }
  
  function remover(index) {
    carrinho.splice(index, 1);
    salvar();
    mostrarCarrinho();
  }


  function atualizarContador() {
    let carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];
  
    let totalItens = 0;
  
    carrinhoSalvo.forEach(item => {
      totalItens += item.quantidade ? item.quantidade : 1;
    });
  
    let contador = document.getElementById("contador");
  
    if (contador) {
      contador.innerText = totalItens;
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    atualizarContador();
  });