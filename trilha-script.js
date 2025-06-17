document.addEventListener('DOMContentLoaded', () => {
    const trilhaAprendizagemSection = document.querySelector('section.trilha-aprendizagem');

    if (trilhaAprendizagemSection) {
        console.log("Script da Trilha de Aprendizagem Carregado!");

        const barraDeProgressoTrilhaEl = document.getElementById('barraDeProgressoTrilha');
        const porcentagemProgressoTrilhaTextoEl = document.getElementById('porcentagemProgressoTrilha');
        const linksEtapasTrilha = trilhaAprendizagemSection.querySelectorAll('.lista-etapas .etapa-link');
        const btnLimparProgressoTrilhaEl = document.getElementById('btnLimparProgressoTrilha');
        
        // Constantes para a lógica de progresso da trilha
        // Devem ser as mesmas usadas em global-script.js para consistência ao ler/gravar no localStorage
        const totalEtapasTrilha = 7; 
        const localStorageKeyProgressoTrilha = 'progressoAlfabetizacaoTrilha'; 
        let progressoAtualTrilha;

        function atualizarVisualProgressoTrilha(porcentagem) {
            if (barraDeProgressoTrilhaEl && porcentagemProgressoTrilhaTextoEl) {
                const percentualArredondado = Math.round(porcentagem);
                barraDeProgressoTrilhaEl.style.width = percentualArredondado + '%';
                porcentagemProgressoTrilhaTextoEl.textContent = percentualArredondado + '%';
            }
            if (linksEtapasTrilha.length > 0) {
                linksEtapasTrilha.forEach((link) => {
                    const etapaNumero = parseInt(link.getAttribute('data-etapa'));
                    const porcentagemParaConcluirEstaEtapa = (etapaNumero / totalEtapasTrilha) * 100;
                    // Adiciona a classe 'concluida' se o progresso for maior ou igual à porcentagem da etapa E maior que 0
                    if (porcentagem >= porcentagemParaConcluirEstaEtapa && porcentagem > 0) {
                        link.classList.add('concluida');
                    } else {
                        link.classList.remove('concluida');
                    }
                });
            }
        }

        function salvarProgressoTrilha(porcentagem) {
            localStorage.setItem(localStorageKeyProgressoTrilha, porcentagem.toString());
        }

        function carregarProgressoTrilha() {
            const progressoSalvo = parseFloat(localStorage.getItem(localStorageKeyProgressoTrilha));
            if (!isNaN(progressoSalvo) && progressoSalvo >= 0) {
                atualizarVisualProgressoTrilha(progressoSalvo);
                return progressoSalvo;
            }
            atualizarVisualProgressoTrilha(0); // Se não houver nada salvo, começa em 0%
            return 0;
        }
        
        progressoAtualTrilha = carregarProgressoTrilha(); 

        linksEtapasTrilha.forEach(link => {
            link.addEventListener('click', function() {
                const etapaClicadaNumero = parseInt(this.getAttribute('data-etapa'));
                const porcentagemEtapaClicada = (etapaClicadaNumero / totalEtapasTrilha) * 100;
                
                // Ao clicar, garante que o progresso armazenado é pelo menos o da etapa clicada
                // A lógica em global-script.js também atualiza o progresso ao visitar as páginas
                let progressoSalvoAtual = parseFloat(localStorage.getItem(localStorageKeyProgressoTrilha)) || 0;
                if (porcentagemEtapaClicada > progressoSalvoAtual) {
                    salvarProgressoTrilha(porcentagemEtapaClicada);
                    progressoAtualTrilha = porcentagemEtapaClicada; // Atualiza a variável local também
                } else {
                    progressoAtualTrilha = progressoSalvoAtual; // Mantém o mais alto já salvo
                }
                atualizarVisualProgressoTrilha(progressoAtualTrilha); 
                // A navegação para o href do link ocorrerá normalmente
            });
        });

        if (btnLimparProgressoTrilhaEl) {
            btnLimparProgressoTrilhaEl.addEventListener('click', () => {
                progressoAtualTrilha = 0;
                atualizarVisualProgressoTrilha(0);
                salvarProgressoTrilha(0); 
                console.log("Progresso da Trilha limpo.");
            });
        }

        // Áudios dos Botões de Etapa na Trilha
        const botoesAudioEtapasTrilha = trilhaAprendizagemSection.querySelectorAll('.lista-etapas .btn-audio-etapa');
        if (botoesAudioEtapasTrilha.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudioEtapasTrilha.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    if (audioParaTocar) {
                        window.tocarAudioControlado(audioParaTocar, this);
                    }
                });
            });
        }
        // Re-carrega e atualiza o visual no caso de a página ser recarregada ou voltada pelo navegador.
        progressoAtualTrilha = carregarProgressoTrilha(); 
    }
});