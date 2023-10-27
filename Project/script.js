document.addEventListener("DOMContentLoaded", function () { //
    const formCadastroPecas = document.getElementById(`CadastroPecas`); //Está linha seleciona o elemento do formulário com o ID 'CadastroPecas' e o armazena na variável 'formCadastroPecas'. Isso permite que você acesse facilmente o formulário
    const inputNomeProduto = document.getElementById(`pecas`); // Está linha seleciona o campo de entrada de nome do produto com ID 'pecas' e o armazena na variável 'inputNomeProduto'
    const inputPrecoProduto = document.getElementById(`preco`); // Está linha seleciona o campo de entrada de preço do produto com o ID 'preco' e o armazena na variável 'inputPrecoProduto'.
    const productList = document.getElementById('productList'); // Está linha seleciona o elemento 'ul' com o ID 'producrList' e o armazena na variável 'productList'. 
    const nomeCliente = document.getElementById('nome');
    const veiculo = document.getElementById('veiculo');
    
   
    const produtosCadastrados = []; // vetor para armazenar os dados

    formCadastroPecas.addEventListener("submit", function (event) { // Está linha adiciona um ouvinte de evento ao formulário com o ID 'CadastroPecas' que será adicionado quando o formulário for enviado.
        event.preventDefault(); // Essa linha previne o comportamento padrão do envio de formulário, que faria com que a página fosse recarregada.

        const nomeProduto = inputNomeProduto.value.trim(); // Essas duas linhas obtêm os valores dos campos de entrada de nome e valor, removem os espacos brancos usando o trim
        const precoProduto = parseFloat(inputPrecoProduto.value.trim()); // e convete a string em numero com parsefloat

        const produtoPreco = {  //Cria um objeto 'produtoPreco' com as informações do produto (nome e preço) coletadas no formulario
            nome: nomeProduto,
            preco: precoProduto  
        };

        produtosCadastrados.push(produtoPreco); // Adiciona o objeto 'produtoPreco' ao vetor 'produtosCadastros'

        inputNomeProduto.value = ""; //Essas linhas limpam os campos de entrada do formulário após o cadastro do produto, definindo seus valores como uma string vazia.
        inputPrecoProduto.value = "";

        displayProducts(); // executa a função displayProducts
        
    });

    function displayProducts() { 
        productList.innerHTML = " "; //Esta linha limpa o conteúdo da lista de produtos (ul) definindo seu innerHTML como uma string vazia.

        for (let i = 0; i < produtosCadastrados.length; i++){ // Esta linha inicia um loop for que percorre todos os produtos cadastrados no vetor 'produtosCadastrados'.
            produtoPreco = produtosCadastrados[i]; // Esta linha obtém o produto atual do vetor produtosCadastrados dentro do loop.
            const li = document.createElement('li'); // Aqui, um elemento <li> é criado para representar o produto na lista.
            li.textContent = `${produtoPreco.nome}  | R$${produtoPreco.preco.toFixed(2)}`; // Esta linha define o texto do elemento <li> com o nome e o preço do produto formatados.
            productList.appendChild(li); // Finalmente, esta linha adiciona o elemento <li> à lista de produtos (ul) na página.


            const removeButton = document.createElement('button'); // variavel botao excluir 
            removeButton.id = 'btnRemove';
            removeButton.textContent = 'excluir \n'; // e seu texto defido como 'exlcuir'
            removeButton.addEventListener('click', function () { // evento que ocorre ao aperta o botao excluir
                removeProduct(i); // chama a função remover em determinado lugar
            });

            li.appendChild(removeButton); // adiciona o botao de excluir em cada produto da lista
            productList.appendChild(li); // 

        }
    }

    function removeProduct(i) { // funcao remover produo 
        if (i >= 0 && i < produtosCadastrados.length) { // verificacao se existe esse produto 
            produtosCadastrados.splice(i, 1); // remoção 

            displayProducts(); // atualiza a lista
        }
    }

    function calcularTotal(produtos) {
        let total = 0;
  
        for (let i = 0; i < produtos.length; i++) {
            total += produtos[i].preco;
         }
  
        return total.toFixed(2); // Retorna o total formatado com duas casas decimais.
    }

    const imagemLogo = new Image();
    imagemLogo.src = 'al.png'

    const botaoImprimir = document.getElementById('botaoImprimir'); // armazenando a variavel botao 

    botaoImprimir.addEventListener("click", () => {  // evento ao clicar no botao imprimir
        
        const printWindow = window.open('', '', 'width=1000,height=900'); // Crie uma janela temporária para exibir a lista de produtos
    
        // Adicione o conteúdo que você deseja imprimir na janela temporária
        printWindow.document.write('<html><head><title>AL Motos Peças e Acessórios</title></head><body>');
        printWindow.document.write('<img src="' + imagemLogo.src + '" style="width: 150px; height: 100px;"></img>');
        printWindow.document.write('<div style="display: inline-block; vertical-align: top; font-size: 13px;">'); // Inicie uma div para colocar o texto ao lado da imagem
        printWindow.document.write('<p>R: Reinaldo Schimithausen,1200 sala 2 <br> Cordeiros, Itajaí <br> CNPJ: 09.370.904/0001-83 <br> Fone: (47)3241-4450 <br> Celular: (47)99220-1818</p>');
        printWindow.document.write('</div>');
        printWindow.document.write('<br>');
        printWindow.document.write('<br>');
        printWindow.document.write('Nome: ' + nomeCliente.value);
        printWindow.document.write('<br>');
        printWindow.document.write('Modelo: ' + veiculo.value);
        printWindow.document.write('<h3 class="centro"><span>Orçamento</span></h3>');
        printWindow.document.write('<div style="border: 2px solid #000; padding: 10px; height: 700px;">'); // Inicie uma div com borda e margem
        printWindow.document.write('<style>.centro { text-align: center;; }</style>');
        printWindow.document.write('<table border="1" style="width: 100%;">');
        printWindow.document.write('<tr><th>Produto</th><th>Preço</th></tr>');
        
        for (let i = 0; i < produtosCadastrados.length; i++) { //Você utiliza um loop for para iterar pelos produtos cadastrados e escrever cada um deles na lista da janela temporária. Os produtos são formatados com seus nomes e preços.
            const produtoPreco = produtosCadastrados[i];
            printWindow.document.write(`<tr><td>${produtoPreco.nome}</td><td>R$${produtoPreco.preco.toFixed(2)}</td></tr>`);
        }
        
        printWindow.document.write('</table></body></html>'); //Você fecha as tags HTML da lista e do corpo do documento.

        const total = calcularTotal(produtosCadastrados);
        printWindow.document.write('<p>Total: R$' + '<span>' + total + '</span>' + '</p>');
        printWindow.document.write('</div>');
        printWindow.document.close(); //Esta linha fecha o documento HTML na janela temporária.

        printWindow.print(); // Use window.print() na janela temporária
        printWindow.close(); // Feche a janela temporária após a impressão
        location.reload();
        
    }); 

    
});
