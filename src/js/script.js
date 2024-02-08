$(document).ready(function(){
    var precoProduto = 0; //* variavel para calcular o juros depois
    var numeros = []; //* array para calcular o preço final

    //! DIVS ESCONDIDAS
    $('#conteudo-carrinho').hide();
    $('#conteudo-opcoes').hide();
    $('#imagemCartao').hide();
    $('#imagemCartao2').hide();
    $('#numero-incorreto').hide();
    $('#concluido').hide();


    //! ABRIR CARRINHO
    $('#abrir-carrinho').click(function(){ 
        $('#conteudo-carrinho').show();
        $('body').css('overflow', 'hidden'); //* tela nao de mexe
    })

    //! FECHAR CARRINHO
    $('#fechar-carrinho').click(function(){ 
        $('#conteudo-carrinho').hide(); 
        $('body').css('overflow', 'auto'); //* tela volta a se mexer
    })


    //! CLICK PARA ADICIONAR AO CARRINHO
    $('.adicionar-carrinho').click(function() { 
    $('#p-carrinho-vazio').remove();
    /// $('#carrinho-vazio').hide(); 
    var card = $(this).closest('.card'); //* Encontra o elemento card relacionado ao botão clicado
    var nome = card.find('.produtos-titulos').text(); //* Obtém o texto do elemento h3 (nome do produto)
    var preco = card.find('.produto-preços').text(); //* Obtém o texto do elemento h2 (preço do produto)
        
    var n = parseFloat(preco.replace('R$', '').replace(',', '.'));
    
    numeros.push(n); //* tranforma o preço em valor float e adiciona no array
    precoProduto += n;    

    var paragrafoProdutos = '<div class="paragrafoProdutos">'+ '<strong>' + nome + '</strong>' + ' = ' + preco + '<button class="button-remover">.</button></div>' +'</div>'; //* cria o paragrafo com os produtos do carrinho     
    $('#carrinho').append(paragrafoProdutos); //* o paragrafo é adicionado a uma div existente no html
        
    });

   
    $('#conteudo-carrinho').on('click', '.button-remover', function(){$(this).parent().remove();
        }); //* click no botao de remover os elementos do carrinho

    //! CLICA PRA FINALIZAR A COMPRA 
    $('#abrir-opcoes').click(function(){ 
        $('#conteudo-carrinho').hide();//* esconde conteudo do carrinho
        $('#conteudo-opcoes').show(); //* mostra a div de cartao e pix

        var selecionarParcelas = $('#parcelas');
        for(var i = 1; i <= 5; i++){
            var valorParcela = precoProduto / i;
            var juros = 0;

            if (i > 3) {
                juros = valorParcela * 0.03; //* Calcula o valor dos juros para parcelas a partir da terceira
            }

            valorParcela += juros; //* Adiciona juros à parcela, se aplicável

            selecionarParcelas.append('<option value="' + i + '"> ' + i + 'x de R$ ' + valorParcela.toFixed(2) + '</option>');
        }
    
    })

    //! FUNCIONAMENTO DAS ABAS DE CARTÃO E PIX
    $('#aba2').click(function(){
        $('#cartao').hide();
        $('#pix').show();
    })

    $('#aba1').click(function(){
        $('#pix').hide();
        $('#cartao').show();
    })

    //! NUMERO DO CARTAO
    $('#numero').blur(function(){
        var numeroDigitado = $(this).val();
        $('#numero-invalido').hide();

        if (numeroDigitado.indexOf('1234') === 0){
            $('#numero-incorreto').hide();
            $('#imagemCartao2').hide();
            $('#imagemCartao').show();
        } 
        else if(numeroDigitado.indexOf('4321') === 0){
            $('#numero-incorreto').hide();
            $('#imagemCartao').hide();
            $('#imagemCartao2').show();
        }

        else{
            $('#imagemCartao').hide();
            $('#imagemCartao2').hide();
           
        }
    })


    //! FECHAR DIV DAS OPÇÕES
    $('#fechar-opcoes').click(function(){ 
        $('#conteudo-opcoes').hide(); 
        $('body').css('overflow', 'auto'); //* tela volta a se mexer
    })

    //! VERIFICAÇÃO DO FORM

    var cpfInput = $('#cpf');
    var cpfMask; //* Aplicando a máscara para o número do CPF 
    cpfMask = IMask(cpfInput[0], {
      mask: '000.000.000-00' //* Definindo a máscara para o formato de CPF
    });

    var numeroCartao = $('#numero');
    var numeroMask;
    numeroMask = IMask(numeroCartao[0], {
        mask : '0000 0000 0000 0000',
        maxLength: 19
    });

    var validadeinput = $('#validade');
    var validadeMask;
    validadeMask = IMask(validadeinput[0], {
        mask : '00/00'
    });

    var cvvInput = $('#codigo');
    var codigoMask;
    codigoMask = IMask(cvvInput[0], {
        mask: '000'
    })

    //! CASO DE CERTO AS VERIFICAÇÕES, BOTAO DE CONCLUIR
    $('#concluir').click(function(){
        $('#concluido').show();

        var compraConcluida = '<p id="p">' + 'Compra Conluida Com Sucesso'  +'</p>' ;    
        $('#concluido').append(compraConcluida);

        setTimeout(function() {
            $('#p').remove();
        }, 3000);
        

    })

    $('#concluir-pix').click(function(){
        $('#concluido-pix').show();
        var compraConcluida = '<p id="p-pix">' + 'Compra Conluida Com Sucesso'  +'</p>' ;    
        $('#concluido-pix').append(compraConcluida);

        setTimeout(function() {
            $('#p-pi2x').remove();
        }, 3000);5016
    })
})
