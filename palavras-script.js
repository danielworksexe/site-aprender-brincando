document.addEventListener('DOMContentLoaded', () => {
    const paginaPalavrasGrid = document.querySelector('.pagina-etapa .palavras-grid');

    if (paginaPalavrasGrid) {
        console.log("Script da Página de Teoria das Palavras Carregado!");

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

        const palavrasData = [
            // 15 Palavras em Letra Bastão
            { palavra: "BOLA", silabas: ["BO", "LA"], audioDrill: "audioDrillBola", audioPalavra: "audioPalavraBola", displayStyle: 'bastao', cores: ['cor-bola', 'cor-lata'] },
            { palavra: "GATO", silabas: ["GA", "TO"], audioDrill: "audioDrillGato", audioPalavra: "audioPalavraGato", displayStyle: 'bastao', cores: ['cor-gato', 'cor-tatu'] },
            { palavra: "FACA", silabas: ["FA", "CA"], audioDrill: "audioDrillFaca", audioPalavra: "audioPalavraFaca", displayStyle: 'bastao', cores: ['cor-foca', 'cor-casa'] },
            { palavra: "DEDO", silabas: ["DE", "DO"], audioDrill: "audioDrillDedo", audioPalavra: "audioPalavraDedo", displayStyle: 'bastao', cores: ['cor-dado', 'cor-dedo'] },
            { palavra: "MALA", silabas: ["MA", "LA"], audioDrill: "audioDrillMala", audioPalavra: "audioPalavraMala", displayStyle: 'bastao', cores: ['cor-macaco', 'cor-lata'] },
            { palavra: "SAPO", silabas: ["SA", "PO"], audioDrill: "audioDrillSapo", audioPalavra: "audioPalavraSapo", displayStyle: 'bastao', cores: ['cor-sapo', 'cor-pote'] },
            { palavra: "PATO", silabas: ["PA", "TO"], audioDrill: "audioDrillPato", audioPalavra: "audioPalavraPato", displayStyle: 'bastao', cores: ['cor-pote', 'cor-tatu'] },
            { palavra: "CUBO", silabas: ["CU", "BO"], audioDrill: "audioDrillCubo", audioPalavra: "audioPalavraCubo", displayStyle: 'bastao', cores: ['cor-casa', 'cor-bola'] },
            { palavra: "LUA", silabas: ["LU", "A"], audioDrill: "audioDrillLua", audioPalavra: "audioPalavraLua", displayStyle: 'bastao', cores: ['cor-lata', 'cor-abacaxi'] },
            { palavra: "MACACO", silabas: ["MA", "CA", "CO"], audioDrill: "audioDrillMacaco", audioPalavra: "audioPalavraMacaco", displayStyle: 'bastao', cores: ['cor-macaco', 'cor-casa', 'cor-gato'] },
            { palavra: "JANELA", silabas: ["JA", "NE", "LA"], audioDrill: "audioDrillJanela", audioPalavra: "audioPalavraJanela", displayStyle: 'bastao', cores: ['cor-jaca', 'cor-navio', 'cor-lata'] },
            { palavra: "TOMATE", silabas: ["TO", "MA", "TE"], audioDrill: "audioDrillTomate", audioPalavra: "audioPalavraTomate", displayStyle: 'bastao', cores: ['cor-tatu', 'cor-macaco', 'cor-faca'] },
            { palavra: "SAPATO", silabas: ["SA", "PA", "TO"], audioDrill: "audioDrillSapato", audioPalavra: "audioPalavraSapato", displayStyle: 'bastao', cores: ['cor-sapo', 'cor-pote', 'cor-tatu'] },
            { palavra: "CARRO", silabas: ["CAR", "RO"], audioDrill: "audioDrillCarro", audioPalavra: "audioPalavraCarro", displayStyle: 'bastao', cores: ['cor-casa', 'cor-carro'] },
            { palavra: "TRATOR", silabas: ["TRA", "TOR"], audioDrill: "audioDrillTrator", audioPalavra: "audioPalavraTrator", displayStyle: 'bastao', cores: ['cor-trator', 'cor-porta'] },

            // 15 Palavras em Letra Cursiva
            { palavra: "chave", silabas: ["cha", "ve"], audioDrill: "audioDrillChave", audioPalavra: "audioPalavraChave", displayStyle: 'cursiva', cores: ['cor-chave', 'cor-vela'] },
            { palavra: "ninho", silabas: ["ni", "nho"], audioDrill: "audioDrillNinho", audioPalavra: "audioPalavraNinho", displayStyle: 'cursiva', cores: ['cor-navio', 'cor-ninho'] },
            { palavra: "palhaço", silabas: ["pa", "lha", "ço"], audioDrill: "audioDrillPalhaco", audioPalavra: "audioPalavraPalhaco", displayStyle: 'cursiva', cores: ['cor-pote', 'cor-palha', 'cor-casa'] },
            { palavra: "foguete", silabas: ["fo", "gue", "te"], audioDrill: "audioDrillFoguete", audioPalavra: "audioPalavraFoguete", displayStyle: 'cursiva', cores: ['cor-foca', 'cor-guerra', 'cor-tatu'] },
            { palavra: "pássaro", silabas: ["pás", "sa", "ro"], audioDrill: "audioDrillPassaro", audioPalavra: "audioPalavraPassaro", displayStyle: 'cursiva', cores: ['cor-pote', 'cor-sapo', 'cor-carro'] },
            { palavra: "blusa", silabas: ["blu", "sa"], audioDrill: "audioDrillBlusa", audioPalavra: "audioPalavraBlusa", displayStyle: 'cursiva', cores: ['cor-blusa', 'cor-sapo'] },
            { palavra: "planeta", silabas: ["pla", "ne", "ta"], audioDrill: "audioDrillPlaneta", audioPalavra: "audioPalavraPlaneta", displayStyle: 'cursiva', cores: ['cor-placa', 'cor-navio', 'cor-tatu'] },
            { palavra: "prato", silabas: ["pra", "to"], audioDrill: "audioDrillPrato", audioPalavra: "audioPalavraPrato", displayStyle: 'cursiva', cores: ['cor-prato', 'cor-tatu'] },
            { palavra: "barco", silabas: ["bar", "co"], audioDrill: "audioDrillBarco", audioPalavra: "audioPalavraBarco", displayStyle: 'cursiva', cores: ['cor-barco', 'cor-casa'] },
            { palavra: "pastel", silabas: ["pas", "tel"], audioDrill: "audioDrillPastel", audioPalavra: "audioPalavraPastel", displayStyle: 'cursiva', cores: ['cor-festa', 'cor-anel'] },
            { palavra: "bomba", silabas: ["bom", "ba"], audioDrill: "audioDrillBomba", audioPalavra: "audioPalavraBomba", displayStyle: 'cursiva', cores: ['cor-bomba', 'cor-bola'] },
            { palavra: "pente", silabas: ["pen", "te"], audioDrill: "audioDrillPente", audioPalavra: "audioPalavraPente", displayStyle: 'cursiva', cores: ['cor-pente', 'cor-tatu'] },
            { palavra: "coração", silabas: ["co", "ra", "ção"], audioDrill: "audioDrillCoracao", audioPalavra: "audioPalavraCoracao", displayStyle: 'cursiva', cores: ['cor-gato', 'cor-carro', 'cor-pao'] },
            { palavra: "borboleta", silabas: ["bor", "bo", "le", "ta"], audioDrill: "audioDrillBorboleta", audioPalavra: "audioPalavraBorboleta", displayStyle: 'cursiva', cores: ['cor-porta', 'cor-bola', 'cor-lata', 'cor-tatu'] },
            { palavra: "futebol", silabas: ["fu", "te", "bol"], audioDrill: "audioDrillFutebol", audioPalavra: "audioPalavraFutebol", displayStyle: 'cursiva', cores: ['cor-foca', 'cor-tatu', 'cor-anel'] },
        ];

        const palavrasGrid = document.querySelector('.palavras-grid');
        if (palavrasGrid) {
            const palavrasEmbaralhadas = window.shuffleArray([...palavrasData]);
            
            palavrasEmbaralhadas.forEach(palavraInfo => {
                const container = document.createElement('div');
                container.classList.add('palavra-exemplo-container');

                const foneticoDiv = document.createElement('div');
                foneticoDiv.classList.add('fonetico-display');
                const btnAudioFonetico = document.createElement('button');
                btnAudioFonetico.classList.add('btn-audio-fonetico');
                btnAudioFonetico.dataset.audioTarget = palavraInfo.audioDrill;
                btnAudioFonetico.innerHTML = '🔊';
                foneticoDiv.appendChild(btnAudioFonetico);
                palavraInfo.silabas.forEach(silaba => {
                    const spanEco = document.createElement('span');
                    spanEco.textContent = `${silaba.toLowerCase()}-${silaba.toLowerCase()}-${silaba.toLowerCase()}`;
                    foneticoDiv.appendChild(spanEco);
                });
                container.appendChild(foneticoDiv);
                
                const principalDiv = document.createElement('div');
                principalDiv.classList.add('palavra-principal-display');

                // Adiciona uma classe específica com base no número de sílabas
                if (palavraInfo.silabas.length === 3) {
                    principalDiv.classList.add('palavra-media');
                } else if (palavraInfo.silabas.length >= 4) {
                    principalDiv.classList.add('palavra-longa');
                }
                
                palavraInfo.silabas.forEach((silaba, index) => {
                    const spanSilaba = document.createElement('span');
                    spanSilaba.classList.add(palavraInfo.displayStyle === 'cursiva' ? 'palavra-silaba-cursiva' : 'palavra-silaba-bastao');
                    spanSilaba.textContent = silaba; 

                    if(palavraInfo.cores && palavraInfo.cores[index]) {
                        spanSilaba.classList.add(palavraInfo.cores[index]);
                    }
                    principalDiv.appendChild(spanSilaba);

                    if (index < palavraInfo.silabas.length - 1) {
                        const hifenSpan = document.createElement('span');
                        hifenSpan.classList.add('hifen-palavra');
                        hifenSpan.textContent = '-';
                        principalDiv.appendChild(hifenSpan);
                    }
                });

                const btnAudioPalavra = document.createElement('button');
                btnAudioPalavra.classList.add('btn-audio-palavra');
                btnAudioPalavra.dataset.audioTarget = palavraInfo.audioPalavra;
                btnAudioPalavra.innerHTML = '🔊';
                principalDiv.appendChild(btnAudioPalavra);
                container.appendChild(principalDiv);

                palavrasGrid.appendChild(container);
            });
        }
        
        setupAudioButtonListeners('.explicacao-metodo-container .btn-audio-auxiliar');
        setupAudioButtonListeners('.btn-audio-fonetico');
        setupAudioButtonListeners('.btn-audio-palavra');
    }
});