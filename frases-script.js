document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de teoria das frases,
    // procurando por um elemento específico dela, como a grade de exemplos.
    const paginaFrasesContainer = document.querySelector('.pagina-etapa .frases-exemplos-grid');

    if (paginaFrasesContainer) {
        console.log("Script da Página de Teoria das Frases Carregado!");

        // Seleciona todos os botões de áudio auxiliares DENTRO da seção de explicação
        const botoesAudioExplicacao = document.querySelectorAll('.explicacao-frases-container .btn-audio-auxiliar');
        
        if (botoesAudioExplicacao.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudioExplicacao.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    
                    if (audioParaTocar) {
                        // Chama a função global para tocar o áudio
                        window.tocarAudioControlado(audioParaTocar, this);
                    } else {
                        console.error("Elemento de áudio não encontrado:", targetAudioId);
                    }
                });
            });
        }
    }
});