document.addEventListener('DOMContentLoaded', () => {
    const carrosselContainer = document.querySelector(".carrossel-container");
    const btnComecarElement = document.querySelector('.btn-comecar');
    const audioRecepcaoIndex = document.getElementById('audioRecepcao'); 
    const audioBtnComecarIndex = document.getElementById('audioVamosComecar');

    // Verifica se estamos na página que realmente contém esses elementos para evitar erros
    if (carrosselContainer || btnComecarElement || audioRecepcaoIndex || audioBtnComecarIndex ) {
        console.log("Script da Página Inicial Carregado!");

        // --- Áudio de Recepção (Específico para index.html) ---
        if (audioRecepcaoIndex && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('index'))) {
             audioRecepcaoIndex.play()
                .then(() => {
                    console.log("Áudio de recepção da página inicial tocando.");
                })
                .catch(error => {
                    console.warn("Autoplay do áudio de recepção da página inicial foi bloqueado:", error.message);
                });
        }

        // --- Carrossel (Específico para index.html) ---
        if (carrosselContainer) {
            const carrosselSlidesElements = carrosselContainer.querySelectorAll(".slide"); // Mais específico
            const indicadoresCarrossel = document.querySelectorAll(".indicador"); // Seletor para os indicadores

            if (carrosselSlidesElements.length > 0) {
                let slideIndexCarrossel = 0;
                let autoSlideIntervalCarrossel;

                // Função para os indicadores no HTML
                window.mostrarSlideAtual = function(n) { 
                    mostrarSlideCarrosselLocal(n - 1); 
                    resetAutoSlideCarrosselLocal();
                };

                function proximoSlideCarrosselLocal() {
                    slideIndexCarrossel++;
                    mostrarSlideCarrosselLocal(slideIndexCarrossel);
                }

                function mostrarSlideCarrosselLocal(n) { 
                    let i;
                    if (carrosselSlidesElements.length === 0) return;

                    if (n >= carrosselSlidesElements.length) { slideIndexCarrossel = 0; }
                    if (n < 0) { slideIndexCarrossel = carrosselSlidesElements.length - 1; }

                    for (i = 0; i < carrosselSlidesElements.length; i++) {
                        carrosselSlidesElements[i].style.display = "none";
                        carrosselSlidesElements[i].classList.remove("fade");
                    }
                    for (i = 0; i < indicadoresCarrossel.length; i++) {
                        indicadoresCarrossel[i].classList.remove("ativo");
                    }
                    
                    if (carrosselSlidesElements[slideIndexCarrossel]) {
                        carrosselSlidesElements[slideIndexCarrossel].style.display = "block";
                        setTimeout(() => { 
                            if (carrosselSlidesElements[slideIndexCarrossel]) carrosselSlidesElements[slideIndexCarrossel].classList.add("fade"); 
                        }, 10); 
                    }
                    if (indicadoresCarrossel[slideIndexCarrossel]) {
                        indicadoresCarrossel[slideIndexCarrossel].classList.add("ativo");
                    }
                }

                function startAutoSlideCarrosselLocal() {
                    clearInterval(autoSlideIntervalCarrossel); 
                    autoSlideIntervalCarrossel = setInterval(proximoSlideCarrosselLocal, 3000);
                }

                function resetAutoSlideCarrosselLocal() {
                    clearInterval(autoSlideIntervalCarrossel);
                    startAutoSlideCarrosselLocal();
                }
                
                mostrarSlideCarrosselLocal(slideIndexCarrossel); 
                startAutoSlideCarrosselLocal(); 
            }
        }

        // --- Áudio Botão "Vamos Começar!" (Específico para index.html) ---
        if (btnComecarElement && audioBtnComecarIndex) {
            btnComecarElement.addEventListener('mouseover', () => {
                if (typeof window.pararAudioGlobal === 'function') {
                    window.pararAudioGlobal(audioBtnComecarIndex); 
                }
                if (audioRecepcaoIndex && !audioRecepcaoIndex.paused) { 
                    audioRecepcaoIndex.pause(); 
                    audioRecepcaoIndex.currentTime = 0; 
                }
                
                if (audioBtnComecarIndex.paused || audioBtnComecarIndex.currentTime === 0) {
                    audioBtnComecarIndex.play().catch(e => console.log("Erro áudio Começar (mouseover): ", e.message));
                } else {
                    audioBtnComecarIndex.pause(); 
                    audioBtnComecarIndex.currentTime = 0;
                    audioBtnComecarIndex.play().catch(e => console.log("Erro áudio Começar (mouseover replay): ", e.message));
                }
            });
        }
    }
});