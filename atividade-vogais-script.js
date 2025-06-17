document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadeVogais = document.getElementById('licao1');

    if (paginaAtividadeVogais) {
        console.log("Script da Página de Atividade de Vogais Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');
        
        const todasAsVogais = ["A", "E", "I", "O", "U"];
        const estilosDeFonteOpcoes = [
            { classe: 'letra-opcao-bastao-upper', case: 'upper' },
            { classe: 'letra-opcao-cursiva-upper', case: 'upper' },
            { classe: 'letra-opcao-imprensa-lower', case: 'lower' },
            { classe: 'letra-opcao-cursiva-lower', case: 'lower' }
        ];

        function atualizarProgressoCircular(licaoIdPrefix, pontuacaoAtual, totalBase, erros, statusInfo = {}) {
            const barra = document.getElementById(`barra${licaoIdPrefix}`);
            const textoProgresso = document.getElementById(`texto${licaoIdPrefix}`);
            const legendaProgressoEl = document.getElementById(`legendaProgresso${licaoIdPrefix}`);
            
            if (!barra || !textoProgresso || !legendaProgressoEl) return;
            if (totalBase <= 0) totalBase = 1;

            let porcentagem = (pontuacaoAtual / totalBase) * 100;
            porcentagem = Math.min(100, Math.max(0, porcentagem));

            barra.style.strokeDasharray = `${porcentagem}, 100`;
            textoProgresso.textContent = `${Math.round(porcentagem)}%`;
            barra.classList.remove('cor-acerto', 'cor-erro');

            let legenda = "Acertos";
            if (statusInfo.licaoConcluida) {
                legenda = statusInfo.jogoPerfeito ? "Perfeito!" : "Concluído!";
                barra.classList.add('cor-acerto');
            } else if (pontuacaoAtual > 0) {
                barra.classList.add('cor-acerto');
            } else if (erros > 0) {
                barra.classList.add('cor-erro');
                legenda = "Tente de Novo";
            }
            legendaProgressoEl.textContent = legenda;
        }
        
        // --- LIÇÃO 1: Encontre as Vogais! ---
        const licao1Element = document.getElementById('licao1');
        if (licao1Element) {
            const areaPalavrasLicao1 = document.getElementById('areaPalavrasLicao1');
            const refazerLicao1Btn = document.getElementById('refazerLicao1');
            let estatisticasLicao1, indiceEstiloPalavraLicao1;
            const palavrasLicao1 = ["BOLA", "CASA", "SAPO", "LUA", "MESA", "DEDO", "GATO", "FACA", "UVA"];

            function calcularTotalVogais() {
                return palavrasLicao1.reduce((acc, palavra) => acc + (palavra.match(/[AEIOU]/gi) || []).length, 0);
            }

            function inicializarEstatisticasLicao1() {
                estatisticasLicao1 = { acertos: 0, erros: 0, respondidos: 0, totalVogais: calcularTotalVogais(), licaoConcluida: false, jogoPerfeito: true };
                indiceEstiloPalavraLicao1 = 0;
            }

            function renderizarLicao1() {
                areaPalavrasLicao1.innerHTML = '';
                inicializarEstatisticasLicao1();
                palavrasLicao1.forEach(palavra => {
                    const palavraContainer = document.createElement('div');
                    palavraContainer.classList.add('palavra-container');
                    const estiloAtualObj = estilosDeFonteOpcoes[indiceEstiloPalavraLicao1 % estilosDeFonteOpcoes.length];
                    indiceEstiloPalavraLicao1++;
                    Array.from(palavra).forEach(letraChar => {
                        const letraSpan = document.createElement('span');
                        letraSpan.className = `letra-clicavel ${estiloAtualObj.classe}`;
                        letraSpan.textContent = estiloAtualObj.case === 'lower' ? letraChar.toLowerCase() : letraChar.toUpperCase();
                        letraSpan.dataset.letra = letraChar;
                        letraSpan.addEventListener('click', handleLetraClickLicao1);
                        palavraContainer.appendChild(letraSpan);
                    });
                    areaPalavrasLicao1.appendChild(palavraContainer);
                });
                atualizarProgressoCircular('Licao1', 0, 1, 0, {});
            }

            function handleLetraClickLicao1(event) {
                const letraSpan = event.target;
                if (letraSpan.classList.contains('correta') || letraSpan.classList.contains('errada')) return;
                const letra = letraSpan.dataset.letra;
                if (todasAsVogais.includes(letra)) {
                    letraSpan.classList.add('correta');
                    estatisticasLicao1.acertos++;
                    if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                } else {
                    letraSpan.classList.add('errada');
                    estatisticasLicao1.erros++;
                    estatisticasLicao1.jogoPerfeito = false;
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                }
                estatisticasLicao1.respondidos++;
                if (estatisticasLicao1.acertos === estatisticasLicao1.totalVogais) {
                    estatisticasLicao1.licaoConcluida = true;
                }
                const pontuacaoLiquida = estatisticasLicao1.acertos - estatisticasLicao1.erros;
                atualizarProgressoCircular('Licao1', pontuacaoLiquida, estatisticasLicao1.totalVogais, estatisticasLicao1.erros, estatisticasLicao1);
            }

            if(refazerLicao1Btn) refazerLicao1Btn.addEventListener('click', renderizarLicao1);
            renderizarLicao1();
        }

        // --- LIÇÃO 2: Complete as Palavras! ---
        const licao2Element = document.getElementById('licao2');
        if (licao2Element) {
            const areaPalavrasLicao2 = document.getElementById('areaPalavrasLicao2');
            const refazerLicao2Btn = document.getElementById('refazerLicao2');
            let estatisticasLicao2, indiceEstiloPalavraLicao2, indiceEstiloOpcoesLicao2;
            
            // CORREÇÃO: Restaurando os dados completos para a Lição 2
            const dadosLicao2 = [
                { idAudio: "audioPalavraPatoLicao2", incompleta: "P_TO", correta: "A", opcoes: ["E", "A", "I"] },
                { idAudio: "audioPalavraMesaLicao2", incompleta: "M_SA", correta: "E", opcoes: ["O", "U", "E"] },
                { idAudio: "audioPalavraGatoLicao2", incompleta: "G_TO", correta: "A", opcoes: ["A", "E", "O"] },
                { idAudio: "audioPalavraLivroLicao2", incompleta: "L_VRO", correta: "I", opcoes: ["U", "O", "I"] },
                { idAudio: "audioPalavraFogoLicao2", incompleta: "F_GO", correta: "O", opcoes: ["A", "E", "O"] },
                { idAudio: "audioPalavraDedoLicao2", incompleta: "D_DO", correta: "E", opcoes: ["I", "E", "U"] },
                { idAudio: "audioPalavraBoloLicao2", incompleta: "B_LO", correta: "O", opcoes: ["A", "O", "U"] }
            ];

            function inicializarEstatisticasL2() { estatisticasLicao2 = { acertos: 0, erros: 0, respondidos: 0, total: dadosLicao2.length, licaoConcluida: false, jogoPerfeito: true }; indiceEstiloPalavraLicao2 = 0; indiceEstiloOpcoesLicao2 = 0; }
            function renderizarLicao2() {
                areaPalavrasLicao2.innerHTML = ''; inicializarEstatisticasL2();
                window.shuffleArray(dadosLicao2).forEach(item => {
                    const itemDiv = document.createElement('div'); itemDiv.className = 'item-palavra-licao2'; itemDiv.dataset.answered = 'false';
                    const palavraContainer = document.createElement('div'); palavraContainer.className = 'palavra-incompleta-container';
                    const palavraDisplay = document.createElement('span'); palavraDisplay.className = 'palavra-incompleta-display';
                    const estiloPalavra = estilosDeFonteOpcoes[indiceEstiloPalavraLicao2 % estilosDeFonteOpcoes.length]; indiceEstiloPalavraLicao2++;
                    palavraDisplay.classList.add(estiloPalavra.classe);
                    palavraDisplay.innerHTML = (estiloPalavra.case === 'lower' ? item.incompleta.toLowerCase() : item.incompleta.toUpperCase()).replace("_", "<span class='lacuna'>_</span>");
                    const btnAudio = document.createElement('button'); btnAudio.className = 'btn-audio-palavra-licao2'; btnAudio.innerHTML = '🔊';
                    btnAudio.addEventListener('click', () => window.tocarAudioControlado(document.getElementById(item.idAudio), btnAudio));
                    palavraContainer.appendChild(palavraDisplay); palavraContainer.appendChild(btnAudio);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.className = 'opcoes-letras-licao2';
                    const estiloOpcoes = estilosDeFonteOpcoes[indiceEstiloOpcoesLicao2 % estilosDeFonteOpcoes.length]; indiceEstiloOpcoesLicao2++;
                    window.shuffleArray(item.opcoes).forEach(opcao => {
                        const opcaoSpan = document.createElement('span');
                        opcaoSpan.className = `opcao-letra-licao2 ${estiloOpcoes.classe}`;
                        opcaoSpan.textContent = estiloOpcoes.case === 'lower' ? opcao.toLowerCase() : opcao.toUpperCase();
                        opcaoSpan.dataset.letra = opcao;
                        opcaoSpan.addEventListener('click', () => handleEscolhaLetraLicao2(opcao, item, itemDiv, opcoesContainer, palavraDisplay));
                        opcoesContainer.appendChild(opcaoSpan);
                    });
                    itemDiv.appendChild(palavraContainer); itemDiv.appendChild(opcoesContainer); areaPalavrasLicao2.appendChild(itemDiv);
                });
                atualizarProgressoCircular('Licao2', 0, 1, 0, {});
            }
            function handleEscolhaLetraLicao2(letraEscolhida, item, itemDiv, opcoesContainer, palavraDisplay) {
                if (itemDiv.dataset.answered === 'true') return;
                itemDiv.dataset.answered = 'true';
                const btnClicado = opcoesContainer.querySelector(`[data-letra="${letraEscolhida}"]`);
                opcoesContainer.querySelectorAll('.opcao-letra-licao2').forEach(opt => opt.classList.add('desabilitada'));
                if (letraEscolhida === item.correta) {
                    btnClicado.classList.add('correta-escolhida');
                    const estiloPalavra = estilosDeFonteOpcoes.find(e => palavraDisplay.classList.contains(e.classe));
                    palavraDisplay.innerHTML = (estiloPalavra.case === 'lower' ? item.incompleta.toLowerCase() : item.incompleta.toUpperCase()).replace("_", `<span class='letra-preenchida'>${estiloPalavra.case === 'lower' ? item.correta.toLowerCase() : item.correta.toUpperCase()}</span>`);
                    estatisticasLicao2.acertos++; if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                } else {
                    btnClicado.classList.add('errada-escolhida');
                    estatisticasLicao2.erros++; estatisticasLicao2.jogoPerfeito = false; if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                }
                estatisticasLicao2.respondidos++;
                if (estatisticasLicao2.respondidos === estatisticasLicao2.total) estatisticasLicao2.licaoConcluida = true;
                const netScore = estatisticasLicao2.acertos - estatisticasLicao2.erros;
                atualizarProgressoCircular('Licao2', netScore, estatisticasLicao2.total, estatisticasLicao2.erros, estatisticasLicao2);
            }
            if(refazerLicao2Btn) refazerLicao2Btn.addEventListener('click', renderizarLicao2);
            renderizarLicao2();
        }

        // --- LIÇÃO 3: Qual é a Vogal? ---
        const licao3Element = document.getElementById('licao3');
        if (licao3Element) {
            const areaDesafiosLicao3 = document.getElementById('areaDesafiosLicao3');
            const refazerLicao3Btn = document.getElementById('refazerLicao3');
            let estatisticasLicao3;
            const dadosLicao3 = [
                { letra: "A", audioId: "audioVogalA" }, { letra: "E", audioId: "audioVogalE" },
                { letra: "I", audioId: "audioVogalI" }, { letra: "O", audioId: "audioVogalO" },
                { letra: "U", audioId: "audioVogalU" }
            ];
            function inicializarEstatisticasL3() { estatisticasLicao3 = { acertos: 0, erros: 0, respondidos: 0, total: dadosLicao3.length, licaoConcluida: false, jogoPerfeito: true }; }
            function renderizarLicao3() {
                areaDesafiosLicao3.innerHTML = ''; inicializarEstatisticasL3();
                window.shuffleArray(dadosLicao3).forEach(desafio => {
                    const desafioDiv = document.createElement('div'); desafioDiv.className = 'desafio-audio-licao3';
                    desafioDiv.dataset.answered = "false";
                    const btnAudio = document.createElement('button'); btnAudio.className = 'btn-audio-desafio-licao3';
                    btnAudio.innerHTML = '🔊'; btnAudio.addEventListener('click', () => window.tocarAudioControlado(document.getElementById(desafio.audioId), btnAudio));
                    const opcoesContainer = document.createElement('div'); opcoesContainer.className = 'opcoes-letras-licao3';
                    const opcoes = window.gerarOpcoesComDistratoresLicao(desafio.letra, todasAsVogais, 3);
                    opcoes.forEach(opcaoLetra => {
                        const opcaoSpan = document.createElement('span');
                        opcaoSpan.className = 'opcao-letra-licao3 letra-opcao-bastao-upper';
                        opcaoSpan.textContent = opcaoLetra;
                        opcaoSpan.dataset.letra = opcaoLetra;
                        opcaoSpan.addEventListener('click', () => handleEscolhaLetraLicao3(opcaoSpan, desafio, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(opcaoSpan);
                    });
                    desafioDiv.appendChild(btnAudio); desafioDiv.appendChild(opcoesContainer);
                    areaDesafiosLicao3.appendChild(desafioDiv);
                });
                atualizarProgressoCircular('Licao3', 0, 1, 0, {});
            }
            function handleEscolhaLetraLicao3(opcaoClicada, desafio, desafioDiv, opcoesContainer) {
                if (desafioDiv.dataset.answered === "true") return;
                desafioDiv.dataset.answered = "true";
                opcoesContainer.querySelectorAll('.opcao-letra-licao3').forEach(opt => opt.classList.add('desabilitada'));
                if (opcaoClicada.dataset.letra === desafio.letra) {
                    opcaoClicada.classList.add('correta-final'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasLicao3.acertos++;
                } else {
                    opcaoClicada.classList.add('errada-final');
                    const opcaoCorretaEl = opcoesContainer.querySelector(`[data-letra="${desafio.letra}"]`);
                    if(opcaoCorretaEl) opcaoCorretaEl.classList.add('correta-final');
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasLicao3.erros++; estatisticasLicao3.jogoPerfeito = false;
                }
                estatisticasLicao3.respondidos++;
                if (estatisticasLicao3.respondidos === estatisticasLicao3.total) estatisticasLicao3.licaoConcluida = true;
                const netScore = estatisticasLicao3.acertos - estatisticasLicao3.erros;
                atualizarProgressoCircular('Licao3', netScore, estatisticasLicao3.total, estatisticasLicao3.erros, estatisticasLicao3);
            }
            if(refazerLicao3Btn) refazerLicao3Btn.addEventListener('click', renderizarLicao3);
            renderizarLicao3();
        }

        // --- LIÇÃO 4: Qual Vogal Começa? (LÓGICA ATUALIZADA) ---
        const licao4Element = document.getElementById('licao4');
        if (licao4Element) {
            const areaDesafiosLicao4 = document.getElementById('areaDesafiosLicao4');
            const refazerLicao4Btn = document.getElementById('refazerLicao4');
            let estatisticasLicao4, indiceEstiloAtualLicao4;
            const palavrasParaLicao4 = [
                { palavra: "ABACATE", vogalInicial: "A", audioId: "audioPalavraAbacateLicao4" },
                { palavra: "ESCOLA",  vogalInicial: "E", audioId: "audioPalavraEscolaLicao4" },
                { palavra: "IGREJA",  vogalInicial: "I", audioId: "audioPalavraIgrejaLicao4" },
                { palavra: "OVELHA",  vogalInicial: "O", audioId: "audioPalavraOvelhaLicao4" },
                { palavra: "URUBU",   vogalInicial: "U", audioId: "audioPalavraUrubuLicao4" },
                { palavra: "AMIGO",   vogalInicial: "A", audioId: "audioPalavraAmigoLicao4" },
                { palavra: "ELEFANTE",vogalInicial: "E", audioId: "audioPalavraElefanteLicao4" }
            ];

            function inicializarEstatisticasLicao4(){
                estatisticasLicao4 = { acertos: 0, erros: 0, total: palavrasParaLicao4.length, respondidos: 0, licaoConcluida: false, jogoPerfeito: true };
                indiceEstiloAtualLicao4 = 0;
            }

            function renderizarLicao4() {
                areaDesafiosLicao4.innerHTML = '';
                inicializarEstatisticasLicao4();
                const desafios = window.shuffleArray([...palavrasParaLicao4]);
                desafios.forEach((desafio, index) => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-audio-licao4';
                    desafioDiv.dataset.answered = "false";

                    const interacaoContainer = document.createElement('div');
                    interacaoContainer.className = 'interacao-container-l4';

                    // Botão de áudio, agora sem texto
                    const btnAudioDesafio = document.createElement('button');
                    btnAudioDesafio.className = 'btn-audio-desafio-licao4';
                    btnAudioDesafio.innerHTML = '🔊';
                    btnAudioDesafio.setAttribute('aria-label', `Ouvir palavra ${index + 1}`);
                    btnAudioDesafio.addEventListener('click', () => {
                        const audioEl = document.getElementById(desafio.audioId);
                        if (audioEl) window.tocarAudioControlado(audioEl, btnAudioDesafio);
                    });

                    // Elemento para a palavra, inicialmente oculto
                    const palavraDisplay = document.createElement('span');
                    palavraDisplay.className = 'palavra-display-l4 oculta'; // Começa oculto
                    palavraDisplay.textContent = desafio.palavra;
                    
                    interacaoContainer.appendChild(btnAudioDesafio);
                    interacaoContainer.appendChild(palavraDisplay);

                    const opcoesContainer = document.createElement('div');
                    opcoesContainer.className = 'opcoes-letras-licao4';
                    const opcoes = window.gerarOpcoesComDistratoresLicao(desafio.vogalInicial, todasAsVogais, 5);
                    const estiloParaEsteDesafio = estilosDeFonteOpcoes[indiceEstiloAtualLicao4 % estilosDeFonteOpcoes.length];
                    indiceEstiloAtualLicao4++;

                    opcoes.forEach(opcaoLetra => {
                        const opcaoSpan = document.createElement('span');
                        opcaoSpan.className = `opcao-letra-licao4 ${estiloParaEsteDesafio.classe}`;
                        opcaoSpan.textContent = estiloParaEsteDesafio.case === 'lower' ? opcaoLetra.toLowerCase() : opcaoLetra.toUpperCase();
                        opcaoSpan.dataset.letra = opcaoLetra;
                        opcaoSpan.addEventListener('click', () => handleEscolhaVogalLicao4(opcaoSpan, desafio, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(opcaoSpan);
                    });

                    desafioDiv.appendChild(interacaoContainer);
                    desafioDiv.appendChild(opcoesContainer);
                    areaDesafiosLicao4.appendChild(desafioDiv);
                });
                atualizarProgressoCircular('Licao4', 0, 1, 0, {});
            }

            function handleEscolhaVogalLicao4(opcaoClicada, desafio, desafioDiv, opcoesContainer) {
                if (desafioDiv.dataset.answered === "true") return;
                desafioDiv.dataset.answered = "true";
                window.pararAudioGlobal();

                // Revela a palavra
                const palavraDisplay = desafioDiv.querySelector('.palavra-display-l4');
                if (palavraDisplay) {
                    palavraDisplay.classList.remove('oculta');
                }

                const todasOpcoes = opcoesContainer.querySelectorAll('.opcao-letra-licao4');
                todasOpcoes.forEach(opt => opt.classList.add('desabilitada'));

                if (opcaoClicada.dataset.letra === desafio.vogalInicial) {
                    opcaoClicada.classList.add('correta-final');
                    if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                    estatisticasLicao4.acertos++;
                } else {
                    opcaoClicada.classList.add('errada-final');
                    const opcaoCorretaEl = opcoesContainer.querySelector(`[data-letra="${desafio.vogalInicial}"]`);
                    if(opcaoCorretaEl) opcaoCorretaEl.classList.add('correta-final');
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasLicao4.erros++;
                    estatisticasLicao4.jogoPerfeito = false;
                }

                estatisticasLicao4.respondidos++;
                if (estatisticasLicao4.respondidos === estatisticasLicao4.total) {
                    estatisticasLicao4.licaoConcluida = true;
                }
                const netScore = estatisticasLicao4.acertos - estatisticasLicao4.erros;
                atualizarProgressoCircular('Licao4', netScore, estatisticasLicao4.total, estatisticasLicao4.erros, estatisticasLicao4);
            }

            if(refazerLicao4Btn) refazerLicao4Btn.addEventListener('click', renderizarLicao4);
            renderizarLicao4();
        }

        // --- Event Listeners Gerais da Página ---
        const todosBotoesRefazer = document.querySelectorAll('.btn-refazer-licao');
        todosBotoesRefazer.forEach(btn => {
            if (btn && audioRefazerGeral) {
                btn.addEventListener('mouseover', () => {
                    window.pararAudioGlobal();
                    if (audioRefazerGeral.paused || audioRefazerGeral.currentTime === 0) {
                        audioRefazerGeral.play().catch(e => {});
                    } else {
                        audioRefazerGeral.pause();
                        audioRefazerGeral.currentTime = 0;
                        audioRefazerGeral.play().catch(e => {});
                    }
                });
            }
        });
        
        document.querySelectorAll('.licao-header .btn-audio-auxiliar, .licao-enunciado .btn-audio-auxiliar').forEach(btn => {
            const audioEl = document.getElementById(btn.dataset.audioTarget);
            if (btn && audioEl) {
                btn.addEventListener('click', () => window.tocarAudioControlado(audioEl, btn));
            }
        });
    }
});