// script.js
const configuracao = document.getElementById('configuracao');
const colunasInput = document.getElementById('colunas');
const linhasInput = document.getElementById('linhas');
const gerarLayoutButton = document.getElementById('gerarLayout');
const auditorio = document.getElementById('auditorio');
const cadeirasContainer = document.getElementById('cadeiras');

// Função para criar uma cadeira
function criarCadeira(x, y) {
    const cadeira = document.createElement('div');
    cadeira.classList.add('cadeira');
    cadeira.style.left = `${x}px`;
    cadeira.style.top = `${y}px`;
    cadeira.textContent = '0'; // Inicialmente, nenhuma participação
    cadeira.dataset.participacoes = 0; // Contador de participações

    // Adicionar evento de clique
    cadeira.addEventListener('click', () => {
        if (!cadeira.classList.contains('desativada')) {
            let participacoes = parseInt(cadeira.dataset.participacoes);
            participacoes += 1;
            cadeira.dataset.participacoes = participacoes;
            cadeira.textContent = participacoes;

            // Desativar a cadeira após 3 participações
            if (participacoes >= 3) {
                cadeira.classList.add('desativada');
                alert(`Assento (${x}, ${y}) desativado: Limite de participações atingido.`);
            }
        }
    });

    return cadeira;
}

// Função para gerar o layout do auditório
function gerarLayout() {
    // Limpar cadeiras existentes
    cadeirasContainer.innerHTML = '';

    // Obter número de colunas e linhas
    const colunas = parseInt(colunasInput.value);
    const linhas = parseInt(linhasInput.value);

    // Definir espaçamento entre cadeiras
    const espacamentoX = 60; // Distância horizontal entre cadeiras
    const espacamentoY = 60; // Distância vertical entre cadeiras

    // Calcular posições das cadeiras
    for (let linha = 0; linha < linhas; linha++) {
        for (let coluna = 0; coluna < colunas; coluna++) {
            const x = coluna * espacamentoX + 20; // Margem esquerda
            const y = linha * espacamentoY + 20; // Margem superior
            cadeirasContainer.appendChild(criarCadeira(x, y));
        }
    }
}

// Evento para gerar o layout ao clicar no botão
gerarLayoutButton.addEventListener('click', gerarLayout);

// Gerar layout inicial (opcional)
gerarLayout();