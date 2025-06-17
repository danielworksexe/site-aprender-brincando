document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de teoria dos encontros vocálicos
    const paginaEncontrosVocalicos = document.querySelector('.pagina-etapa .encontros-grid'); 

    if (paginaEncontrosVocalicos) {
        console.log("Script da Página de Teoria dos Encontros Vocálicos Carregado!");

        // Função auxiliar local para configurar listeners de botões de áudio nesta página
        function setupAudioListenersParaPaginaEncontros(botoes) {
            if (botoes && botoes.length > 0) {
                botoes.forEach(botao => {
                    botao.addEventListener('click', function() {
                        const targetAudioId = this.getAttribute('data-audio-target');
                        const audioParaTocar = document.getElementById(targetAudioId);
                        
                        if (audioParaTocar && typeof window.tocarAudioControlado === 'function') {
                            window.tocarAudioControlado(audioParaTocar, this);
                        } else if (!audioParaTocar) {
                            console.error("Elemento de áudio não encontrado:", targetAudioId);
                        } else {
                            console.error("Função tocarAudioControlado não está definida globalmente.");
                        }
                    });
                });
            }
        }

        // Áudios das Explicações dos Tipos de Encontros (Ditongo, Tritongo, Hiato)
        const botoesAudioExplicacaoEV = document.querySelectorAll('.tipo-encontro-header .btn-audio-auxiliar');
        setupAudioListenersParaPaginaEncontros(botoesAudioExplicacaoEV);

        // Áudios da Pronúncia dos Encontros Vocálicos específicos
        const botoesAudioEncontroEV = document.querySelectorAll('.apresentacao-encontro .btn-audio-encontro');
        setupAudioListenersParaPaginaEncontros(botoesAudioEncontroEV);

        // Áudios dos Exemplos de Palavras de cada Encontro Vocálico
        const botoesAudioPalavrasEncontroEV = document.querySelectorAll('.apresentacao-encontro .btn-audio-palavras-encontro');
        setupAudioListenersParaPaginaEncontros(botoesAudioPalavrasEncontroEV);
    }
});