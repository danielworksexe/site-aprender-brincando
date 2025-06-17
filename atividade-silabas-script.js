document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadeSilabasContainer = document.querySelector('.pagina-atividade .conteudo-atividade');

    if (paginaAtividadeSilabasContainer && document.getElementById('licaoSilabas1')) {
        console.log("Script da Atividade Prática de Sílabas Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');

        const estilosDeFontePadrao = [
            { classe: 'letra-opcao-bastao-upper', case: 'upper' },
            { classe: 'letra-opcao-cursiva-lower', case: 'lower' },
            { classe: 'letra-opcao-imprensa-lower', case: 'lower' },
            { classe: 'letra-opcao-cursiva-upper', case: 'upper' }
        ];

        // --- LIÇÃO 1: Qual é a SÍLABA? ---
        const licaoSilabas1Element = document.getElementById('licaoSilabas1');
        if (licaoSilabas1Element) {
            const areaDesafiosL1S = document.getElementById('areaDesafiosLicaoSilabas1');
            const refazerLicaoL1SBtn = document.getElementById('refazerLicaoSilabas1');
            const audioL1STituloBtn = licaoSilabas1Element.querySelector('[data-audio-target="audioLicaoSilabas1Titulo"]');
            const audioL1SEnunciadoBtn = licaoSilabas1Element.querySelector('[data-audio-target="audioLicaoSilabas1Enunciado"]');
            const audioL1STitulo = document.getElementById('audioLicaoSilabas1Titulo');
            const audioL1SEnunciado = document.getElementById('audioLicaoSilabas1Enunciado');

            if(audioL1STituloBtn && audioL1STitulo) audioL1STituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioL1STitulo, audioL1STituloBtn));
            if(audioL1SEnunciadoBtn && audioL1SEnunciado) audioL1SEnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioL1SEnunciado, audioL1SEnunciadoBtn));

            let estatisticasL1S;
            let indiceEstiloOpcaoL1S = 0;

            const licaoSilabas1Data = [
                { id: 'l1s_1', audioSomSilabaId: "audioSilabaBA_L1S", silabaCorreta: "BA", opcoesSilaba: ["BA", "CA", "DA"] },
                { id: 'l1s_2', audioSomSilabaId: "audioSilabaME_L1S", silabaCorreta: "ME", opcoesSilaba: ["ME", "NE", "TE"] }, // Placeholder audioId
                { id: 'l1s_3', audioSomSilabaId: "audioSilabaFO_L1S", silabaCorreta: "FO", opcoesSilaba: ["FO", "SO", "VO"] }, // Placeholder audioId
                { id: 'l1s_4', audioSomSilabaId: "audioSilabaLU_L1S", silabaCorreta: "LU", opcoesSilaba: ["LU", "NU", "SU"] }, // Placeholder audioId
                { id: 'l1s_5', audioSomSilabaId: "audioSilabaCRE_L1S", silabaCorreta: "CRE", opcoesSilaba: ["CRE", "PRE", "TRE"] }
            ];
            const totalDesafiosL1S = licaoSilabas1Data.length;
            const valorPercentualPorDesafioL1S = (totalDesafiosL1S > 0) ? (100 / totalDesafiosL1S) : 0;

            function inicializarEstatisticasL1S() { estatisticasL1S = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoL1S = 0; }

            function renderizarLicaoSilabas1() {
                if (!areaDesafiosL1S) return;
                areaDesafiosL1S.innerHTML = ''; inicializarEstatisticasL1S();
                const desafios = window.shuffleArray([...licaoSilabas1Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaosilabas1');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    const btnAudioSomSilaba = document.createElement('button'); btnAudioSomSilaba.classList.add('btn-audio-som-silaba-l1s');
                    btnAudioSomSilaba.innerHTML = `🔊 Ouvir Sílaba ${desafios.indexOf(challenge) + 1}`;
                    btnAudioSomSilaba.addEventListener('click', () => { const audioEl = document.getElementById(challenge.audioSomSilabaId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioSomSilaba); });
                    desafioItemDiv.appendChild(btnAudioSomSilaba);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-silabas-licaosilabas1');
                    const opcoesEmbaralhadas = window.shuffleArray([...challenge.opcoesSilaba]);
                    opcoesEmbaralhadas.forEach(silabaOpcao => {
                        const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-silaba-L1S');
                        const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoL1S % estilosDeFontePadrao.length];
                        // Aplicar estilos à sílaba dentro da opção
                        const silabaBastaoSpan = document.createElement('span');
                        silabaBastaoSpan.classList.add('silaba-bastao', estiloOpcaoObj.classe);
                        silabaBastaoSpan.textContent = (estiloOpcaoObj.case === 'lower') ? silabaOpcao.toLowerCase() : silabaOpcao.toUpperCase();
                        
                        const silabaCursivaSpan = document.createElement('span');
                        // Para cursiva, escolhemos um estilo cursivo, por exemplo, o segundo da lista se for cursiva lower
                        const estiloCursivo = estilosDeFontePadrao.find(e => e.classe.includes('cursiva-lower')) || estilosDeFontePadrao[1];
                        silabaCursivaSpan.classList.add('silaba-cursiva', estiloCursivo.classe);
                        silabaCursivaSpan.textContent = (estiloCursivo.case === 'lower') ? silabaOpcao.toLowerCase() : silabaOpcao.toUpperCase();
                        
                        opcaoDiv.appendChild(silabaBastaoSpan);
                        opcaoDiv.appendChild(silabaCursivaSpan);
                        
                        indiceEstiloOpcaoL1S = (indiceEstiloOpcaoL1S + 1) % estilosDeFontePadrao.length;
                        opcaoDiv.dataset.silabaValor = silabaOpcao;
                        opcaoDiv.addEventListener('click', () => handleOpcaoSilabaL1SClick(opcaoDiv, challenge, desafioItemDiv, opcoesContainer));
                        opcoesContainer.appendChild(opcaoDiv);
                    });
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosL1S.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoSilabas1', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleOpcaoSilabaL1SClick(opcaoElement, challengeData, desafioItemDiv, opcoesContainer) {
                if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const silabaEscolhida = opcaoElement.dataset.silabaValor;
                const todasOpcoesVisuais = opcoesContainer.querySelectorAll('.opcao-silaba-L1S');
                todasOpcoesVisuais.forEach(opt => opt.classList.add('desabilitada'));
                if (silabaEscolhida.toUpperCase() === challengeData.silabaCorreta.toUpperCase()) {
                    opcaoElement.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL1S.acertos++;
                } else {
                    opcaoElement.classList.add('errada');
                    todasOpcoesVisuais.forEach(opt => { if (opt.dataset.silabaValor.toUpperCase() === challengeData.silabaCorreta.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL1S.erros++; estatisticasL1S.jogoPerfeitoAlcancado = false;
                }
                estatisticasL1S.desafiosRespondidos++;
                if (!estatisticasL1S.licaoConcluida && estatisticasL1S.desafiosRespondidos === totalDesafiosL1S) { estatisticasL1S.licaoConcluida = true; }
                let netScore = (estatisticasL1S.licaoConcluida && estatisticasL1S.jogoPerfeitoAlcancado) ? 100 : (estatisticasL1S.acertos * valorPercentualPorDesafioL1S) - (estatisticasL1S.erros * valorPercentualPorDesafioL1S);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoSilabas1', netScore, 100, estatisticasL1S.erros, { licaoConcluida: estatisticasL1S.licaoConcluida, jogoPerfeito: estatisticasL1S.licaoConcluida && estatisticasL1S.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL1S.desafiosRespondidos });
            }
            if (refazerLicaoL1SBtn) { refazerLicaoL1SBtn.addEventListener('click', renderizarLicaoSilabas1); }
            if (licaoSilabas1Element && !licaoSilabas1Element.classList.contains('licacao-bloqueada')) { renderizarLicaoSilabas1(); }
        }

        // --- LIÇÃO 2: Onde está a SÍLABA na Palavra? ---
        const licaoSilabas2Element = document.getElementById('licaoSilabas2');
        if (licaoSilabas2Element) {
            const areaDesafiosL2S = document.getElementById('areaDesafiosLicaoSilabas2');
            const refazerLicaoL2SBtn = document.getElementById('refazerLicaoSilabas2');
            const audioL2STituloBtn = licaoSilabas2Element.querySelector('[data-audio-target="audioLicaoSilabas2Titulo"]');
            const audioL2SEnunciadoBtn = licaoSilabas2Element.querySelector('[data-audio-target="audioLicaoSilabas2Enunciado"]');
            /* ... pegar e adicionar listeners para audioL2STitulo e audioL2SEnunciado ... */

            let estatisticasL2S;
            const licaoSilabas2Data = [
                { id: 'l2s_1', palavra: "MACACO", palavraAudioId: "audioPalavraMacaco_L2S", silabaAlvo: "CA", audioSilabaAlvoId: "audioEncontreSilabaCA_L2S", silabasDaPalavra: ["MA", "CA", "CO"] },
                { id: 'l2s_2', palavra: "BONECA", palavraAudioId: "audioPalavraBoneca_L2S", silabaAlvo: "NE", audioSilabaAlvoId: "audioEncontreSilabaNE_L2S", silabasDaPalavra: ["BO", "NE", "CA"] }, // Placeholder audio
                { id: 'l2s_3', palavra: "SAPATO", palavraAudioId: "audioPalavraSapato_L2S", silabaAlvo: "PA", audioSilabaAlvoId: "audioEncontreSilabaPA_L2S", silabasDaPalavra: ["SA", "PA", "TO"] }  // Placeholder audio
            ];
            const totalDesafiosL2S = licaoSilabas2Data.length;
            const valorPercentualPorDesafioL2S = (totalDesafiosL2S > 0) ? (100 / totalDesafiosL2S) : 0;

            function inicializarEstatisticasL2S() { estatisticasL2S = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            function renderizarLicaoSilabas2() {
                if (!areaDesafiosL2S) return;
                areaDesafiosL2S.innerHTML = ''; inicializarEstatisticasL2S();
                const desafios = window.shuffleArray([...licaoSilabas2Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaosilabas2');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";

                    const promptContainer = document.createElement('div'); promptContainer.classList.add('prompt-silaba-alvo-l2s');
                    const promptTexto = document.createElement('span'); promptTexto.textContent = `Encontre a sílaba: ${challenge.silabaAlvo.toUpperCase()}`;
                    const btnAudioPrompt = document.createElement('button'); btnAudioPrompt.classList.add('btn-audio-prompt-l2s');
                    btnAudioPrompt.innerHTML = '🔊'; btnAudioPrompt.addEventListener('click', () => { const audioEl = document.getElementById(challenge.audioSilabaAlvoId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPrompt); });
                    promptContainer.appendChild(promptTexto); promptContainer.appendChild(btnAudioPrompt); desafioItemDiv.appendChild(promptContainer);

                    const palavraSegmentadaDiv = document.createElement('div'); palavraSegmentadaDiv.classList.add('palavra-segmentada-l2s');
                    challenge.silabasDaPalavra.forEach(segSilaba => {
                        const segmentoSpan = document.createElement('span'); segmentoSpan.classList.add('segmento-silaba-l2s');
                        segmentoSpan.textContent = segSilaba.toUpperCase(); // Mostrar em bastão
                        segmentoSpan.dataset.silaba = segSilaba;
                        segmentoSpan.addEventListener('click', () => handleSegmentoSilabaL2SClick(segmentoSpan, challenge, desafioItemDiv, palavraSegmentadaDiv));
                        palavraSegmentadaDiv.appendChild(segmentoSpan);
                    });
                    desafioItemDiv.appendChild(palavraSegmentadaDiv);
                    // Botão para ouvir a palavra inteira
                    const btnAudioPalavraCompleta = document.createElement('button');
                    btnAudioPalavraCompleta.classList.add('btn-audio-palavra-l2s'); // Reutilizar estilo se aplicável
                    btnAudioPalavraCompleta.textContent = `Ouvir "${challenge.palavra}"`;
                    btnAudioPalavraCompleta.addEventListener('click', () => {
                        const audioEl = document.getElementById(challenge.palavraAudioId);
                        if (audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavraCompleta);
                    });
                    desafioItemDiv.appendChild(btnAudioPalavraCompleta);

                    areaDesafiosL2S.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoSilabas2', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleSegmentoSilabaL2SClick(segmentoElement, challengeData, desafioItemDiv, palavraSegmentadaDiv) {
                if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const silabaEscolhida = segmentoElement.dataset.silaba;
                const todosSegmentos = palavraSegmentadaDiv.querySelectorAll('.segmento-silaba-l2s');
                todosSegmentos.forEach(seg => seg.classList.add('desabilitada'));

                if (silabaEscolhida.toUpperCase() === challengeData.silabaAlvo.toUpperCase()) {
                    segmentoElement.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL2S.acertos++;
                } else {
                    segmentoElement.classList.add('errada');
                    todosSegmentos.forEach(seg => { if (seg.dataset.silaba.toUpperCase() === challengeData.silabaAlvo.toUpperCase()) { seg.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL2S.erros++; estatisticasL2S.jogoPerfeitoAlcancado = false;
                }
                estatisticasL2S.desafiosRespondidos++;
                if (!estatisticasL2S.licaoConcluida && estatisticasL2S.desafiosRespondidos === totalDesafiosL2S) { estatisticasL2S.licaoConcluida = true; }
                let netScore = (estatisticasL2S.licaoConcluida && estatisticasL2S.jogoPerfeitoAlcancado) ? 100 : (estatisticasL2S.acertos * valorPercentualPorDesafioL2S) - (estatisticasL2S.erros * valorPercentualPorDesafioL2S);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoSilabas2', netScore, 100, estatisticasL2S.erros, { licaoConcluida: estatisticasL2S.licaoConcluida, jogoPerfeito: estatisticasL2S.licaoConcluida && estatisticasL2S.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL2S.desafiosRespondidos });
            }
            if(refazerLicaoL2SBtn) { refazerLicaoL2SBtn.addEventListener('click', renderizarLicaoSilabas2); }
            if(licaoSilabas2Element && !licaoSilabas2Element.classList.contains('licacao-bloqueada')) { renderizarLicaoSilabas2(); }
        }

        // --- LIÇÃO 3: Qual SÍLABA Começa? ---
        const licaoSilabas3Element = document.getElementById('licaoSilabas3');
        if (licaoSilabas3Element) {
            const areaDesafiosL3S = document.getElementById('areaDesafiosLicaoSilabas3');
            const refazerLicaoL3SBtn = document.getElementById('refazerLicaoSilabas3');
            /* ... listeners para título/enunciado L3S ... */

            let estatisticasL3S;
            let indiceEstiloOpcaoL3S = 0;
            const licaoSilabas3Data = [
                { id: 'l3s_1', emojiIcon: "⚽", palavraNome: "Bola", palavraAudioId: "audioFiguraBola_L3S", silabaInicialCorreta: "BO", opcoesSilaba: ["BO", "LA", "CA"] },
                { id: 'l3s_2', emojiIcon: "🏠", palavraNome: "Casa", palavraAudioId: "audioFiguraCasa_L3S", silabaInicialCorreta: "CA", opcoesSilaba: ["CA", "SA", "MA"] },
                { id: 'l3s_3', emojiIcon: "🦆", palavraNome: "Pato", palavraAudioId: "audioFiguraPato_L3S", silabaInicialCorreta: "PA", opcoesSilaba: ["PA", "TO", "GA"] }
            ];
            const totalDesafiosL3S = licaoSilabas3Data.length;
            const valorPercentualPorDesafioL3S = (totalDesafiosL3S > 0) ? (100 / totalDesafiosL3S) : 0;

            function inicializarEstatisticasL3S() { estatisticasL3S = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoL3S = 0;}
            function renderizarLicaoSilabas3() {
                if (!areaDesafiosL3S) return;
                areaDesafiosL3S.innerHTML = ''; inicializarEstatisticasL3S();
                const desafios = window.shuffleArray([...licaoSilabas3Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaosilabas3');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    const emojiDisplay = document.createElement('div'); emojiDisplay.classList.add('emoji-desafio-l3s');
                    emojiDisplay.textContent = challenge.emojiIcon; desafioItemDiv.appendChild(emojiDisplay);
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-l3s');
                    btnAudioPalavra.innerHTML = `🔊 Ouvir ${challenge.palavraNome}`;
                    btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.palavraAudioId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); });
                    desafioItemDiv.appendChild(btnAudioPalavra);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-silabas-licaosilabas3');
                    const opcoesEmbaralhadas = window.shuffleArray([...challenge.opcoesSilaba]);
                    opcoesEmbaralhadas.forEach(silabaOpcao => {
                        const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-silaba-L1S'); // Reutilizar estilo
                        const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoL3S % estilosDeFontePadrao.length];
                        // Aplicar estilos à sílaba dentro da opção
                        const silabaBastaoSpan = document.createElement('span'); silabaBastaoSpan.classList.add('silaba-bastao', estiloOpcaoObj.classe); silabaBastaoSpan.textContent = (estiloOpcaoObj.case === 'lower') ? silabaOpcao.toLowerCase() : silabaOpcao.toUpperCase();
                        const silabaCursivaSpan = document.createElement('span'); const estiloCursivo = estilosDeFontePadrao.find(e => e.classe.includes('cursiva-lower')) || estilosDeFontePadrao[1]; silabaCursivaSpan.classList.add('silaba-cursiva', estiloCursivo.classe); silabaCursivaSpan.textContent = (estiloCursivo.case === 'lower') ? silabaOpcao.toLowerCase() : silabaOpcao.toUpperCase();
                        opcaoDiv.appendChild(silabaBastaoSpan); opcaoDiv.appendChild(silabaCursivaSpan);
                        indiceEstiloOpcaoL3S = (indiceEstiloOpcaoL3S + 1) % estilosDeFontePadrao.length;
                        opcaoDiv.dataset.silabaValor = silabaOpcao;
                        opcaoDiv.addEventListener('click', () => handleOpcaoSilabaL3SClick(opcaoDiv, challenge, desafioItemDiv, opcoesContainer));
                        opcoesContainer.appendChild(opcaoDiv);
                    });
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosL3S.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoSilabas3', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleOpcaoSilabaL3SClick(opcaoElement, challengeData, desafioItemDiv, opcoesContainer) {
                if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const silabaEscolhida = opcaoElement.dataset.silabaValor;
                const todasOpcoesVisuais = opcoesContainer.querySelectorAll('.opcao-silaba-L1S');
                todasOpcoesVisuais.forEach(opt => opt.classList.add('desabilitada'));
                if (silabaEscolhida.toUpperCase() === challengeData.silabaInicialCorreta.toUpperCase()) {
                    opcaoElement.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL3S.acertos++;
                } else {
                    opcaoElement.classList.add('errada');
                    todasOpcoesVisuais.forEach(opt => { if (opt.dataset.silabaValor.toUpperCase() === challengeData.silabaInicialCorreta.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL3S.erros++; estatisticasL3S.jogoPerfeitoAlcancado = false;
                }
                estatisticasL3S.desafiosRespondidos++;
                if (!estatisticasL3S.licaoConcluida && estatisticasL3S.desafiosRespondidos === totalDesafiosL3S) { estatisticasL3S.licaoConcluida = true; }
                let netScore = (estatisticasL3S.licaoConcluida && estatisticasL3S.jogoPerfeitoAlcancado) ? 100 : (estatisticasL3S.acertos * valorPercentualPorDesafioL3S) - (estatisticasL3S.erros * valorPercentualPorDesafioL3S);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoSilabas3', netScore, 100, estatisticasL3S.erros, { licaoConcluida: estatisticasL3S.licaoConcluida, jogoPerfeito: estatisticasL3S.licaoConcluida && estatisticasL3S.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL3S.desafiosRespondidos });
            }
            if(refazerLicaoL3SBtn) { refazerLicaoL3SBtn.addEventListener('click', renderizarLicaoSilabas3); }
            if(licaoSilabas3Element && !licaoSilabas3Element.classList.contains('licacao-bloqueada')) { renderizarLicaoSilabas3(); }
        }

        // --- LIÇÃO 4: Quantas SÍLABAS Tem? ---
        const licaoSilabas4Element = document.getElementById('licaoSilabas4');
        if (licaoSilabas4Element) {
            const areaDesafiosL4S = document.getElementById('areaDesafiosLicaoSilabas4');
            const refazerLicaoL4SBtn = document.getElementById('refazerLicaoSilabas4');
            /* ... listeners para título/enunciado L4S ... */

            let estatisticasL4S;
            const licaoSilabas4Data = [
                { id: 'l4s_1', palavra: "SOL", palavraAudioId: "audioPalavraSol_L4S", numeroSilabasCorreto: 1, palavraDividida: "SOL" },
                { id: 'l4s_2', palavra: "CASA", palavraAudioId: "audioPalavraCasa_L4S", numeroSilabasCorreto: 2, palavraDividida: "CA-SA" },
                { id: 'l4s_3', palavra: "BONECA", palavraAudioId: "audioPalavraBoneca_L4S", numeroSilabasCorreto: 3, palavraDividida: "BO-NE-CA" }, //Reutilizar audioBoneca_L2S
                { id: 'l4s_4', palavra: "BORBOLETA", palavraAudioId: "audioPalavraBorboleta_L4S", numeroSilabasCorreto: 4, palavraDividida: "BOR-BO-LE-TA" },
                { id: 'l4s_5', palavra: "MACACO", palavraAudioId: "audioPalavraMacaco_L2S", numeroSilabasCorreto: 3, palavraDividida: "MA-CA-CO" } // Reutilizar
            ];
            const totalDesafiosL4S = licaoSilabas4Data.length;
            const valorPercentualPorDesafioL4S = (totalDesafiosL4S > 0) ? (100 / totalDesafiosL4S) : 0;
            const opcoesDeNumero = [1, 2, 3, 4]; // Opções de quantidade de sílabas

            function inicializarEstatisticasL4S() { estatisticasL4S = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            function renderizarLicaoSilabas4() {
                if (!areaDesafiosL4S) return;
                areaDesafiosL4S.innerHTML = ''; inicializarEstatisticasL4S();
                const desafios = window.shuffleArray([...licaoSilabas4Data]);
                desafios.forEach(challenge => {
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaosilabas4');
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false";
                    
                    const palavraDisplayContainer = document.createElement('div'); palavraDisplayContainer.classList.add('palavra-display-l4s');
                    const palavraSpan = document.createElement('span'); palavraSpan.textContent = challenge.palavra.toUpperCase();
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-l4s');
                    btnAudioPalavra.innerHTML = '🔊'; btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.palavraAudioId); if(audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); });
                    palavraDisplayContainer.appendChild(palavraSpan); palavraDisplayContainer.appendChild(btnAudioPalavra);
                    desafioItemDiv.appendChild(palavraDisplayContainer);

                    const feedbackDivisao = document.createElement('div'); feedbackDivisao.classList.add('feedback-divisao-silabica-l4s');
                    feedbackDivisao.style.visibility = 'hidden'; // Esconde inicialmente
                    desafioItemDiv.appendChild(feedbackDivisao);

                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-numero-silabas-l4s');
                    opcoesDeNumero.forEach(num => {
                        const btnOpcaoNum = document.createElement('button'); btnOpcaoNum.classList.add('opcao-numero-l4s');
                        btnOpcaoNum.textContent = num; btnOpcaoNum.dataset.numero = num;
                        btnOpcaoNum.addEventListener('click', () => handleNumeroSilabasClickL4S(btnOpcaoNum, challenge, desafioItemDiv, opcoesContainer, feedbackDivisao));
                        opcoesContainer.appendChild(btnOpcaoNum);
                    });
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosL4S.appendChild(desafioItemDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoSilabas4', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 });
            }
            function handleNumeroSilabasClickL4S(btnOpcao, challengeData, desafioItemDiv, opcoesContainer, feedbackDivisao) {
                if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true";
                window.pararAudioGlobal(); const numeroEscolhido = parseInt(btnOpcao.dataset.numero);
                const todosBotoesNum = opcoesContainer.querySelectorAll('.opcao-numero-l4s');
                todosBotoesNum.forEach(btn => btn.classList.add('desabilitada'));

                feedbackDivisao.textContent = `A palavra "${challengeData.palavra.toUpperCase()}" separada é: ${challengeData.palavraDividida || challengeData.palavra.toUpperCase().split('').join('-')}. Ela tem ${challengeData.numeroSilabasCorreto} sílaba(s).`;
                feedbackDivisao.style.visibility = 'visible';

                if (numeroEscolhido === challengeData.numeroSilabasCorreto) {
                    btnOpcao.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL4S.acertos++;
                } else {
                    btnOpcao.classList.add('errada');
                    todosBotoesNum.forEach(btn => { if (parseInt(btn.dataset.numero) === challengeData.numeroSilabasCorreto) { btn.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL4S.erros++; estatisticasL4S.jogoPerfeitoAlcancado = false;
                }
                estatisticasL4S.desafiosRespondidos++;
                if (!estatisticasL4S.licaoConcluida && estatisticasL4S.desafiosRespondidos === totalDesafiosL4S) { estatisticasL4S.licaoConcluida = true; }
                let netScore = (estatisticasL4S.licaoConcluida && estatisticasL4S.jogoPerfeitoAlcancado) ? 100 : (estatisticasL4S.acertos * valorPercentualPorDesafioL4S) - (estatisticasL4S.erros * valorPercentualPorDesafioL4S);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoSilabas4', netScore, 100, estatisticasL4S.erros, { licaoConcluida: estatisticasL4S.licaoConcluida, jogoPerfeito: estatisticasL4S.licaoConcluida && estatisticasL4S.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL4S.desafiosRespondidos });
            }
            if(refazerLicaoL4SBtn) { refazerLicaoL4SBtn.addEventListener('click', renderizarLicaoSilabas4); }
            if(licaoSilabas4Element && !licaoSilabas4Element.classList.contains('licacao-bloqueada')) { renderizarLicaoSilabas4(); }
        }

        // Adicionar listeners de mouseover para TODOS os botões de refazer se audioRefazerGeral existir
        [ 'refazerLicaoAlfabeto1', 'refazerLicaoAlfabeto2', 'refazerLicaoAlfabeto3', 'refazerLicaoAlfabeto4',
          'refazerLicaoSilabas1', 'refazerLicaoSilabas2', 'refazerLicaoSilabas3', 'refazerLicaoSilabas4',
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