document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de teoria das sílabas
    const paginaSilabasContainer = document.querySelector('.pagina-etapa .conteudo-etapa');

    if (paginaSilabasContainer && document.querySelector('.silabas-grid')) { 
        console.log("Script da Página de Teoria das Sílabas Carregado!");

        // Função auxiliar para configurar listeners de botões de áudio
        function setupAudioButtonListeners(selector) {
            const botoes = document.querySelectorAll(selector);
            if (botoes.length > 0 && typeof window.tocarAudioControlado === 'function') {
                botoes.forEach(botao => {
                    botao.addEventListener('click', function() {
                        const targetAudioId = this.getAttribute('data-audio-target');
                        const audioParaTocar = document.getElementById(targetAudioId);
                        
                        if (audioParaTocar) {
                            window.tocarAudioControlado(audioParaTocar, this);
                        } else {
                            console.error(`Elemento de áudio não encontrado para o seletor ${selector}:`, targetAudioId);
                        }
                    });
                });
            }
        }

        // Configura áudio para os botões de famílias silábicas simples
        setupAudioButtonListeners('.btn-audio-familia');

        // Configura áudio para os botões de exemplos de palavras das famílias silábicas simples
        setupAudioButtonListeners('.btn-audio-exemplos-familia');

        // Configura áudio para os botões de sílabas complexas individuais
        setupAudioButtonListeners('.btn-audio-silaba-complexa');

        // Configura áudio para os botões de exemplos de palavras das sílabas complexas
        setupAudioButtonListeners('.btn-audio-exemplos-complexa');

        // Adiciona listener para outros botões de áudio auxiliares na página (como o da explicação de contar sílabas)
        setupAudioButtonListeners('.btn-audio-auxiliar');

    }
});