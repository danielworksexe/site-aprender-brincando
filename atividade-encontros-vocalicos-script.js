document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadeEVContainer = document.querySelector('.pagina-atividade .conteudo-atividade');

    if (paginaAtividadeEVContainer) {
        console.log("Script da Atividade de Encontros Vocálicos Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');

        const estilosDeFontePadrao = [
            { classe: 'letra-opcao-bastao-upper', case: 'upper' },
            { classe: 'letra-opcao-cursiva-lower', case: 'lower' },
            { classe: 'letra-opcao-imprensa-lower', case: 'lower' },
            { classe: 'letra-opcao-cursiva-upper', case: 'upper' }
        ];

        // --- LIÇÃO 1 EV: Palavras Escondidas ---
        const licaoEV1Element = document.getElementById('licaoEV1');
        if (licaoEV1Element) {
            const areaDesafiosLicaoEV1 = document.getElementById('areaDesafiosLicaoEV1');
            const refazerLicaoEV1Btn = document.getElementById('refazerLicaoEV1');
            const audioLicaoEV1TituloBtn = licaoEV1Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV1Titulo"]');
            const audioLicaoEV1EnunciadoBtn = licaoEV1Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV1Enunciado"]');
            const audioLicaoEV1Titulo = document.getElementById('audioLicaoEV1Titulo');
            const audioLicaoEV1Enunciado = document.getElementById('audioLicaoEV1Enunciado');

            if (audioLicaoEV1TituloBtn && audioLicaoEV1Titulo) { audioLicaoEV1TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV1Titulo, audioLicaoEV1TituloBtn)); }
            if (audioLicaoEV1EnunciadoBtn && audioLicaoEV1Enunciado) { audioLicaoEV1EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV1Enunciado, audioLicaoEV1EnunciadoBtn)); }

            let estatisticasLicaoEV1;
            let indiceEstiloPalavraLicaoEV1 = 0;
            const palavrasLicaoEV1_Data = [
                { palavra: "CAIXA",  temEncontro: true, encontroHL: "AI", audioId: "audioPalavraCaixaEV1" }, { palavra: "LEITE",  temEncontro: true, encontroHL: "EI", audioId: "audioPalavraLeiteEV1" },
                { palavra: "OURO",   temEncontro: true, encontroHL: "OU", audioId: "audioPalavraOuroEV1" }, { palavra: "PÃO",    temEncontro: true, encontroHL: "ÃO", audioId: "audioPalavraPaoEV1" },
                { palavra: "MÃE",    temEncontro: true, encontroHL: "ÃE", audioId: "audioPalavraMaeEV1" }, { palavra: "SAÚDE",  temEncontro: true, encontroHL: "AÚ", audioId: "audioPalavraSaudeEV1" },
                { palavra: "POETA",  temEncontro: true, encontroHL: "OE", audioId: "audioPalavraPoetaEV1" }, { palavra: "SOL",    temEncontro: false, audioId: "audioPalavraSolEV1" },
                { palavra: "FACA",   temEncontro: false, audioId: "audioPalavraFacaEV1" }, { palavra: "GATO",   temEncontro: false, audioId: "audioPalavraGatoEV1" }
            ];
            const totalPalavrasComEncontroEV1 = palavrasLicaoEV1_Data.filter(p => p.temEncontro).length;
            const valorPercentualPorItemCorretoEV1 = (totalPalavrasComEncontroEV1 > 0) ? (100 / totalPalavrasComEncontroEV1) : 0;

            function inicializarEstatisticasLicaoEV1() { estatisticasLicaoEV1 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloPalavraLicaoEV1 = 0; }
            function destacarEncontro(palavraCompleta, encontroParaDestacar) { if (!encontroParaDestacar) return palavraCompleta; const index = palavraCompleta.toUpperCase().indexOf(encontroParaDestacar.toUpperCase()); if (index === -1) return palavraCompleta; return palavraCompleta.substring(0, index) + `<span class="encontro-destacado-ev">${palavraCompleta.substring(index, index + encontroParaDestacar.length)}</span>` + palavraCompleta.substring(index + encontroParaDestacar.length); }
            
            function renderizarLicaoEV1() { 
                if (!areaDesafiosLicaoEV1) return; 
                areaDesafiosLicaoEV1.innerHTML = ''; 
                inicializarEstatisticasLicaoEV1(); 
                const palavrasEmbaralhadas = window.shuffleArray([...palavrasLicaoEV1_Data]); 
                palavrasEmbaralhadas.forEach((item) => { 
                    const itemContainer = document.createElement('div'); itemContainer.classList.add('palavra-ev-item-licao1'); 
                    const palavraDisplay = document.createElement('div'); palavraDisplay.classList.add('palavra-ev-display-licao1'); 
                    palavraDisplay.dataset.temEncontro = item.temEncontro; palavraDisplay.dataset.palavra = item.palavra; 
                    palavraDisplay.dataset.encontro = item.encontroHL || ""; palavraDisplay.dataset.respondida = "false"; 
                    palavraDisplay.classList.remove('desabilitada-apos-conclusao'); 
                    const estiloAtualObj = estilosDeFontePadrao[indiceEstiloPalavraLicaoEV1 % estilosDeFontePadrao.length]; 
                    palavraDisplay.classList.add(estiloAtualObj.classe); indiceEstiloPalavraLicaoEV1++; 
                    palavraDisplay.textContent = (estiloAtualObj.case === 'lower') ? item.palavra.toLowerCase() : item.palavra.toUpperCase(); 
                    palavraDisplay.addEventListener('click', handlePalavraClickLicaoEV1); 
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-ev1'); 
                    btnAudioPalavra.setAttribute('aria-label', `Ouvir palavra: ${item.palavra}`); btnAudioPalavra.innerHTML = '🔊'; 
                    btnAudioPalavra.addEventListener('click', (e) => { e.stopPropagation(); const audioEl = document.getElementById(item.audioId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); }); 
                    itemContainer.appendChild(palavraDisplay); itemContainer.appendChild(btnAudioPalavra); areaDesafiosLicaoEV1.appendChild(itemContainer); 
                }); 
                window.atualizarProgressoCircularAtividade('LicaoEV1', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 }); 
            }

            function handlePalavraClickLicaoEV1(event) { 
                const palavraClicadaDiv = event.currentTarget; 
                if (palavraClicadaDiv.classList.contains('desabilitada-apos-conclusao') || (estatisticasLicaoEV1.licaoConcluida && palavraClicadaDiv.dataset.respondida === "false") || palavraClicadaDiv.dataset.respondida === "true") { return; } 
                window.pararAudioGlobal(); 
                const temEncontroReal = palavraClicadaDiv.dataset.temEncontro === "true"; 
                if (temEncontroReal) { 
                    palavraClicadaDiv.classList.add('correta'); 
                    const encontroOriginal = palavraClicadaDiv.dataset.encontro; const palavraOriginal = palavraClicadaDiv.dataset.palavra; 
                    const estiloAplicadoClasse = estilosDeFontePadrao.find(est => palavraClicadaDiv.classList.contains(est.classe)); 
                    const caseAplicado = estiloAplicadoClasse ? estiloAplicadoClasse.case : 'upper'; 
                    let palavraComDestaque = (caseAplicado === 'lower') ? palavraOriginal.toLowerCase() : palavraOriginal.toUpperCase(); 
                    if(encontroOriginal) { palavraComDestaque = destacarEncontro(palavraComDestaque, (caseAplicado === 'lower' ? encontroOriginal.toLowerCase() : encontroOriginal.toUpperCase())); } 
                    palavraClicadaDiv.innerHTML = palavraComDestaque; 
                    if (audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasLicaoEV1.acertos++; 
                } else { 
                    palavraClicadaDiv.classList.add('errada'); 
                    if (audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasLicaoEV1.erros++; estatisticasLicaoEV1.jogoPerfeitoAlcancado = false; 
                } 
                palavraClicadaDiv.dataset.respondida = "true"; estatisticasLicaoEV1.desafiosRespondidos++; 
                if (!estatisticasLicaoEV1.licaoConcluida && estatisticasLicaoEV1.acertos === totalPalavrasComEncontroEV1) { 
                    estatisticasLicaoEV1.licaoConcluida = true; 
                    const todasAsPalavrasDisplay = areaDesafiosLicaoEV1.querySelectorAll('.palavra-ev-display-licao1'); 
                    todasAsPalavrasDisplay.forEach(pDisplay => { if (pDisplay.dataset.respondida !== "true") { pDisplay.classList.add('desabilitada-apos-conclusao'); } }); 
                } 
                let netScorePercentage; 
                if (estatisticasLicaoEV1.licaoConcluida && estatisticasLicaoEV1.jogoPerfeitoAlcancado) { 
                    netScorePercentage = 100; 
                } else { 
                    netScorePercentage = (estatisticasLicaoEV1.acertos * valorPercentualPorItemCorretoEV1) - (estatisticasLicaoEV1.erros * valorPercentualPorItemCorretoEV1); 
                } 
                netScorePercentage = Math.max(0, netScorePercentage); netScorePercentage = Math.min(100, netScorePercentage); 
                window.atualizarProgressoCircularAtividade('LicaoEV1', netScorePercentage, 100, estatisticasLicaoEV1.erros, { licaoConcluida: estatisticasLicaoEV1.licaoConcluida, jogoPerfeito: estatisticasLicaoEV1.licaoConcluida && estatisticasLicaoEV1.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasLicaoEV1.desafiosRespondidos }); 
            }
            if (refazerLicaoEV1Btn) { refazerLicaoEV1Btn.addEventListener('click', renderizarLicaoEV1); }
            if (licaoEV1Element && !licaoEV1Element.classList.contains('licacao-bloqueada')) { renderizarLicaoEV1(); }
        }

        // --- LIÇÃO 2 EV: Detetive dos Encontros ---
        const licaoEV2Element = document.getElementById('licaoEV2');
        if (licaoEV2Element) {
            const areaDesafiosLicaoEV2 = document.getElementById('areaDesafiosLicaoEV2');
            const refazerLicaoEV2Btn = document.getElementById('refazerLicaoEV2');
            const audioLicaoEV2TituloBtn = licaoEV2Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV2Titulo"]');
            const audioLicaoEV2EnunciadoBtn = licaoEV2Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV2Enunciado"]');
            const audioLicaoEV2Titulo = document.getElementById('audioLicaoEV2Titulo');
            const audioLicaoEV2Enunciado = document.getElementById('audioLicaoEV2Enunciado');

            if (audioLicaoEV2TituloBtn && audioLicaoEV2Titulo) { audioLicaoEV2TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV2Titulo, audioLicaoEV2TituloBtn)); }
            if (audioLicaoEV2EnunciadoBtn && audioLicaoEV2Enunciado) { audioLicaoEV2EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV2Enunciado, audioLicaoEV2EnunciadoBtn)); }
            
            let estatisticasLicaoEV2;
            let indiceEstiloOpcaoEV2 = 0;
            const licaoEV2Data = [
                { id: 'ev2_1', palavraAudioId: "audioPaiEV2",  encontroCorreto: "AI", opcoesOriginal: [ {ev: "AI", audioEvId: "audioEncOptAI_EV2"}, {ev: "EU", audioEvId: "audioEncOptEU_EV2"}, {ev: "UI", audioEvId: "audioEncOptUI_EV2"} ] }, { id: 'ev2_2', palavraAudioId: "audioCeuEV2",  encontroCorreto: "EU", opcoesOriginal: [ {ev: "OI", audioEvId: "audioEncOptOI_EV2"}, {ev: "EU", audioEvId: "audioEncOptEU_EV2"}, {ev: "AU", audioEvId: "audioEncOptAU_EV2"} ] },
                { id: 'ev2_3', palavraAudioId: "audioBoiEV2",  encontroCorreto: "OI", opcoesOriginal: [ {ev: "EI", audioEvId: "audioEncOptEI_EV2"}, {ev: "IU", audioEvId: "audioEncOptIU_EV2"}, {ev: "OI", audioEvId: "audioEncOptOI_EV2"} ] }, { id: 'ev2_4', palavraAudioId: "audioMaeEV2",  encontroCorreto: "ÃE", opcoesOriginal: [ {ev: "ÃO", audioEvId: "audioEncOptAOTil_EV2"}, {ev: "ÃE", audioEvId: "audioEncOptAETil_EV2"}, {ev: "AI", audioEvId: "audioEncOptAI_EV2"} ] },
                { id: 'ev2_5', palavraAudioId: "audioPaoEV2",  encontroCorreto: "ÃO", opcoesOriginal: [ {ev: "OU", audioEvId: "audioEncOptOU_EV2"}, {ev: "EI", audioEvId: "audioEncOptEI_EV2"}, {ev: "ÃO", audioEvId: "audioEncOptAOTil_EV2"} ] }, { id: 'ev2_6', palavraAudioId: "audioLeiteEV2",encontroCorreto: "EI", opcoesOriginal: [ {ev: "EI", audioEvId: "audioEncOptEI_EV2"}, {ev: "UI", audioEvId: "audioEncOptUI_EV2"}, {ev: "AU", audioEvId: "audioEncOptAU_EV2"} ] },
                { id: 'ev2_7', palavraAudioId: "audioFlautaEV2",encontroCorreto: "AU", opcoesOriginal: [ {ev: "AI", audioEvId: "audioEncOptAI_EV2"}, {ev: "AU", audioEvId: "audioEncOptAU_EV2"}, {ev: "OU", audioEvId: "audioEncOptOU_EV2"} ] },
            ];
            const totalDesafiosLicaoEV2 = licaoEV2Data.length;
            const valorPercentualPorDesafioEV2 = (totalDesafiosLicaoEV2 > 0) ? (100 / totalDesafiosLicaoEV2) : 0;

            function inicializarEstatisticasLicaoEV2() { estatisticasLicaoEV2 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoEV2 = 0; }
            
            function renderizarLicaoEV2() { 
                if (!areaDesafiosLicaoEV2) return; 
                areaDesafiosLicaoEV2.innerHTML = ''; 
                inicializarEstatisticasLicaoEV2(); 
                const desafiosEmbaralhados = window.shuffleArray([...licaoEV2Data]); 
                desafiosEmbaralhados.forEach(challenge => { 
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoev2'); 
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false"; 
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-licaoev2'); 
                    btnAudioPalavra.innerHTML = `🔊 Palavra ${desafiosEmbaralhados.indexOf(challenge) + 1}`; 
                    btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.palavraAudioId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); }); 
                    desafioItemDiv.appendChild(btnAudioPalavra); 
                    const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-container-licaoev2'); 
                    const opcoesEmbaralhadas = window.shuffleArray([...challenge.opcoesOriginal]); 
                    const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoEV2 % estilosDeFontePadrao.length]; indiceEstiloOpcaoEV2++; 
                    opcoesEmbaralhadas.forEach(opcao => { 
                        const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-encontro-licaoev2'); 
                        opcaoDiv.classList.add(estiloOpcaoObj.classe); opcaoDiv.dataset.encontroValor = opcao.ev; 
                        opcaoDiv.textContent = (estiloOpcaoObj.case === 'lower') ? opcao.ev.toLowerCase() : opcao.ev.toUpperCase(); 
                        opcaoDiv.addEventListener('click', () => handleOpcaoEncontroClickEV2(opcaoDiv, challenge, desafioItemDiv, opcoesContainer)); 
                        const btnAudioOpcao = document.createElement('button'); btnAudioOpcao.classList.add('btn-audio-opcao-ev2'); 
                        btnAudioOpcao.innerHTML = '🔊'; btnAudioOpcao.setAttribute('aria-label', `Ouvir opção ${opcao.ev}`); 
                        btnAudioOpcao.addEventListener('click', (e) => { e.stopPropagation(); const audioEl = document.getElementById(opcao.audioEvId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioOpcao); }); 
                        const wrapperOpcao = document.createElement('div'); wrapperOpcao.classList.add('opcao-wrapper-licaoev2'); 
                        wrapperOpcao.appendChild(opcaoDiv); wrapperOpcao.appendChild(btnAudioOpcao); opcoesContainer.appendChild(wrapperOpcao); 
                    }); 
                    desafioItemDiv.appendChild(opcoesContainer); areaDesafiosLicaoEV2.appendChild(desafioItemDiv); 
                }); 
                window.atualizarProgressoCircularAtividade('LicaoEV2', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 }); 
            }
            function handleOpcaoEncontroClickEV2(opcaoElement, challengeData, desafioItemDiv, opcoesContainer) { 
                if (desafioItemDiv.dataset.answered === "true") return; 
                desafioItemDiv.dataset.answered = "true"; window.pararAudioGlobal(); 
                const opcaoEscolhida = opcaoElement.dataset.encontroValor; 
                const todasOpcoesVisual = opcoesContainer.querySelectorAll('.opcao-encontro-licaoev2'); 
                todasOpcoesVisual.forEach(opt => { opt.classList.add('desabilitada'); }); 
                if (opcaoEscolhida.toUpperCase() === challengeData.encontroCorreto.toUpperCase()) { 
                    opcaoElement.classList.add('correta'); if (audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasLicaoEV2.acertos++; 
                } else { 
                    opcaoElement.classList.add('errada'); 
                    todasOpcoesVisual.forEach(opt => { if (opt.dataset.encontroValor.toUpperCase() === challengeData.encontroCorreto.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } }); 
                    if (audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasLicaoEV2.erros++; estatisticasLicaoEV2.jogoPerfeitoAlcancado = false; 
                } 
                estatisticasLicaoEV2.desafiosRespondidos++; 
                if (!estatisticasLicaoEV2.licaoConcluida && estatisticasLicaoEV2.desafiosRespondidos === totalDesafiosLicaoEV2) { estatisticasLicaoEV2.licaoConcluida = true; } 
                let netScorePercentageEV2; 
                if (estatisticasLicaoEV2.licaoConcluida && estatisticasLicaoEV2.jogoPerfeitoAlcancado) { 
                    netScorePercentageEV2 = 100; 
                } else { 
                    netScorePercentageEV2 = (estatisticasLicaoEV2.acertos * valorPercentualPorDesafioEV2) - (estatisticasLicaoEV2.erros * valorPercentualPorDesafioEV2); 
                } 
                netScorePercentageEV2 = Math.max(0, netScorePercentageEV2); netScorePercentageEV2 = Math.min(100, netScorePercentageEV2); 
                window.atualizarProgressoCircularAtividade('LicaoEV2', netScorePercentageEV2, 100, estatisticasLicaoEV2.erros, { licaoConcluida: estatisticasLicaoEV2.licaoConcluida, jogoPerfeito: estatisticasLicaoEV2.licaoConcluida && estatisticasLicaoEV2.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasLicaoEV2.desafiosRespondidos }); 
            }
            if (refazerLicaoEV2Btn) { refazerLicaoEV2Btn.addEventListener('click', renderizarLicaoEV2); }
            if (licaoEV2Element && !licaoEV2Element.classList.contains('licacao-bloqueada')) { renderizarLicaoEV2(); }
        }

        // --- LIÇÃO 3 EV: Qual Encontro Você Ouve? ---
        const licaoEV3Element = document.getElementById('licaoEV3');
        if (licaoEV3Element) {
            const areaDesafiosLicaoEV3 = document.getElementById('areaDesafiosLicaoEV3');
            const refazerLicaoEV3Btn = document.getElementById('refazerLicaoEV3');
            const audioLicaoEV3TituloBtn = licaoEV3Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV3Titulo"]');
            const audioLicaoEV3EnunciadoBtn = licaoEV3Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV3Enunciado"]');
            const audioLicaoEV3Titulo = document.getElementById('audioLicaoEV3Titulo');
            const audioLicaoEV3Enunciado = document.getElementById('audioLicaoEV3Enunciado');

            if (audioLicaoEV3TituloBtn && audioLicaoEV3Titulo) { audioLicaoEV3TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV3Titulo, audioLicaoEV3TituloBtn)); }
            if (audioLicaoEV3EnunciadoBtn && audioLicaoEV3Enunciado) { audioLicaoEV3EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV3Enunciado, audioLicaoEV3EnunciadoBtn)); }
            
            let estatisticasLicaoEV3;
            let indiceEstiloOpcaoEV3 = 0;
            const licaoEV3Data = [
                { id: 'ev3_1', audioPrincipalId: "audioSomAI_EV3", encontroCorreto: "AI", opcoesOriginal: [{ev: "AI", audioEvId: "audioEncOptAI_EV2"}, {ev: "EI", audioEvId: "audioEncOptEI_EV2"}, {ev: "IA", audioEvId: "audioEncOptIA_EV3"}] }, { id: 'ev3_2', audioPrincipalId: "audioSomEU_EV3", encontroCorreto: "EU", opcoesOriginal: [{ev: "EU", audioEvId: "audioEncOptEU_EV2"}, {ev: "OU", audioEvId: "audioEncOptOU_EV2"}, {ev: "OI", audioEvId: "audioEncOptOI_EV2"}] },
                { id: 'ev3_3', audioPrincipalId: "audioSomOI_EV3", encontroCorreto: "OI", opcoesOriginal: [{ev: "OI", audioEvId: "audioEncOptOI_EV2"}, {ev: "AI", audioEvId: "audioEncOptAI_EV2"}, {ev: "UI", audioEvId: "audioEncOptUI_EV2"}] }, { id: 'ev3_4', audioPrincipalId: "audioSomAU_EV3", encontroCorreto: "AU", opcoesOriginal: [{ev: "AU", audioEvId: "audioEncOptAU_EV2"}, {ev: "OU", audioEvId: "audioEncOptOU_EV2"}, {ev: "ÃO", audioEvId: "audioEncOptAOTil_EV2"}] },
                { id: 'ev3_5', audioPrincipalId: "audioSomAOTil_EV3", encontroCorreto: "ÃO", opcoesOriginal: [{ev: "ÃO", audioEvId: "audioEncOptAOTil_EV2"}, {ev: "ÃE", audioEvId: "audioEncOptAETil_EV2"}, {ev: "AI", audioEvId: "audioEncOptAI_EV2"}] }, { id: 'ev3_6', audioPrincipalId: "audioSomUI_EV3", encontroCorreto: "UI", opcoesOriginal: [{ev: "UI", audioEvId: "audioEncOptUI_EV2"}, {ev: "IU", audioEvId: "audioEncOptIU_EV2"}, {ev: "EI", audioEvId: "audioEncOptEI_EV2"}] },
                { id: 'ev3_7', audioPrincipalId: "audioSomIA_EV3", encontroCorreto: "IA", opcoesOriginal: [{ev: "IA", audioEvId: "audioEncOptIA_EV3"}, {ev: "AI", audioEvId: "audioEncOptAI_EV2"}, {ev: "UA", audioEvId: "audioEncOptUA_EV3"}] }
            ];
            const totalDesafiosLicaoEV3 = licaoEV3Data.length;
            const valorPercentualPorDesafioEV3 = (totalDesafiosLicaoEV3 > 0) ? (100 / totalDesafiosLicaoEV3) : 0;

            function inicializarEstatisticasLicaoEV3() { estatisticasLicaoEV3 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloOpcaoEV3 = 0; }
            function renderizarLicaoEV3() { if(!areaDesafiosLicaoEV3) return; areaDesafiosLicaoEV3.innerHTML = ''; inicializarEstatisticasLicaoEV3(); const desafiosEmbaralhados = window.shuffleArray([...licaoEV3Data]); desafiosEmbaralhados.forEach(challenge => { const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoev3'); desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false"; const btnAudioPrincipal = document.createElement('button'); btnAudioPrincipal.classList.add('btn-audio-principal-ev3'); btnAudioPrincipal.innerHTML = `🔊 Ouvir Encontro ${desafiosEmbaralhados.indexOf(challenge) + 1}`; btnAudioPrincipal.addEventListener('click', () => { const audioEl = document.getElementById(challenge.audioPrincipalId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioPrincipal); }); desafioItemDiv.appendChild(btnAudioPrincipal); const opcoesContainer = document.createElement('div'); opcoesContainer.classList.add('opcoes-container-licaoev3'); const opcoesShuffled = window.shuffleArray([...challenge.opcoesOriginal]); const estiloOpcaoObj = estilosDeFontePadrao[indiceEstiloOpcaoEV3 % estilosDeFontePadrao.length]; indiceEstiloOpcaoEV3++; opcoesShuffled.forEach(opcao => { const opcaoDiv = document.createElement('div'); opcaoDiv.classList.add('opcao-escrita-ev3'); opcaoDiv.classList.add(estiloOpcaoObj.classe); opcaoDiv.dataset.encontroValor = opcao.ev; opcaoDiv.textContent = (estiloOpcaoObj.case === 'lower') ? opcao.ev.toLowerCase() : opcao.ev.toUpperCase(); opcaoDiv.addEventListener('click', () => handleOpcaoClickEV3(opcaoDiv, challenge, desafioItemDiv, opcoesContainer)); const btnAudioOpcao = document.createElement('button'); btnAudioOpcao.classList.add('btn-audio-opcao-ev3'); btnAudioOpcao.innerHTML = '🔊'; btnAudioOpcao.setAttribute('aria-label', `Ouvir opção ${opcao.ev}`); btnAudioOpcao.addEventListener('click', (e) => { e.stopPropagation(); const audioEl = document.getElementById(opcao.audioEvId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioOpcao); }); const wrapperOpcao = document.createElement('div'); wrapperOpcao.classList.add('opcao-wrapper-licaoev3'); wrapperOpcao.appendChild(opcaoDiv); wrapperOpcao.appendChild(btnAudioOpcao); opcoesContainer.appendChild(wrapperOpcao); }); desafioItemDiv.appendChild(opcoesContainer); areaDesafiosLicaoEV3.appendChild(desafioItemDiv); }); window.atualizarProgressoCircularAtividade('LicaoEV3', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 }); }
            function handleOpcaoClickEV3(opcaoElement, challengeData, desafioItemDiv, opcoesContainer) { if (desafioItemDiv.dataset.answered === "true") return; desafioItemDiv.dataset.answered = "true"; window.pararAudioGlobal(); const opcaoEscolhida = opcaoElement.dataset.encontroValor; const todasOpcoesVisual = opcoesContainer.querySelectorAll('.opcao-escrita-ev3'); todasOpcoesVisual.forEach(opt => opt.classList.add('desabilitada')); if (opcaoEscolhida.toUpperCase() === challengeData.encontroCorreto.toUpperCase()) { opcaoElement.classList.add('correta'); if (audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasLicaoEV3.acertos++; } else { opcaoElement.classList.add('errada'); todasOpcoesVisual.forEach(opt => { if (opt.dataset.encontroValor.toUpperCase() === challengeData.encontroCorreto.toUpperCase()) { opt.classList.add('correta-nao-escolhida'); } }); if (audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasLicaoEV3.erros++; estatisticasLicaoEV3.jogoPerfeitoAlcancado = false; } estatisticasLicaoEV3.desafiosRespondidos++; if (!estatisticasLicaoEV3.licaoConcluida && estatisticasLicaoEV3.desafiosRespondidos === totalDesafiosLicaoEV3) { estatisticasLicaoEV3.licaoConcluida = true; } let netScorePercentageEV3; if (estatisticasLicaoEV3.licaoConcluida && estatisticasLicaoEV3.jogoPerfeitoAlcancado) { netScorePercentageEV3 = 100; } else { netScorePercentageEV3 = (estatisticasLicaoEV3.acertos * valorPercentualPorDesafioEV3) - (estatisticasLicaoEV3.erros * valorPercentualPorDesafioEV3); } netScorePercentageEV3 = Math.max(0, netScorePercentageEV3); netScorePercentageEV3 = Math.min(100, netScorePercentageEV3); window.atualizarProgressoCircularAtividade('LicaoEV3', netScorePercentageEV3, 100, estatisticasLicaoEV3.erros, { licaoConcluida: estatisticasLicaoEV3.licaoConcluida, jogoPerfeito: estatisticasLicaoEV3.licaoConcluida && estatisticasLicaoEV3.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasLicaoEV3.desafiosRespondidos }); }
            if (refazerLicaoEV3Btn) { refazerLicaoEV3Btn.addEventListener('click', renderizarLicaoEV3); }
            if (licaoEV3Element && !licaoEV3Element.classList.contains('licacao-bloqueada')) { renderizarLicaoEV3(); }
        }

        // --- LIÇÃO 4 EV: Classifique o Encontro! ---
        const licaoEV4Element = document.getElementById('licaoEV4');
        if (licaoEV4Element) {
            const areaDesafiosLicaoEV4 = document.getElementById('areaDesafiosLicaoEV4');
            const refazerLicaoEV4Btn = document.getElementById('refazerLicaoEV4');
            const audioLicaoEV4TituloBtn = licaoEV4Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV4Titulo"]');
            const audioLicaoEV4EnunciadoBtn = licaoEV4Element.querySelector('.btn-audio-auxiliar[data-audio-target="audioLicaoEV4Enunciado"]');
            const audioLicaoEV4Titulo = document.getElementById('audioLicaoEV4Titulo');
            const audioLicaoEV4Enunciado = document.getElementById('audioLicaoEV4Enunciado');

            if (audioLicaoEV4TituloBtn && audioLicaoEV4Titulo) { audioLicaoEV4TituloBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV4Titulo, audioLicaoEV4TituloBtn));}
            if (audioLicaoEV4EnunciadoBtn && audioLicaoEV4Enunciado) { audioLicaoEV4EnunciadoBtn.addEventListener('click', () => window.tocarAudioControlado(audioLicaoEV4Enunciado, audioLicaoEV4EnunciadoBtn));}

            let estatisticasLicaoEV4;
            let indiceEstiloPalavraEV4 = 0;
            const tiposDeEncontro = ["Ditongo", "Tritongo", "Hiato"];
            const licaoEV4Data = [
                { id: 'ev4_1', palavra: "CAIXA", palavraAudioId: "audioCaixaEV4", tipoCorreto: "Ditongo" }, { id: 'ev4_2', palavra: "SAÚDE", palavraAudioId: "audioSaudeEV4", tipoCorreto: "Hiato" },
                { id: 'ev4_3', palavra: "PARAGUAI", palavraAudioId: "audioParaguaiEV4", tipoCorreto: "Tritongo" }, { id: 'ev4_4', palavra: "LEÃO", palavraAudioId: "audioLeaoEV4", tipoCorreto: "Ditongo" },
                { id: 'ev4_5', palavra: "VIOLA", palavraAudioId: "audioViolaEV4", tipoCorreto: "Hiato" }, { id: 'ev4_6', palavra: "ENXAGUEI", palavraAudioId: "audioEnxagueiEV4", tipoCorreto: "Tritongo" },
                { id: 'ev4_7', palavra: "NOITE", palavraAudioId: "audioNoiteEV4", tipoCorreto: "Ditongo" }
            ];
            const totalDesafiosLicaoEV4 = licaoEV4Data.length;
            const valorPercentualPorDesafioEV4 = (totalDesafiosLicaoEV4 > 0) ? (100 / totalDesafiosLicaoEV4) : 0;

            function inicializarEstatisticasLicaoEV4() { estatisticasLicaoEV4 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; indiceEstiloPalavraEV4 = 0; }
            
            function renderizarLicaoEV4() { 
                if(!areaDesafiosLicaoEV4) return; 
                areaDesafiosLicaoEV4.innerHTML = ''; 
                inicializarEstatisticasLicaoEV4(); 
                const desafiosEmbaralhados = window.shuffleArray([...licaoEV4Data]); 
                desafiosEmbaralhados.forEach(challenge => { 
                    const desafioItemDiv = document.createElement('div'); desafioItemDiv.classList.add('desafio-item-licaoev4'); 
                    desafioItemDiv.dataset.challengeId = challenge.id; desafioItemDiv.dataset.answered = "false"; 
                    const palavraContainer = document.createElement('div'); palavraContainer.classList.add('palavra-container-licaoev4'); 
                    const palavraDisplay = document.createElement('span'); palavraDisplay.classList.add('palavra-display-licaoev4'); 
                    const estiloPalavraObj = estilosDeFontePadrao[indiceEstiloPalavraEV4 % estilosDeFontePadrao.length]; 
                    palavraDisplay.classList.add(estiloPalavraObj.classe); indiceEstiloPalavraEV4++; 
                    palavraDisplay.textContent = (estiloPalavraObj.case === 'lower') ? challenge.palavra.toLowerCase() : challenge.palavra.toUpperCase(); 
                    const btnAudioPalavra = document.createElement('button'); btnAudioPalavra.classList.add('btn-audio-palavra-licaoev4'); 
                    btnAudioPalavra.innerHTML = '🔊'; btnAudioPalavra.setAttribute('aria-label', `Ouvir palavra ${challenge.palavra}`); 
                    btnAudioPalavra.addEventListener('click', () => { const audioEl = document.getElementById(challenge.palavraAudioId); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioPalavra); }); 
                    palavraContainer.appendChild(palavraDisplay); palavraContainer.appendChild(btnAudioPalavra); desafioItemDiv.appendChild(palavraContainer); 
                    const btnsClassificacaoContainer = document.createElement('div'); btnsClassificacaoContainer.classList.add('btns-classificacao-container-ev4'); 
                    tiposDeEncontro.forEach(tipo => { 
                        const wrapperBtnTipo = document.createElement('div'); wrapperBtnTipo.classList.add('wrapper-btn-classificacao-ev4'); 
                        const btnTipo = document.createElement('button'); btnTipo.classList.add('btn-classificacao-ev4'); 
                        btnTipo.textContent = tipo; btnTipo.dataset.tipoValor = tipo; 
                        btnTipo.addEventListener('click', () => handleClassificacaoClickEV4(btnTipo, challenge, desafioItemDiv, btnsClassificacaoContainer)); 
                        const btnAudioTipo = document.createElement('button'); btnAudioTipo.classList.add('btn-audio-tipo-ev4'); 
                        btnAudioTipo.innerHTML = '🔊'; 
                        let audioIdParaTipo = ""; 
                        if (tipo === "Ditongo") audioIdParaTipo = "audioTipoDitongoEV4"; 
                        else if (tipo === "Tritongo") audioIdParaTipo = "audioTipoTritongoEV4"; 
                        else if (tipo === "Hiato") audioIdParaTipo = "audioTipoHiatoEV4"; 
                        btnAudioTipo.setAttribute('aria-label', `Ouvir ${tipo}`); 
                        btnAudioTipo.addEventListener('click', (e) => { e.stopPropagation(); const audioEl = document.getElementById(audioIdParaTipo); if (audioEl) window.tocarAudioControlado(audioEl, btnAudioTipo); }); 
                        wrapperBtnTipo.appendChild(btnTipo); wrapperBtnTipo.appendChild(btnAudioTipo); 
                        btnsClassificacaoContainer.appendChild(wrapperBtnTipo); 
                    }); 
                    desafioItemDiv.appendChild(btnsClassificacaoContainer); areaDesafiosLicaoEV4.appendChild(desafioItemDiv); 
                }); 
                window.atualizarProgressoCircularAtividade('LicaoEV4', 0, 100, 0, { licaoConcluida: false, jogoPerfeito: true, desafiosRespondidos: 0 }); 
            }

            function handleClassificacaoClickEV4(btnEscolhido, challengeData, desafioItemDiv, btnsContainer) { // Removido wrapperClicado pois não é mais necessário aqui
                if (desafioItemDiv.dataset.answered === "true") return; 
                desafioItemDiv.dataset.answered = "true"; 
                window.pararAudioGlobal(); 
                const tipoEscolhido = btnEscolhido.dataset.tipoValor; 
                const todosWrappersTipo = btnsContainer.querySelectorAll('.wrapper-btn-classificacao-ev4'); 
                todosWrappersTipo.forEach(wrapper => { 
                    wrapper.querySelector('.btn-classificacao-ev4').classList.add('desabilitada'); 
                    wrapper.querySelector('.btn-audio-tipo-ev4').classList.add('desabilitada'); 
                }); 
                if (tipoEscolhido === challengeData.tipoCorreto) { 
                    btnEscolhido.classList.add('correta'); 
                    if (audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasLicaoEV4.acertos++; 
                } else { 
                    btnEscolhido.classList.add('errada'); 
                    todosWrappersTipo.forEach(wrapper => { 
                        const btn = wrapper.querySelector('.btn-classificacao-ev4'); 
                        if (btn.dataset.tipoValor === challengeData.tipoCorreto) { btn.classList.add('correta-nao-escolhida'); } 
                    }); 
                    if (audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasLicaoEV4.erros++; estatisticasLicaoEV4.jogoPerfeitoAlcancado = false; 
                } 
                estatisticasLicaoEV4.desafiosRespondidos++; 
                if (!estatisticasLicaoEV4.licaoConcluida && estatisticasLicaoEV4.desafiosRespondidos === totalDesafiosLicaoEV4) { estatisticasLicaoEV4.licaoConcluida = true; } 
                let netScorePercentageEV4; 
                if (estatisticasLicaoEV4.licaoConcluida && estatisticasLicaoEV4.jogoPerfeitoAlcancado) { 
                    netScorePercentageEV4 = 100; 
                } else { 
                    netScorePercentageEV4 = (estatisticasLicaoEV4.acertos * valorPercentualPorDesafioEV4) - (estatisticasLicaoEV4.erros * valorPercentualPorDesafioEV4); 
                } 
                netScorePercentageEV4 = Math.max(0, netScorePercentageEV4); netScorePercentageEV4 = Math.min(100, netScorePercentageEV4); 
                window.atualizarProgressoCircularAtividade('LicaoEV4', netScorePercentageEV4, 100, estatisticasLicaoEV4.erros, { licaoConcluida: estatisticasLicaoEV4.licaoConcluida, jogoPerfeito: estatisticasLicaoEV4.licaoConcluida && estatisticasLicaoEV4.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasLicaoEV4.desafiosRespondidos }); 
            }
            if (refazerLicaoEV4Btn) { refazerLicaoEV4Btn.addEventListener('click', renderizarLicaoEV4); }
            if (licaoEV4Element && !licaoEV4Element.classList.contains('licacao-bloqueada')) { renderizarLicaoEV4(); }
        }

        // Adicionar listeners de mouseover para TODOS os botões de refazer se audioRefazerGeral existir
        [ 'refazerLicaoEV1', 'refazerLicaoEV2', 'refazerLicaoEV3', 'refazerLicaoEV4'].forEach(idBtn => {
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