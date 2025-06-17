document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadeAlfabetoContainer = document.querySelector('.pagina-atividade .conteudo-atividade');

    if (paginaAtividadeAlfabetoContainer && document.getElementById('licaoAlfabeto1')) { // Verifica pela primeira lição
        console.log("Script da Atividade Prática do Alfabeto Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');

        const estilosDeFontePadrao = [
            { classe: 'letra-opcao-bastao-upper', case: 'upper' },
            { classe: 'letra-opcao-cursiva-lower', case: 'lower' },
            { classe: 'letra-opcao-imprensa-lower', case: 'lower' },
            { classe: 'letra-opcao-cursiva-upper', case: 'upper' }
        ];
        const todasLetrasAlfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

        // --- LIÇÃO 1: O Som da Letra ---
        const licaoAlfabeto1Element = document.getElementById('licaoAlfabeto1');
        if (licaoAlfabeto1Element) {
            const areaDesafiosL1 = document.getElementById('areaDesafiosLicaoAlfabeto1');
            const refazerLicaoL1Btn = document.getElementById('refazerLicaoAlfabeto1');
            const audioL1TituloBtn = licaoAlfabeto1Element.querySelector('[data-audio-target="audioLicaoAlfabeto1Titulo"]');
            const audioL1EnunciadoBtn = licaoAlfabeto1Element.querySelector('[data-audio-target="audioLicaoAlfabeto1Enunciado"]');
            const audioL1Titulo = document.getElementById('audioLicaoAlfabeto1Titulo');
            const audioL1Enunciado = document.getElementById('audioLicaoAlfabeto1Enunciado');
            if(audioL1TituloBtn && audioL1Titulo) audioL1TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioL1Titulo, audioL1TituloBtn));
            if(audioL1EnunciadoBtn && audioL1Enunciado) audioL1EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioL1Enunciado, audioL1EnunciadoBtn));

            let estatisticasL1;
            let indiceEstiloOpcaoL1 = 0;
            const licaoAlfabeto1Data = [
                { id: 'l1a_1', audioSomId: "audioSomLetraA_L1", letraCorreta: "A", todasLetras: todasLetrasAlfabeto }, { id: 'l1a_2', audioSomId: "audioSomLetraB_L1", letraCorreta: "B", todasLetras: todasLetrasAlfabeto },
                { id: 'l1a_3', audioSomId: "audioSomLetraC_L1", letraCorreta: "C", todasLetras: todasLetrasAlfabeto }, { id: 'l1a_4', audioSomId: "audioSomLetraM_L1", letraCorreta: "M", todasLetras: todasLetrasAlfabeto },
                { id: 'l1a_5', audioSomId: "audioSomLetraP_L1", letraCorreta: "P", todasLetras: todasLetrasAlfabeto }
            ];
            const totalDesafiosL1 = licaoAlfabeto1Data.length;
            const valorPercentualPorDesafioL1 = (totalDesafiosL1 > 0) ? (100 / totalDesafiosL1) : 0;

            function inicializarEstatisticasL1() { estatisticasL1 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoL1 = 0; }
            function renderizarLicaoAlfabeto1() {
                if (!areaDesafiosL1) return; areaDesafiosL1.innerHTML = ''; inicializarEstatisticasL1();
                const desafios = window.shuffleArray([...licaoAlfabeto1Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoalfabeto1');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    const btnAudioSomLetra = document.createElement('button'); btnAudioSomLetra.classList.add('btn-audio-som-letra-l1');
                    btnAudioSomLetra.innerHTML = `🔊 Ouvir Letra ${desafios.indexOf(challenge) + 1}`;
                    btnAudioSomLetra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.audioSomId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioSomLetra); });
                    desafioItemDiv.appendChild(btnAudioSomLetra);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-letras-licaoalfabeto1');
                    const opcoes = window.gerarOpcoesComDistratoresLicao(challenge.letraCorreta, challenge.todasLetras, 3);
                    opcoes.forEach(letraOpcao => {
                        const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-letra-L1A');
                        const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoL1 % estilosDeFontePadrao.length];
                        opcaoDiv.classList.add(estiloOpcaoObj.classe); indiceEstiloOpcaoL1 = (indiceEstiloOpcaoL1 + 1) % estilosDeFontePadrao.length;
                        opcaoDiv.textContent = (estiloOpcaoObj.case === 'lower') ? letraOpcao.toLowerCase() : letraOpcao.toUpperCase();
                        opcaoDiv.dataset.letraValor = letraOpcao;
                        opcaoDiv.addEventListener('click', () => handleOpcaoLetraL1Click(opcaoDiv, challenge, desafioItemDiv, opcoesContainer));
                        opcoesContainer.appendChild(opcaoDiv);
                    });
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosL1.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto1', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleOpcaoLetraL1Click(opcaoElement, challengeData, desafioItemDiv, opcoesContainer) {
                if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const letraEscolhida = opcaoElement.dataset.letraValor;
                const todasOpcoesVisuais = opcoesContainer.querySelectorAll('.opcao-letra-L1A');
                todasOpcoesVisuais.forEach(opt => opt.classList.add('desabilitada'));
                if (letraEscolhida.toUpperCase() === challengeData.letraCorreta.toUpperCase()) {
                    opcaoElement.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL1.acertos++;
                } else {
                    opcaoElement.classList.add('errada');
                    todasOpcoesVisuais.forEach(opt => { if (opt.dataset.letraValor.toUpperCase() === challengeData.letraCorreta.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL1.erros++; estatisticasL1.jogoPerfeitoAlcancado = false;
                }
                estatisticasL1.desafiosRespondidos++;
                if (!estatisticasL1.licaoConcluida && estatisticasL1.desafiosRespondidos === totalDesafiosL1) { estatisticasL1.licaoConcluida = true; }
                let netScore = (estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado) ? 100 : (estatisticasL1.acertos * valorPercentualPorDesafioL1) - (estatisticasL1.erros * valorPercentualPorDesafioL1);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto1', netScore, 100, estatisticasL1.erros, { licaoConcluida: estatisticasL1.licaoConcluida, jogoPerfeito: estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL1.desafiosRespondidos });
            }
            if (refazerLicaoL1Btn) { refazerLicaoL1Btn.addEventListener('click', renderizarLicaoAlfabeto1); }
            if (licaoAlfabeto1Element && !licaoAlfabeto1Element.classList.contains('licacao-bloqueada')) { renderizarLicaoAlfabeto1(); }
        }

        // --- LIÇÃO 2: Figura Mágica: Qual Letra Começa? ---
        const licaoAlfabeto2Element = document.getElementById('licaoAlfabeto2');
        if (licaoAlfabeto2Element) {
            const areaDesafiosL2 = document.getElementById('areaDesafiosLicaoAlfabeto2');
            const refazerLicaoL2Btn = document.getElementById('refazerLicaoAlfabeto2');
            const audioL2TituloBtn = licaoAlfabeto2Element.querySelector('[data-audio-target="audioLicaoAlfabeto2Titulo"]');
            const audioL2EnunciadoBtn = licaoAlfabeto2Element.querySelector('[data-audio-target="audioLicaoAlfabeto2Enunciado"]');
            const audioL2Titulo = document.getElementById('audioLicaoAlfabeto2Titulo');
            const audioL2Enunciado = document.getElementById('audioLicaoAlfabeto2Enunciado');
            if(audioL2TituloBtn && audioL2Titulo) audioL2TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioL2Titulo, audioL2TituloBtn));
            if(audioL2EnunciadoBtn && audioL2Enunciado) audioL2EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioL2Enunciado, audioL2EnunciadoBtn));

            let estatisticasL2;
            let indiceEstiloOpcaoL2 = 0;
            const licaoAlfabeto2Data = [
                { id: 'l2a_1', emojiIcon: "⚽", palavraAudioId: "audioBola_L2", palavraNome: "Bola", letraInicialCorreta: "B", todasLetras: todasLetrasAlfabeto },
                { id: 'l2a_2', emojiIcon: "🏠", palavraAudioId: "audioCasa_L2", palavraNome: "Casa", letraInicialCorreta: "C", todasLetras: todasLetrasAlfabeto },
                { id: 'l2a_3', emojiIcon: "🎲", palavraAudioId: "audioDado_L2", palavraNome: "Dado", letraInicialCorreta: "D", todasLetras: todasLetrasAlfabeto },
                { id: 'l2a_4', emojiIcon: "🍍", palavraAudioId: "audioAbacaxi_L2", palavraNome: "Abacaxi", letraInicialCorreta: "A", todasLetras: todasLetrasAlfabeto },
                { id: 'l2a_5', emojiIcon: "🐒", palavraAudioId: "audioMacaco_L2", palavraNome: "Macaco", letraInicialCorreta: "M", todasLetras: todasLetrasAlfabeto }
            ];
            const totalDesafiosL2 = licaoAlfabeto2Data.length;
            const valorPercentualPorDesafioL2 = (totalDesafiosL2 > 0) ? (100 / totalDesafiosL2) : 0;

            function inicializarEstatisticasL2() { estatisticasL2 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoL2 = 0; }
            function renderizarLicaoAlfabeto2() {
                if(!areaDesafiosL2) return;
                areaDesafiosL2.innerHTML = '';
                inicializarEstatisticasL2();
                const desafios = window.shuffleArray([...licaoAlfabeto2Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoalfabeto2');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    
                    const emojiDisplay = document.createElement('div'); // Usando div para emoji
                    emojiDisplay.classList.add('imagem-desafio-l2a'); // Reutilizando/adaptando a classe CSS
                    emojiDisplay.textContent = challenge.emojiIcon;
                    desafioItemDiv.appendChild(emojiDisplay);
                    
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-l2a');
                    btnAudioPalavra.innerHTML = `🔊 Ouvir ${challenge.palavraNome}`;
                    btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.palavraAudioId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); });
                    desafioItemDiv.appendChild(btnAudioPalavra);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-letras-licaoalfabeto2');
                    const opcoes = window.gerarOpcoesComDistratoresLicao(challenge.letraInicialCorreta, challenge.todasLetras, 3);
                    opcoes.forEach(letraOpcao => {
                        const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-letra-L1A'); // Reutilizando estilo
                        const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoL2 % estilosDeFontePadrao.length];
                        opcaoDiv.classList.add(estiloOpcaoObj.classe); indiceEstiloOpcaoL2 = (indiceEstiloOpcaoL2 + 1) % estilosDeFontePadrao.length;
                        opcaoDiv.textContent = (estiloOpcaoObj.case === 'lower') ? letraOpcao.toLowerCase() : letraOpcao.toUpperCase();
                        opcaoDiv.dataset.letraValor = letraOpcao;
                        opcaoDiv.addEventListener('click', () => handleOpcaoLetraL2Click(opcaoDiv, challenge, desafioItemDiv, opcoesContainer));
                        opcoesContainer.appendChild(opcaoDiv);
                    });
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosL2.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto2', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleOpcaoLetraL2Click(opcaoElement, challengeData, desafioItemDiv, opcoesContainer) {
                 if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const letraEscolhida = opcaoElement.dataset.letraValor;
                const todasOpcoesVisuais = opcoesContainer.querySelectorAll('.opcao-letra-L1A');
                todasOpcoesVisuais.forEach(opt => opt.classList.add('desabilitada'));
                if (letraEscolhida.toUpperCase() === challengeData.letraInicialCorreta.toUpperCase()) {
                    opcaoElement.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL2.acertos++;
                } else {
                    opcaoElement.classList.add('errada');
                    todasOpcoesVisuais.forEach(opt => { if (opt.dataset.letraValor.toUpperCase() === challengeData.letraInicialCorreta.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL2.erros++; estatisticasL2.jogoPerfeitoAlcancado = false;
                }
                estatisticasL2.desafiosRespondidos++;
                if (!estatisticasL2.licaoConcluida && estatisticasL2.desafiosRespondidos === totalDesafiosL2) { estatisticasL2.licaoConcluida = true; }
                let netScore = (estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado) ? 100 : (estatisticasL2.acertos * valorPercentualPorDesafioL2) - (estatisticasL2.erros * valorPercentualPorDesafioL2);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto2', netScore, 100, estatisticasL2.erros, { licaoConcluida: estatisticasL2.licaoConcluida, jogoPerfeito: estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL2.desafiosRespondidos });
            }
            if(refazerLicaoL2Btn) { refazerLicaoL2Btn.addEventListener('click', renderizarLicaoAlfabeto2); }
            if(licaoAlfabeto2Element && !licaoAlfabeto2Element.classList.contains('licacao-bloqueada')) { renderizarLicaoAlfabeto2(); }
        }

        // --- LIÇÃO 3: Palavra Secreta: Complete com a Letra ---
        const licaoAlfabeto3Element = document.getElementById('licaoAlfabeto3');
        if (licaoAlfabeto3Element) {
            const areaDesafiosL3 = document.getElementById('areaDesafiosLicaoAlfabeto3');
            const refazerLicaoL3Btn = document.getElementById('refazerLicaoAlfabeto3');
            const audioL3TituloBtn = licaoAlfabeto3Element.querySelector('[data-audio-target="audioLicaoAlfabeto3Titulo"]');
            const audioL3EnunciadoBtn = licaoAlfabeto3Element.querySelector('[data-audio-target="audioLicaoAlfabeto3Enunciado"]');
            const audioL3Titulo = document.getElementById('audioLicaoAlfabeto3Titulo');
            const audioL3Enunciado = document.getElementById('audioLicaoAlfabeto3Enunciado');
            if(audioL3TituloBtn && audioL3Titulo) audioL3TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioL3Titulo, audioL3TituloBtn));
            if(audioL3EnunciadoBtn && audioL3Enunciado) audioL3EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioL3Enunciado, audioL3EnunciadoBtn));
            
            let estatisticasL3;
            let indiceEstiloOpcaoL3 = 0;
            const licaoAlfabeto3Data = [ // Caminhos atualizados para ícones/figuras
                { id: 'l3a_1', emojiIcon: "🏠", palavraCompletaAudioId: "audioCasa_L3", palavraCorreta: "CASA", letraCorreta: "C", todasLetras: todasLetrasAlfabeto },
                { id: 'l3a_2', emojiIcon: "🐈", palavraCompletaAudioId: "audioGato_L3", palavraCorreta: "GATO", letraCorreta: "G", todasLetras: todasLetrasAlfabeto },
                { id: 'l3a_3', emojiIcon: "☀️", palavraCompletaAudioId: "audioSol_L3", palavraCorreta: "SOL", letraCorreta: "S", todasLetras: todasLetrasAlfabeto },
                { id: 'l3a_4', emojiIcon: "🌙", palavraCompletaAudioId: "audioLua_L3", palavraCorreta: "LUA", letraCorreta: "L", todasLetras: todasLetrasAlfabeto },
                { id: 'l3a_5', emojiIcon: "🦆", palavraCompletaAudioId: "audioPato_L3", palavraCorreta: "PATO", letraCorreta: "P", todasLetras: todasLetrasAlfabeto }
            ];
            const totalDesafiosL3 = licaoAlfabeto3Data.length;
            const valorPercentualPorDesafioL3 = (totalDesafiosL3 > 0) ? (100 / totalDesafiosL3) : 0;

            function inicializarEstatisticasL3() { estatisticasL3 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoL3 = 0;}
            function renderizarLicaoAlfabeto3() {
                if(!areaDesafiosL3) return;
                areaDesafiosL3.innerHTML = '';
                inicializarEstatisticasL3();
                const desafios = window.shuffleArray([...licaoAlfabeto3Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoalfabeto3');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    
                    const emojiDisplay = document.createElement('div'); // Usando div para emoji
                    emojiDisplay.classList.add('imagem-desafio-l3a'); // Reutilizando/adaptando a classe CSS
                    emojiDisplay.textContent = challenge.emojiIcon;
                    desafioItemDiv.appendChild(emojiDisplay);

                    const palavraIncompletaDisplay = document.createElement('div');
                    palavraIncompletaDisplay.classList.add('palavra-incompleta-l3a');
                    palavraIncompletaDisplay.innerHTML = `<span class="lacuna-l3a">_</span>${challenge.palavraCorreta.substring(1).toLowerCase()}`; 
                    desafioItemDiv.appendChild(palavraIncompletaDisplay);
                    
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-l3a');
                    btnAudioPalavra.innerHTML = `🔊 Ouvir ${challenge.palavraCorreta}`;
                    btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.palavraCompletaAudioId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); });
                    desafioItemDiv.appendChild(btnAudioPalavra);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-letras-licaoalfabeto3');
                    const opcoes = window.gerarOpcoesComDistratoresLicao(challenge.letraCorreta, challenge.todasLetras, 3);
                    opcoes.forEach(letraOpcao => {
                        const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-letra-L1A');
                        const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoL3 % estilosDeFontePadrao.length];
                        opcaoDiv.classList.add(estiloOpcaoObj.classe); indiceEstiloOpcaoL3 = (indiceEstiloOpcaoL3 + 1) % estilosDeFontePadrao.length;
                        opcaoDiv.textContent = (estiloOpcaoObj.case === 'lower') ? letraOpcao.toLowerCase() : letraOpcao.toUpperCase();
                        opcaoDiv.dataset.letraValor = letraOpcao;
                        opcaoDiv.addEventListener('click', () => handleOpcaoLetraL3Click(opcaoDiv, challenge, desafioItemDiv, opcoesContainer, palavraIncompletaDisplay));
                        opcoesContainer.appendChild(opcaoDiv);
                    });
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosL3.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto3', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleOpcaoLetraL3Click(opcaoElement, challengeData, desafioItemDiv, opcoesContainer, palavraIncompletaDisplay) {
                if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const letraEscolhida = opcaoElement.dataset.letraValor;
                const todasOpcoesVisuais = opcoesContainer.querySelectorAll('.opcao-letra-L1A');
                todasOpcoesVisuais.forEach(opt => opt.classList.add('desabilitada'));
                if (letraEscolhida.toUpperCase() === challengeData.letraCorreta.toUpperCase()) {
                    opcaoElement.classList.add('correta');
                    palavraIncompletaDisplay.innerHTML = `<span class="letra-preenchida-l3a">${challengeData.letraCorreta.toUpperCase()}</span>${challengeData.palavraCorreta.substring(1).toLowerCase()}`;
                    if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL3.acertos++;
                } else {
                    opcaoElement.classList.add('errada');
                    todasOpcoesVisuais.forEach(opt => { if (opt.dataset.letraValor.toUpperCase() === challengeData.letraCorreta.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL3.erros++; estatisticasL3.jogoPerfeitoAlcancado = false;
                }
                estatisticasL3.desafiosRespondidos++;
                if (!estatisticasL3.licaoConcluida && estatisticasL3.desafiosRespondidos === totalDesafiosL3) { estatisticasL3.licaoConcluida = true; }
                let netScore = (estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado) ? 100 : (estatisticasL3.acertos * valorPercentualPorDesafioL3) - (estatisticasL3.erros * valorPercentualPorDesafioL3);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto3', netScore, 100, estatisticasL3.erros, { licaoConcluida: estatisticasL3.licaoConcluida, jogoPerfeito: estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL3.desafiosRespondidos });
            }
            if(refazerLicaoL3Btn) { refazerLicaoL3Btn.addEventListener('click', renderizarLicaoAlfabeto3); }
            if(licaoAlfabeto3Element && !licaoAlfabeto3Element.classList.contains('licacao-bloqueada')) { renderizarLicaoAlfabeto3(); }
        }

        // --- LIÇÃO 4: Letras Fugitivas: Encontre na Palavra! ---
        const licaoAlfabeto4Element = document.getElementById('licaoAlfabeto4');
        if (licaoAlfabeto4Element) {
            const areaDesafiosL4 = document.getElementById('areaDesafiosLicaoAlfabeto4');
            const refazerLicaoL4Btn = document.getElementById('refazerLicaoAlfabeto4');
            const audioL4TituloBtn = licaoAlfabeto4Element.querySelector('[data-audio-target="audioLicaoAlfabeto4Titulo"]');
            const audioL4EnunciadoBtn = licaoAlfabeto4Element.querySelector('[data-audio-target="audioLicaoAlfabeto4Enunciado"]');
            const audioL4Titulo = document.getElementById('audioLicaoAlfabeto4Titulo');
            const audioL4Enunciado = document.getElementById('audioLicaoAlfabeto4Enunciado');
            if(audioL4TituloBtn && audioL4Titulo) audioL4TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioL4Titulo, audioL4TituloBtn));
            if(audioL4EnunciadoBtn && audioL4Enunciado) audioL4EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioL4Enunciado, audioL4EnunciadoBtn));

            let estatisticasL4;
            let indiceEstiloPalavraL4 = 0;
            const licaoAlfabeto4Data = [
                { id: 'l4a_1', letraAlvo: "A", audioPromptLetraId: "audioEncontreLetraA_L4", palavra: "BANANA", palavraAudioId: "audioBanana_L4" },
                { id: 'l4a_2', letraAlvo: "M", audioPromptLetraId: "audioEncontreLetraM_L4", palavra: "MACACO", palavraAudioId: "audioMacaco_L4" },
                { id: 'l4a_3', letraAlvo: "O", audioPromptLetraId: "audioEncontreLetraO_L4", palavra: "BOLOFOFO", palavraAudioId: "audioBolofofo_L4" },
                { id: 'l4a_4', letraAlvo: "E", audioPromptLetraId: "audioEncontreLetraE_L4", palavra: "ELEFANTE", palavraAudioId: "audioElefante_L4" },
                { id: 'l4a_5', letraAlvo: "S", audioPromptLetraId: "audioEncontreLetraS_L4", palavra: "SAPOSSAURO", palavraAudioId: "audioSapossauro_L4" }
            ];
            const totalDesafiosL4 = licaoAlfabeto4Data.length;
            const valorPercentualPorDesafioL4 = (totalDesafiosL4 > 0) ? (100 / totalDesafiosL4) : 0;

            function inicializarEstatisticasL4() { estatisticasL4 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloPalavraL4 = 0; }
            
            function renderizarLicaoAlfabeto4() {
                if(!areaDesafiosL4) return;
                areaDesafiosL4.innerHTML = '';
                inicializarEstatisticasL4();
                const desafios = window.shuffleArray([...licaoAlfabeto4Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoalfabeto4');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    desafioItemDiv.dataset.letrasAlvoEncontradas = "0"; desafioItemDiv.dataset.errosNesteDesafio = "0";

                    const promptContainer = document.createElement('div'); promptContainer.classList.add('prompt-letra-alvo-l4a');
                    const promptTexto = document.createElement('span'); promptTexto.textContent = `Encontre a letra: ${challenge.letraAlvo.toUpperCase()}`;
                    const btnAudioPrompt = document.createElement('button'); btnAudioPrompt.classList.add('btn-audio-prompt-l4a');
                    btnAudioPrompt.innerHTML = '🔊'; btnAudioPrompt.addEventListener('click', () => { const audioEl = document.getElementById(challenge.audioPromptLetraId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPrompt); });
                    promptContainer.appendChild(promptTexto); promptContainer.appendChild(btnAudioPrompt); desafioItemDiv.appendChild(promptContainer);

                    const palavraContainer = document.createElement('div'); palavraContainer.classList.add('palavra-container-cacaletras-l4a');
                    const estiloPalavraObj = estilosDeFontePadrao[indiceEstiloPalavraL4 % estilosDeFontePadrao.length];
                    indiceEstiloPalavraL4 = (indiceEstiloPalavraL4 + 1) % estilosDeFontePadrao.length;
                    
                    let totalLetrasAlvoNaPalavra = 0;
                    Array.from(challenge.palavra.toUpperCase()).forEach((char) => {
                        if (char === challenge.letraAlvo.toUpperCase()) { totalLetrasAlvoNaPalavra++; }
                        const letraSpan = document.createElement('span'); letraSpan.classList.add('letra-clicavel-l4a');
                        letraSpan.classList.add(estiloPalavraObj.classe);
                        letraSpan.textContent = (estiloPalavraObj.case === 'lower') ? char.toLowerCase() : char.toUpperCase();
                        letraSpan.dataset.letraOriginal = char.toUpperCase(); letraSpan.dataset.isAlvo = (char.toUpperCase() === challenge.letraAlvo.toUpperCase());
                        letraSpan.dataset.clicada = "false";
                        letraSpan.addEventListener('click', () => handleLetraCacaClickL4(letraSpan, challenge, desafioItemDiv, palavraContainer));
                        palavraContainer.appendChild(letraSpan);
                    });
                    desafioItemDiv.dataset.totalAlvoNaPalavra = totalLetrasAlvoNaPalavra;
                    desafioItemDiv.appendChild(palavraContainer); areaDesafiosL4.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto4', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }

            function handleLetraCacaClickL4(letraSpan, challengeData, desafioItemDiv) { // Removido palavraContainer não usado
                if (letraSpan.dataset.clicada === "true" || desafioItemDiv.dataset.answered === "true") return;
                window.pararAudioGlobal(); letraSpan.dataset.clicada = "true";
            
                const isAlvo = letraSpan.dataset.isAlvo === "true";
                let letrasAlvoEncontradas = parseInt(desafioItemDiv.dataset.letrasAlvoEncontradas);
                let errosNesteDesafio = parseInt(desafioItemDiv.dataset.errosNesteDesafio);
                const totalAlvoNaPalavra = parseInt(desafioItemDiv.dataset.totalAlvoNaPalavra);
            
                if (isAlvo) {
                    letraSpan.classList.add('correta-l4a'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                    letrasAlvoEncontradas++; desafioItemDiv.dataset.letrasAlvoEncontradas = letrasAlvoEncontradas;
                } else {
                    letraSpan.classList.add('errada-l4a'); if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    errosNesteDesafio++; desafioItemDiv.dataset.errosNesteDesafio = errosNesteDesafio;
                    estatisticasL4.jogoPerfeitoAlcancado = false;
                }
            
                if (letrasAlvoEncontradas === totalAlvoNaPalavra) {
                    desafioItemDiv.dataset.answered = "true"; estatisticasL4.desafiosRespondidos++;
                    if (errosNesteDesafio === 0) { estatisticasL4.acertos++; } 
                    // else { estatisticasL4.jogoPerfeitoAlcancado = false; } // Já tratado no clique errado

                    const todasLetrasNestaPalavra = desafioItemDiv.querySelectorAll('.letra-clicavel-l4a');
                    todasLetrasNestaPalavra.forEach(l => { if(l.dataset.clicada === "false") { l.classList.add('desabilitada-l4a'); } });
            
                    if (!estatisticasL4.licaoConcluida && estatisticasL4.desafiosRespondidos === totalDesafiosL4) { estatisticasL4.licaoConcluida = true; }
                }
            
                let netScore = (estatisticasL4.acertos * valorPercentualPorDesafioL4); // Só pontua por palavras 100% corretas
                if (estatisticasL4.licaoConcluida && !estatisticasL4.jogoPerfeitoAlcancado && netScore === 100) {
                     // Se concluiu e o score seria 100 mas não foi perfeito, ajusta para menos (já tratado por jogoPerfeito na legenda)
                     // A pontuação é baseada em desafios perfeitos.
                }
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoAlfabeto4', netScore, 100, errosNesteDesafio > 0 ? 1:0, // Passar se houve erro no desafio atual para legenda
                    { licaoConcluida: estatisticasL4.licaoConcluida, jogoPerfeito: estatisticasL4.licaoConcluida && estatisticasL4.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL4.desafiosRespondidos });
            }
            if(refazerLicaoL4Btn) { refazerLicaoL4Btn.addEventListener('click', renderizarLicaoAlfabeto4); }
            if(licaoAlfabeto4Element && !licaoAlfabeto4Element.classList.contains('licacao-bloqueada')) { renderizarLicaoAlfabeto4(); }
        }

        // Adicionar listeners de mouseover para TODOS os botões de refazer se audioRefazerGeral existir
        [ 'refazerLicaoAlfabeto1', 'refazerLicaoAlfabeto2', 'refazerLicaoAlfabeto3', 'refazerLicaoAlfabeto4',
          'refazerLicaoEV1', 'refazerLicaoEV2', 'refazerLicaoEV3', 'refazerLicaoEV4'
        ].forEach(idBtn => {
            const btn = document.getElementById(idBtn);
            if (btn && audioRefazerGeral) {
                btn.addEventListener('mouseover', () => {
                    window.pararAudioGlobal();
                    if (audioRefazerGeral.paused || audioRefazerGeral.currentTime === 0) {
                        audioRefazerGeral.play().catch(e => console.error("Erro audioRefazer:", e.message));
                    } else {
                        audioRefazerGeral.pause(); audioRefazerGeral.currentTime = 0;
                        audioRefazerGeral.play().catch(e => console.error("Erro audioRefazer (replay):", e.message));
                    }
                });
            }
        });
    }
});