document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de teoria das vogais, procurando por um elemento específico dela.
    const paginaVogaisGrid = document.querySelector('.pagina-etapa .vogais-grid'); 

    if (paginaVogaisGrid) {
        console.log("Script da Página de Teoria das Vogais Carregado!");

        // Seleciona todos os botões de áudio para a pronúncia das letras/vogais nesta página
        const botoesAudioLetraVogais = document.querySelectorAll('.apresentacao-letra .btn-audio-letra');
        if (botoesAudioLetraVogais.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudioLetraVogais.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    if (audioParaTocar) {
                        window.tocarAudioControlado(audioParaTocar, this);
                    } else {
                        console.error("Elemento de áudio não encontrado para letra/vogal:", targetAudioId);
                    }
                });
            });
        }

        // Seleciona todos os botões de áudio para os exemplos de palavras das vogais nesta página
        const botoesAudioPalavrasVogais = document.querySelectorAll('.apresentacao-letra .btn-audio-palavras');
        if (botoesAudioPalavrasVogais.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudioPalavrasVogais.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    if (audioParaTocar) {
                        window.tocarAudioControlado(audioParaTocar, this);
                    } else {
                        console.error("Elemento de áudio não encontrado para palavras de vogal:", targetAudioId);
                    }
                });
            });
        }
    }
});