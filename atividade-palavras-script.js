document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadePalavras = document.querySelector('.pagina-atividade #licaoPalavras1');

    if (paginaAtividadePalavras) {
        console.log("Script da Atividade Prática de Palavras Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');

        const estilosDeFontePalavra = [
            { nome: 'bastao', classe: 'estilo-bastao' },
            { nome: 'imprensa', classe: 'estilo-imprensa' },
            { nome: 'cursiva', classe: 'estilo-cursiva' }
        ];
        const todasLetrasAlfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

        // --- FUNÇÃO AUXILIAR GENÉRICA ---
        function criarBotaoAudio(audioId, ariaLabel) {
            const btn = document.createElement('button');
            btn.className = 'btn-audio-auxiliar';
            btn.innerHTML = '🔊';
            btn.setAttribute('aria-label', ariaLabel);
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const audioEl = document.getElementById(audioId);
                if(audioEl) window.tocarAudioControlado(audioEl, btn);
            });
            return btn;
        }

        // --- LIÇÃO 1: Qual é a Palavra Certa? ---
        const licao1Element = document.getElementById('licaoPalavras1');
        if(licao1Element) {
            const areaDesafiosL1 = document.getElementById('areaDesafiosLicaoPalavras1');
            const refazerL1Btn = document.getElementById('refazerLicaoPalavras1');
            const audioL1TituloBtn = licao1Element.querySelector('[data-audio-target="audioLicaoPalavras1Titulo"]');
            const audioL1EnunciadoBtn = licao1Element.querySelector('[data-audio-target="audioLicaoPalavras1Enunciado"]');
            const audioL1Titulo = document.getElementById('audioLicaoPalavras1Titulo');
            const audioL1Enunciado = document.getElementById('audioLicaoPalavras1Enunciado');
            if(audioL1TituloBtn && audioL1Titulo) audioL1TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioL1Titulo, audioL1TituloBtn));
            if(audioL1EnunciadoBtn && audioL1Enunciado) audioL1EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioL1Enunciado, audioL1EnunciadoBtn));

            let estatisticasL1;
            const licao1Data = [
                { id: 'l1p_1', emoji: '⚽', palavraCorreta: 'BOLA', opcoes: ['LATA', 'BOLA', 'DADO'], audioId: 'audioFiguraBolaL1P' },
                { id: 'l1p_2', emoji: '🏠', palavraCorreta: 'CASA', opcoes: ['CAMA', 'SALA', 'CASA'], audioId: 'audioFiguraCasaL1P' },
                { id: 'l1p_3', emoji: '🐱', palavraCorreta: 'GATO', opcoes: ['GATO', 'PATO', 'RATO'], audioId: 'audioFiguraGatoL1P' },
                { id: 'l1p_4', emoji: '🍎', palavraCorreta: 'MAÇÃ', opcoes: ['MAÇÃ', 'MALA', 'MAPA'], audioId: 'audioFiguraMacaL1P' },
                { id: 'l1p_5', emoji: '☀️', palavraCorreta: 'SOL', opcoes: ['SAL', 'SOM', 'SOL'], audioId: 'audioFiguraSolL1P' },
                { id: 'l1p_6', emoji: '✈️', palavraCorreta: 'AVIÃO', opcoes: ['NAVIO', 'AVIÃO', 'ANÃO'], audioId: 'audioFiguraAviaoL1P' },
                { id: 'l1p_7', emoji: '🔑', palavraCorreta: 'CHAVE', opcoes: ['CHUVA', 'CHAVE', 'CHÃO'], audioId: 'audioFiguraChaveL1P' }
            ];
            const totalDesafiosL1 = licao1Data.length;
            const valorPercentualPorDesafioL1 = (totalDesafiosL1 > 0) ? (100 / totalDesafiosL1) : 0;
            
            function inicializarEstatisticasL1() { estatisticasL1 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }

            function renderizarLicao1() {
                if(!areaDesafiosL1) return;
                areaDesafiosL1.innerHTML = '';
                inicializarEstatisticasL1();
                const desafios = window.shuffleArray([...licao1Data]);
                let estiloIndex = 0;

                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaopalavras1';
                    desafioDiv.dataset.answered = "false";
                    const emojiSpan = document.createElement('span');
                    emojiSpan.className = 'emoji-desafio-l1p';
                    emojiSpan.textContent = challenge.emoji;
                    if(challenge.audioId) {
                        emojiSpan.appendChild(criarBotaoAudio(challenge.audioId, `Ouvir ${challenge.palavraCorreta}`));
                    }
                    desafioDiv.appendChild(emojiSpan);
                    const opcoesContainer = document.createElement('div');
                    opcoesContainer.className = 'opcoes-palavras-l1p';
                    const opcoesEmbaralhadas = window.shuffleArray([...challenge.opcoes]);
                    opcoesEmbaralhadas.forEach(opcao => {
                        const btnOpcao = document.createElement('button');
                        btnOpcao.className = 'opcao-palavra-l1p';
                        const estiloAtual = estilosDeFontePalavra[estiloIndex % estilosDeFontePalavra.length];
                        btnOpcao.classList.add(estiloAtual.classe);
                        btnOpcao.textContent = opcao;
                        btnOpcao.dataset.palavra = opcao;
                        btnOpcao.addEventListener('click', () => handleOpcaoPalavraL1Click(btnOpcao, challenge, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(btnOpcao);
                        estiloIndex++;
                    });
                    desafioDiv.appendChild(opcoesContainer);
                    areaDesafiosL1.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoPalavras1', 0, 100, 0, {});
            }

            function handleOpcaoPalavraL1Click(btnEscolhido, challengeData, desafioDiv, opcoesContainer) {
                if(desafioDiv.dataset.answered === "true") return;
                desafioDiv.dataset.answered = "true";
                window.pararAudioGlobal();
                const palavraEscolhida = btnEscolhido.dataset.palavra;
                const todosBotoes = opcoesContainer.querySelectorAll('.opcao-palavra-l1p');
                todosBotoes.forEach(btn => btn.classList.add('desabilitada'));
                if(palavraEscolhida.toUpperCase() === challengeData.palavraCorreta.toUpperCase()) {
                    btnEscolhido.classList.add('correta');
                    if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                    estatisticasL1.acertos++;
                } else {
                    btnEscolhido.classList.add('errada');
                    todosBotoes.forEach(btn => { if(btn.dataset.palavra.toUpperCase() === challengeData.palavraCorreta.toUpperCase()) { btn.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasL1.erros++;
                    estatisticasL1.jogoPerfeitoAlcancado = false;
                }
                estatisticasL1.desafiosRespondidos++;
                if(!estatisticasL1.licaoConcluida && estatisticasL1.desafiosRespondidos === totalDesafiosL1) { estatisticasL1.licaoConcluida = true; }
                let netScore = (estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado) ? 100 : (estatisticasL1.acertos * valorPercentualPorDesafioL1) - (estatisticasL1.erros * valorPercentualPorDesafioL1);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoPalavras1', netScore, 100, estatisticasL1.erros, { licaoConcluida: estatisticasL1.licaoConcluida, jogoPerfeito: estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL1.desafiosRespondidos });
            }
            if(refazerL1Btn) refazerL1Btn.addEventListener('click', renderizarLicao1);
            if (licao1Element && !licao1Element.classList.contains('licacao-bloqueada')) { renderizarLicao1(); }
        }

        // --- LIÇÃO 2: Escute e Encontre ---
        const licao2Element = document.getElementById('licaoPalavras2');
        if(licao2Element) {
            const areaDesafiosL2 = document.getElementById('areaDesafiosLicaoPalavras2');
            const refazerL2Btn = document.getElementById('refazerLicaoPalavras2');
            let estatisticasL2;
            const licao2Data = [
                { id: 'l2p_1', audioPalavraId: "audioPalavraCasaL2P", palavraCorreta: "CASA", opcoes: ["CASA", "MASA", "CAZA"] },
                { id: 'l2p_2', audioPalavraId: "audioPalavraBonecaL2P", palavraCorreta: "BONECA", opcoes: ["BONEGA", "PONECA", "BONECA"] },
                { id: 'l2p_3', audioPalavraId: "audioPalavraJanelaL2P", palavraCorreta: "JANELA", opcoes: ["CHANELA", "JANELA", "ANELA"] },
                { id: 'l2p_4', audioPalavraId: "audioPalavraFogueteL2P", palavraCorreta: "FOGUETE", opcoes: ["FOGUETE", "FOGETE", "VOGUETE"] },
                { id: 'l2p_5', audioPalavraId: "audioPalavraSapatoL2P", palavraCorreta: "SAPATO", opcoes: ["SAPATO", "ZAPATO", "SAPADO"] },
                { id: 'l2p_6', audioPalavraId: "audioPalavraGirassolL2P", palavraCorreta: "GIRASSOL", opcoes: ["JIRASOL", "GIRASSOL", "GIRASOL"] },
                { id: 'l2p_7', audioPalavraId: "audioPalavraPalhacoL2P", palavraCorreta: "PALHAÇO", opcoes: ["PALHAÇO", "PALIAÇO", "PAIAÇO"] },
                { id: 'l2p_8', audioPalavraId: "audioPalavraPresenteL2P", palavraCorreta: "PRESENTE", opcoes: ["PRESENTE", "PREZENTE", "BREZENTE"] },
                { id: 'l2p_9', audioPalavraId: "audioPalavraAmbulanciaL2P", palavraCorreta: "AMBULÂNCIA", opcoes: ["ANBULANSIA", "AMBULÂNCIA", "ANBULÂNCIA"] }
            ];
            const totalDesafiosL2 = licao2Data.length;
            const valorPercentualPorDesafioL2 = (totalDesafiosL2 > 0) ? (100 / totalDesafiosL2) : 0;
            
            function inicializarEstatisticasL2() { estatisticasL2 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }

            function renderizarLicao2() {
                if(!areaDesafiosL2) return;
                areaDesafiosL2.innerHTML = '';
                inicializarEstatisticasL2();
                const desafios = window.shuffleArray([...licao2Data]);
                let estiloIndex = 0;
                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaopalavras2';
                    desafioDiv.dataset.answered = "false";
                    const btnAudioPalavra = document.createElement('button');
                    btnAudioPalavra.className = 'btn-audio-palavra-l2p';
                    btnAudioPalavra.innerHTML = `🔊 Ouvir Palavra ${desafios.indexOf(challenge) + 1}`;
                    btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.audioPalavraId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); });
                    desafioDiv.appendChild(btnAudioPalavra);
                    const opcoesContainer = document.createElement('div');
                    opcoesContainer.className = 'opcoes-palavras-l2p';
                    const opcoesEmbaralhadas = window.shuffleArray([...challenge.opcoes]);
                    opcoesEmbaralhadas.forEach(opcao => {
                        const btnOpcao = document.createElement('button');
                        btnOpcao.className = 'opcao-palavra-l1p'; // Reutilizando estilo da L1
                        const estiloAtual = estilosDeFontePalavra[estiloIndex % estilosDeFontePalavra.length];
                        btnOpcao.classList.add(estiloAtual.classe);
                        btnOpcao.textContent = opcao;
                        btnOpcao.dataset.palavra = opcao;
                        btnOpcao.addEventListener('click', () => handleOpcaoPalavraL2Click(btnOpcao, challenge, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(btnOpcao);
                        estiloIndex++;
                    });
                    desafioDiv.appendChild(opcoesContainer);
                    areaDesafiosL2.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoPalavras2', 0, 100, 0, {});
            }

            function handleOpcaoPalavraL2Click(btnEscolhido, challengeData, desafioDiv, opcoesContainer) {
                if(desafioDiv.dataset.answered === "true") return;
                desafioDiv.dataset.answered = "true";
                window.pararAudioGlobal();
                const palavraEscolhida = btnEscolhido.dataset.palavra;
                const todosBotoes = opcoesContainer.querySelectorAll('.opcao-palavra-l1p');
                todosBotoes.forEach(btn => btn.classList.add('desabilitada'));
                if(palavraEscolhida.toUpperCase() === challengeData.palavraCorreta.toUpperCase()) {
                    btnEscolhido.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL2.acertos++;
                } else {
                    btnEscolhido.classList.add('errada');
                    todosBotoes.forEach(btn => { if(btn.dataset.palavra.toUpperCase() === challengeData.palavraCorreta.toUpperCase()) { btn.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasL2.erros++; estatisticasL2.jogoPerfeitoAlcancado = false;
                }
                estatisticasL2.desafiosRespondidos++;
                if(!estatisticasL2.licaoConcluida && estatisticasL2.desafiosRespondidos === totalDesafiosL2) { estatisticasL2.licaoConcluida = true; }
                let netScore = (estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado) ? 100 : (estatisticasL2.acertos * valorPercentualPorDesafioL2) - (estatisticasL2.erros * valorPercentualPorDesafioL2);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoPalavras2', netScore, 100, estatisticasL2.erros, { licaoConcluida: estatisticasL2.licaoConcluida, jogoPerfeito: estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL2.desafiosRespondidos });
            }
            if(refazerL2Btn) refazerL2Btn.addEventListener('click', renderizarLicao2);
            if (licao2Element && !licao2Element.classList.contains('licacao-bloqueada')) { renderizarLicao2(); }
        }

        // --- LIÇÃO 3: Quebra-Cabeça de Sílabas (NOVA LÓGICA) ---
        const licao3Element = document.getElementById('licaoPalavras3');
        if(licao3Element) {
            const areaDesafiosL3 = document.getElementById('areaDesafiosLicaoPalavras3');
            const refazerL3Btn = document.getElementById('refazerLicaoPalavras3');
            
            let estatisticasL3;
            const licao3Data = [
                { id: 'l3p_1', emoji: '⚽', palavraCorreta: 'BOLA', silabas: ['BO', 'LA'], audioId: 'audioFiguraBolaL1P' },
                { id: 'l3p_2', emoji: '🐱', palavraCorreta: 'GATO', silabas: ['GA', 'TO'], audioId: 'audioFiguraGatoL1P' },
                { id: 'l3p_3', emoji: '🏠', palavraCorreta: 'CASA', silabas: ['CA', 'SA'], audioId: 'audioFiguraCasaL1P' },
                { id: 'l3p_4', emoji: 'FACA', palavraCorreta: 'FACA', silabas: ['FA', 'CA'], audioId: 'audioPalavraFacaL2P' },
                { id: 'l3p_5', emoji: 'SAPATO', palavraCorreta: 'SAPATO', silabas: ['SA', 'PA', 'TO'], audioId: 'audioPalavraSapatoL2P' },
                { id: 'l3p_6', emoji: '🐒', palavraCorreta: 'MACACO', silabas: ['MA', 'CA', 'CO'], audioId: 'audioMacaco_L2' },
                { id: 'l3p_7', emoji: 'CANETA', palavraCorreta: 'CANETA', silabas: ['CA', 'NE', 'TA'], audioId: 'audioPalavraCanetaL3P' },
                { id: 'l3p_8', emoji: 'CHAVE', palavraCorreta: 'CHAVE', silabas: ['CHA', 'VE'], audioId: 'audioFiguraChaveL1P' },
                { id: 'l3p_9', emoji: 'GALINHA', palavraCorreta: 'GALINHA', silabas: ['GA', 'LI', 'NHA'], audioId: 'audioPalavraGalinhaL3P' },
                { id: 'l3p_10', emoji: 'BORBOLETA', palavraCorreta: 'BORBOLETA', silabas: ['BOR', 'BO', 'LE', 'TA'], audioId: 'audioPalavraBorboletaL4S' },
                { id: 'l3p_11', emoji: 'PLANETA', palavraCorreta: 'PLANETA', silabas: ['PLA', 'NE', 'TA'], audioId: 'audioPalavraPlaneta' },
                { id: 'l3p_12', emoji: 'TRATOR', palavraCorreta: 'TRATOR', silabas: ['TRA', 'TOR'], audioId: 'audioPalavraTrator' },
            ];
            const totalDesafiosL3 = licao3Data.length;
            const valorPercentualPorDesafioL3 = (totalDesafiosL3 > 0) ? (100 / totalDesafiosL3) : 0;

            function inicializarEstatisticasL3() { estatisticasL3 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            
            function renderizarLicao3() {
                if(!areaDesafiosL3) return;
                areaDesafiosL3.innerHTML = '';
                inicializarEstatisticasL3();
                const desafios = window.shuffleArray([...licao3Data]);

                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaopalavras3';
                    desafioDiv.dataset.answered = "false";
                    const dicaContainer = document.createElement('div');
                    dicaContainer.className = 'dica-container-l3p';
                    const dicaVisual = document.createElement('span');
                    dicaVisual.className = 'dica-visual-l3p';
                    dicaVisual.textContent = challenge.emoji;
                    dicaContainer.appendChild(dicaVisual);
                    if(challenge.audioId) {
                        dicaContainer.appendChild(criarBotaoAudio(challenge.audioId, `Ouvir dica para ${challenge.palavraCorreta}`));
                    }
                    desafioDiv.appendChild(dicaContainer);
                    const slotsContainer = document.createElement('div');
                    slotsContainer.className = 'slots-palavra-l3p';
                    challenge.silabas.forEach(() => {
                        const slotDiv = document.createElement('div');
                        slotDiv.className = 'espaco-silaba-l3p';
                        slotDiv.addEventListener('click', () => removerSilabaDoSlot(slotDiv, desafioDiv));
                        slotsContainer.appendChild(slotDiv);
                    });
                    desafioDiv.appendChild(slotsContainer);
                    const bancoSilabas = document.createElement('div');
                    bancoSilabas.className = 'banco-silabas-desafio-l3p';
                    window.shuffleArray([...challenge.silabas]).forEach(silaba => {
                        const silabaBtn = document.createElement('button');
                        silabaBtn.className = 'silaba-opcao-l3p';
                        silabaBtn.textContent = silaba;
                        silabaBtn.dataset.silaba = silaba;
                        silabaBtn.addEventListener('click', () => colocarSilabaNoSlot(silabaBtn, slotsContainer, challenge, desafioDiv));
                        bancoSilabas.appendChild(silabaBtn);
                    });
                    desafioDiv.appendChild(bancoSilabas);
                    areaDesafiosL3.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoPalavras3', 0, 100, 0, {});
            }

            function colocarSilabaNoSlot(silabaBtn, slotsContainer, challengeData, desafioDiv) {
                if(silabaBtn.classList.contains('usada') || desafioDiv.dataset.answered === "true") return;
                const primeiroSlotVazio = slotsContainer.querySelector('.espaco-silaba-l3p:not(.preenchido)');
                if(primeiroSlotVazio) {
                    primeiroSlotVazio.textContent = silabaBtn.dataset.silaba;
                    primeiroSlotVazio.classList.add('preenchido');
                    silabaBtn.classList.add('usada');
                    const todosSlots = slotsContainer.querySelectorAll('.espaco-silaba-l3p');
                    const slotsPreenchidos = slotsContainer.querySelectorAll('.espaco-silaba-l3p.preenchido');
                    if(slotsPreenchidos.length === todosSlots.length) {
                        verificarPalavraL3(slotsContainer, challengeData, desafioDiv);
                    }
                }
            }

            function removerSilabaDoSlot(slotDiv, desafioDiv) {
                if(!slotDiv.classList.contains('preenchido') || desafioDiv.dataset.answered === "true") return;
                const bancoSilabas = desafioDiv.querySelector('.banco-silabas-desafio-l3p');
                const silabaARetornar = slotDiv.textContent;
                const btnNoBanco = bancoSilabas.querySelector(`.silaba-opcao-l3p[data-silaba="${silabaARetornar}"].usada`);
                if(btnNoBanco) { btnNoBanco.classList.remove('usada'); }
                slotDiv.textContent = '';
                slotDiv.classList.remove('preenchido');
            }

            function verificarPalavraL3(slotsContainer, challengeData, desafioDiv) {
                const silabasNosSlots = Array.from(slotsContainer.querySelectorAll('.espaco-silaba-l3p')).map(s => s.textContent);
                const palavraFormada = silabasNosSlots.join('');
                desafioDiv.dataset.answered = "true";
                if(palavraFormada.toUpperCase() === challengeData.palavraCorreta.toUpperCase()) {
                    slotsContainer.classList.add('correta');
                    if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                    estatisticasL3.acertos++;
                } else {
                    slotsContainer.classList.add('errada');
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasL3.erros++;
                    estatisticasL3.jogoPerfeitoAlcancado = false;
                }
                estatisticasL3.desafiosRespondidos++;
                if(!estatisticasL3.licaoConcluida && estatisticasL3.desafiosRespondidos === totalDesafiosL3) { estatisticasL3.licaoConcluida = true; }
                let netScore = (estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado) ? 100 : (estatisticasL3.acertos * valorPercentualPorDesafioL3) - (estatisticasL3.erros * valorPercentualPorDesafioL3);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoPalavras3', netScore, 100, estatisticasL3.erros, { licaoConcluida: estatisticasL3.licaoConcluida, jogoPerfeito: estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL3.desafiosRespondidos });
            }
            if(refazerL3Btn) { refazerL3Btn.addEventListener('click', renderizarLicao3); }
            if (licao3Element && !licao3Element.classList.contains('licacao-bloqueada')) { renderizarLicao3(); }
        }

        // --- LIÇÃO 4: Decifre a Palavra Secreta (LÓGICA NOVA E COMPLETA) ---
        const licao4Element = document.getElementById('licaoPalavras4');
        if(licao4Element) {
            const areaDesafiosL4 = document.getElementById('areaDesafiosLicaoPalavras4');
            const refazerL4Btn = document.getElementById('refazerLicaoPalavras4');
            
            let estatisticasL4;
            const licao4Data = [
                { id: 'l4p_1', emoji: '🍎', palavraCorreta: 'MAÇÃ', audioId: 'audioPalavraMacaL4P' },
                { id: 'l4p_2', emoji: '🍌', palavraCorreta: 'BANANA', audioId: 'audioPalavraBananaL4P' },
                { id: 'l4p_3', emoji: '🚗', palavraCorreta: 'CARRO', audioId: 'audioPalavraCarroL2P' },
                { id: 'l4p_4', emoji: '👻', palavraCorreta: 'FANTASMA', audioId: 'audioPalavraFantasmaL4P' },
                { id: 'l4p_5', emoji: '🎁', palavraCorreta: 'PRESENTE', audioId: 'audioPalavraPresenteL2P' },
                { id: 'l4p_6', emoji: 'TARTARUGA', palavraCorreta: 'TARTARUGA', audioId: 'audioPalavraTartarugaL4P' },
                { id: 'l4p_7', emoji: 'ESCOLA', palavraCorreta: 'ESCOLA', audioId: 'audioPalavraEscolaL4P' },
            ];
            const totalDesafiosL4 = licao4Data.length;
            const valorPercentualPorDesafioL4 = (totalDesafiosL4 > 0) ? (100 / totalDesafiosL4) : 0;

            function inicializarEstatisticasL4() { estatisticasL4 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }

            function renderizarLicao4() {
                if(!areaDesafiosL4) return;
                areaDesafiosL4.innerHTML = '';
                inicializarEstatisticasL4();
                const desafios = window.shuffleArray([...licao4Data]);

                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaopalavras4';
                    desafioDiv.dataset.answered = "false";

                    const dicaContainer = document.createElement('div');
                    dicaContainer.className = 'dica-container-l4p';
                    const dicaVisual = document.createElement('span');
                    dicaVisual.className = 'dica-visual-l4p';
                    dicaVisual.textContent = challenge.emoji;
                    dicaContainer.appendChild(dicaVisual);
                    if(challenge.audioId) {
                        dicaContainer.appendChild(criarBotaoAudio(challenge.audioId, `Ouvir dica para ${challenge.palavraCorreta}`));
                    }
                    desafioDiv.appendChild(dicaContainer);

                    const slotsContainer = document.createElement('div');
                    slotsContainer.className = 'slots-palavra-l4p';
                    for (let i = 0; i < challenge.palavraCorreta.length; i++) {
                        const slotDiv = document.createElement('div');
                        slotDiv.className = 'letra-slot-l4p';
                        slotDiv.addEventListener('click', () => removerLetraDoSlot(slotDiv, desafioDiv));
                        slotsContainer.appendChild(slotDiv);
                    }
                    desafioDiv.appendChild(slotsContainer);

                    const bancoLetras = document.createElement('div');
                    bancoLetras.className = 'banco-letras-l4p';
                    const letrasEmbaralhadas = window.shuffleArray(challenge.palavraCorreta.toUpperCase().split(''));
                    letrasEmbaralhadas.forEach((letra, index) => {
                        const letraBtn = document.createElement('button');
                        letraBtn.className = 'letra-disponivel-l4p';
                        letraBtn.textContent = letra;
                        letraBtn.dataset.letra = letra;
                        letraBtn.dataset.originalIndex = index; // ID único para o botão
                        letraBtn.addEventListener('click', () => colocarLetraNoSlot(letraBtn, slotsContainer, challenge, desafioDiv));
                        bancoLetras.appendChild(letraBtn);
                    });
                    desafioDiv.appendChild(bancoLetras);
                    areaDesafiosL4.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoPalavras4', 0, 100, 0, {});
            }

            function colocarLetraNoSlot(letraBtn, slotsContainer, challengeData, desafioDiv) {
                if (letraBtn.classList.contains('oculta') || desafioDiv.dataset.answered === "true") return;
                const primeiroSlotVazio = slotsContainer.querySelector('.letra-slot-l4p:not(.preenchido)');
                if (primeiroSlotVazio) {
                    primeiroSlotVazio.textContent = letraBtn.dataset.letra;
                    primeiroSlotVazio.classList.add('preenchido');
                    primeiroSlotVazio.dataset.originalIndex = letraBtn.dataset.originalIndex;
                    letraBtn.classList.add('oculta');
                    const todosSlots = slotsContainer.querySelectorAll('.letra-slot-l4p');
                    const slotsPreenchidos = slotsContainer.querySelectorAll('.letra-slot-l4p.preenchido');
                    if (slotsPreenchidos.length === todosSlots.length) {
                        verificarPalavraL4(slotsContainer, challengeData, desafioDiv);
                    }
                }
            }

            function removerLetraDoSlot(slotDiv, desafioDiv) {
                if (!slotDiv.classList.contains('preenchido') || desafioDiv.dataset.answered === "true") return;
                const bancoLetras = desafioDiv.querySelector('.banco-letras-l4p');
                const originalIndex = slotDiv.dataset.originalIndex;
                const btnNoBanco = bancoLetras.querySelector(`.letra-disponivel-l4p[data-original-index="${originalIndex}"]`);
                if (btnNoBanco) { btnNoBanco.classList.remove('oculta'); }
                slotDiv.textContent = '';
                slotDiv.classList.remove('preenchido');
                slotDiv.removeAttribute('data-original-index');
            }

            function verificarPalavraL4(slotsContainer, challengeData, desafioDiv) {
                const letrasNosSlots = Array.from(slotsContainer.querySelectorAll('.letra-slot-l4p')).map(s => s.textContent);
                const palavraFormada = letrasNosSlots.join('');
                desafioDiv.dataset.answered = "true";

                if (palavraFormada.toUpperCase() === challengeData.palavraCorreta.toUpperCase()) {
                    slotsContainer.querySelectorAll('.letra-slot-l4p').forEach(s => s.classList.add('correta'));
                    if (audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                    estatisticasL4.acertos++;
                } else {
                    desafioDiv.classList.add('errada'); // Animação de shake no desafio todo
                    if (audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasL4.erros++;
                    estatisticasL4.jogoPerfeitoAlcancado = false;
                }
                estatisticasL4.desafiosRespondidos++;
                if (!estatisticasL4.licaoConcluida && estatisticasL4.desafiosRespondidos === totalDesafiosL4) { estatisticasL4.licaoConcluida = true; }
                let netScore = (estatisticasL4.licaoConcluida && estatisticasL4.jogoPerfeitoAlcancado) ? 100 : (estatisticasL4.acertos * valorPercentualPorDesafioL4) - (estatisticasL4.erros * valorPercentualPorDesafioL4);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoPalavras4', netScore, 100, estatisticasL4.erros, { licaoConcluida: estatisticasL4.licaoConcluida, jogoPerfeito: estatisticasL4.licaoConcluida && estatisticasL4.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL4.desafiosRespondidos });
            }

            if(refazerL4Btn) { refazerL4Btn.addEventListener('click', renderizarLicao4); }
            if (licao4Element && !licao4Element.classList.contains('licacao-bloqueada')) { renderizarLicao4(); }
        }
        
        // Ativar listeners de mouseover para todos os botões de refazer
        ['refazerLicaoPalavras1', 'refazerLicaoPalavras2', 'refazerLicaoPalavras3', 'refazerLicaoPalavras4'].forEach(id => {
            const btn = document.getElementById(id);
            if(btn && audioRefazerGeral) {
                btn.addEventListener('mouseover', () => { window.pararAudioGlobal(); audioRefazerGeral.currentTime = 0; audioRefazerGeral.play().catch(e => {}); });
            }
        });
    }
});