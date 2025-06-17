document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de teoria dos textos,
    // procurando por um elemento específico dela, como o container de explicação.
    const paginaTextosContainer = document.querySelector('.pagina-etapa .explicacao-container-texto');

    if (paginaTextosContainer) {
        console.log("Script da Página de Teoria dos Textos Carregado!");

        // Seleciona todos os botões de áudio auxiliares desta página
        const botoesAudio = document.querySelectorAll('.btn-audio-auxiliar');
        
        if (botoesAudio.length > 0 && typeof window.tocarAudioControlado === 'function') {
            botoesAudio.forEach(botao => {
                botao.addEventListener('click', function() {
                    const targetAudioId = this.getAttribute('data-audio-target');
                    const audioParaTocar = document.getElementById(targetAudioId);
                    
                    if (audioParaTocar) {
                        // Chama a função global para tocar o áudio e gerenciar o estado do botão
                        window.tocarAudioControlado(audioParaTocar, this);
                    } else {
                        console.error("Elemento de áudio não encontrado:", targetAudioId);
                    }
                });
            });
        }
    }
});