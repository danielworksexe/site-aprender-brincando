document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de teoria do alfabeto,
    // procurando por um elemento específico dela, como a grade do alfabeto.
    const paginaAlfabetoGrid = document.querySelector('.pagina-etapa .alfabeto-grid');

    if (paginaAlfabetoGrid) {
        console.log("Script da Página de Teoria do Alfabeto Carregado!");

        // Seleciona todos os botões de áudio para a pronúncia das letras
        const botoesAudioLetra = document.querySelectorAll('.btn-audio-letra-alfabeto');
        if (botoesAudioLetra.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudioLetra.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    if (audioParaTocar) {
                        window.tocarAudioControlado(audioParaTocar, this);
                    } else {
                        console.error("Elemento de áudio não encontrado para letra:", targetAudioId);
                    }
                });
            });
        }

        // Seleciona todos os botões de áudio para os exemplos de palavras
        const botoesAudioPalavras = document.querySelectorAll('.btn-audio-palavras-alfabeto');
        if (botoesAudioPalavras.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudioPalavras.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    if (audioParaTocar) {
                        window.tocarAudioControlado(audioParaTocar, this);
                    } else {
                        console.error("Elemento de áudio não encontrado para palavras:", targetAudioId);
                    }
                });
            });
        }
    }
});