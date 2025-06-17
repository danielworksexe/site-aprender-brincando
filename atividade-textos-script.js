document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadeTextos = document.querySelector('.pagina-atividade #licaoTextos1');

    if (paginaAtividadeTextos) {
        console.log("Script da Atividade Prática de Textos Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');

        // --- LIÇÃO 1: Detetive de Histórias ---
        const licao1Element = document.getElementById('licaoTextos1');
        if(licao1Element) {
            const areaDesafiosL1 = document.getElementById('areaDesafiosLicaoTextos1');
            const refazerL1Btn = document.getElementById('refazerLicaoTextos1');
            let estatisticasL1;

            const licao1Data = [ { id: 'l1t_1', texto: "Bia tem um gatinho chamado Fumaça. Ele é cinza e muito fofo. Fumaça adora brincar com um novelo de lã azul e dormir na poltrona da sala.<br><br>Todos os dias, Bia coloca leite em sua tigela vermelha. Fumaça bebe tudo e depois tira uma longa soneca ao sol.", perguntas: [ { id: 'q1', pergunta: 'Qual é o nome do gatinho?', opcoes: ['Bolinha', 'Fumaça', 'Cinza'], respostaCorreta: 'Fumaça' }, { id: 'q2', pergunta: 'Qual é a cor do novelo de lã?', opcoes: ['Vermelho', 'Cinza', 'Azul'], respostaCorreta: 'Azul' }, { id: 'q3', pergunta: 'Onde o gatinho Fumaça gosta de dormir?', opcoes: ['Na cama da Bia', 'Na poltrona da sala', 'No jardim'], respostaCorreta: 'Na poltrona da sala' } ] } ];
            const totalDesafiosL1 = licao1Data[0].perguntas.length;
            const valorPercentualPorDesafioL1 = 100 / totalDesafiosL1;

            function inicializarEstatisticasL1() { estatisticasL1 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            function renderizarLicao1() {
                if(!areaDesafiosL1) return;
                areaDesafiosL1.innerHTML = ''; inicializarEstatisticasL1(); const desafio = licao1Data[0];
                const desafioDiv = document.createElement('div'); desafioDiv.className = 'desafio-item-licaotextos1';
                const textoContainer = document.createElement('div'); textoContainer.className = 'texto-container-l1t'; textoContainer.innerHTML = desafio.texto;
                desafioDiv.appendChild(textoContainer);
                const perguntasContainer = document.createElement('div'); perguntasContainer.className = 'perguntas-container-l1t';
                desafio.perguntas.forEach(itemPergunta => {
                    const perguntaDiv = document.createElement('div'); perguntaDiv.className = 'pergunta-item-l1t'; perguntaDiv.dataset.answered = 'false';
                    const perguntaTexto = document.createElement('p'); perguntaTexto.className = 'pergunta-texto-l1t'; perguntaTexto.textContent = itemPergunta.pergunta;
                    perguntaDiv.appendChild(perguntaTexto);
                    const opcoesContainer = document.createElement('div'); opcoesContainer.className = 'opcoes-resposta-l1t';
                    window.shuffleArray(itemPergunta.opcoes).forEach(opcao => {
                        const btnOpcao = document.createElement('button'); btnOpcao.className = 'opcao-resposta-l1t'; btnOpcao.textContent = opcao;
                        btnOpcao.addEventListener('click', () => handleOpcaoRespostaL1Click(btnOpcao, itemPergunta, perguntaDiv, opcoesContainer));
                        opcoesContainer.appendChild(btnOpcao);
                    });
                    perguntaDiv.appendChild(opcoesContainer); perguntasContainer.appendChild(perguntaDiv);
                });
                desafioDiv.appendChild(perguntasContainer); areaDesafiosL1.appendChild(desafioDiv);
                window.atualizarProgressoCircularAtividade('LicaoTextos1', 0, 100, 0, {});
            }
            function handleOpcaoRespostaL1Click(btnEscolhido, itemPergunta, perguntaDiv, opcoesContainer) {
                if(perguntaDiv.dataset.answered === "true") return;
                perguntaDiv.dataset.answered = "true";
                const todosBotoes = opcoesContainer.querySelectorAll('.opcao-resposta-l1t');
                todosBotoes.forEach(btn => btn.classList.add('desabilitada'));
                if(btnEscolhido.textContent === itemPergunta.respostaCorreta) { btnEscolhido.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL1.acertos++; } 
                else { btnEscolhido.classList.add('errada'); todosBotoes.forEach(btn => { if(btn.textContent === itemPergunta.respostaCorreta) { btn.classList.add('correta-nao-escolhida'); } }); if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL1.erros++; estatisticasL1.jogoPerfeitoAlcancado = false; }
                estatisticasL1.desafiosRespondidos++;
                if(!estatisticasL1.licaoConcluida && estatisticasL1.desafiosRespondidos === totalDesafiosL1) { estatisticasL1.licaoConcluida = true; }
                let netScore = (estatisticasL1.acertos * valorPercentualPorDesafioL1) - (estatisticasL1.erros * valorPercentualPorDesafioL1);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoTextos1', netScore, 100, estatisticasL1.erros, { licaoConcluida: estatisticasL1.licaoConcluida, jogoPerfeito: estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL1.desafiosRespondidos });
            }
            if(refazerL1Btn) refazerL1Btn.addEventListener('click', renderizarLicao1);
            if (licao1Element && !licao1Element.classList.contains('licacao-bloqueada')) { renderizarLicao1(); }
        }

        // --- LIÇÃO 2: Qual é o Sentimento? ---
        const licao2Element = document.getElementById('licaoTextos2');
        if(licao2Element) {
            const areaDesafiosL2 = document.getElementById('areaDesafiosLicaoTextos2');
            const refazerL2Btn = document.getElementById('refazerLicaoTextos2');
            let estatisticasL2;
            const licao2Data = [
                { id: 'l2t_1', texto: 'Leo ganhou uma bicicleta nova de aniversário. Era azul e brilhava ao sol. Ele não via a hora de andar nela.<br><br>Assim que colocou o capacete, seu pai o ajudou a subir. Leo pedalou pela primeira vez e sentiu o vento no rosto. Um sorriso enorme apareceu e ele gritou: "Estou conseguindo!"', sentimentoCorreto: '😊', opcoesEmoji: ['😊', '😢', '😠', '😨'] },
                { id: 'l2t_2', texto: 'O castelo de areia de Ana era o mais alto da praia. Ela passou a manhã toda construindo.<br><br>De repente, uma onda grande veio e desmanchou tudo. Ana olhou para o monte de areia molhada e seus olhos se encheram de lágrimas.', sentimentoCorreto: '😢', opcoesEmoji: ['😮', '😊', '😢', '😴'] },
                { id: 'l2t_3', texto: 'Pedro estava lendo um livro em seu quarto silencioso. Tudo estava calmo.<br><br>De repente, ele ouviu um barulho alto na janela: TOC, TOC, TOC! Pedro pulou da cama com o coração batendo forte, sem saber o que era.', sentimentoCorreto: '😮', opcoesEmoji: ['😴', '😮', '😢', '😊'] }
            ];
            const totalDesafiosL2 = licao2Data.length;
            const valorPercentualPorDesafioL2 = 100 / totalDesafiosL2;
            function inicializarEstatisticasL2() { estatisticasL2 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            function renderizarLicao2() {
                if(!areaDesafiosL2) return;
                areaDesafiosL2.innerHTML = '';
                inicializarEstatisticasL2();
                const desafios = window.shuffleArray([...licao2Data]);
                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaotextos2';
                    desafioDiv.dataset.answered = 'false';
                    const textoContainer = document.createElement('div');
                    textoContainer.className = 'texto-container-l2t';
                    textoContainer.innerHTML = challenge.texto;
                    const pergunta = document.createElement('p');
                    pergunta.className = 'pergunta-sentimento-l2t';
                    pergunta.textContent = 'Como o personagem se sentiu?';
                    const opcoesContainer = document.createElement('div');
                    opcoesContainer.className = 'opcoes-sentimento-l2t';
                    window.shuffleArray(challenge.opcoesEmoji).forEach(emoji => {
                        const btnOpcao = document.createElement('button');
                        btnOpcao.className = 'opcao-sentimento-l2t';
                        btnOpcao.textContent = emoji;
                        btnOpcao.dataset.emoji = emoji;
                        btnOpcao.addEventListener('click', () => handleSentimentoClick(btnOpcao, challenge, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(btnOpcao);
                    });
                    desafioDiv.appendChild(textoContainer);
                    desafioDiv.appendChild(pergunta);
                    desafioDiv.appendChild(opcoesContainer);
                    areaDesafiosL2.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoTextos2', 0, 100, 0, {});
            }
            function handleSentimentoClick(btnEscolhido, challengeData, desafioDiv, opcoesContainer) {
                if (desafioDiv.dataset.answered === 'true') return;
                desafioDiv.dataset.answered = 'true';
                const todosBotoes = opcoesContainer.querySelectorAll('.opcao-sentimento-l2t');
                todosBotoes.forEach(b => b.classList.add('desabilitada'));
                if (btnEscolhido.dataset.emoji === challengeData.sentimentoCorreto) {
                    btnEscolhido.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL2.acertos++;
                } else {
                    btnEscolhido.classList.add('errada');
                    todosBotoes.forEach(b => { if (b.dataset.emoji === challengeData.sentimentoCorreto) b.classList.add('correta-nao-escolhida'); });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL2.erros++; estatisticasL2.jogoPerfeitoAlcancado = false;
                }
                estatisticasL2.desafiosRespondidos++;
                if(!estatisticasL2.licaoConcluida && estatisticasL2.desafiosRespondidos === totalDesafiosL2) { estatisticasL2.licaoConcluida = true; }
                let netScore = (estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado) ? 100 : (estatisticasL2.acertos * valorPercentualPorDesafioL2) - (estatisticasL2.erros * valorPercentualPorDesafioL2);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoTextos2', netScore, 100, estatisticasL2.erros, { licaoConcluida: estatisticasL2.licaoConcluida, jogoPerfeito: estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL2.desafiosRespondidos });
            }
            if(refazerL2Btn) { refazerL2Btn.addEventListener('click', renderizarLicao2); }
            if (licao2Element && !licao2Element.classList.contains('licacao-bloqueada')) { renderizarLicao2(); }
        }

        // --- LIÇÃO 3: A Mensagem Secreta ---
        const licao3Element = document.getElementById('licaoTextos3');
        if(licao3Element) {
             const areaDesafiosL3 = document.getElementById('areaDesafiosLicaoTextos3');
            const refazerL3Btn = document.getElementById('refazerLicaoTextos3');
            let estatisticasL3;
            const licao3Data = [
                { id: 'l3t_1', texto: "A lebre vivia se gabando de como era rápida e ria da tartaruga por ser lenta. Um dia, elas apostaram uma corrida. A lebre correu tanto que, de tão certa da vitória, parou para tirar uma soneca.<br><br>A tartaruga, com seus passinhos lentos mas constantes, nunca parou. Ela caminhou, caminhou e, quando a lebre acordou, a tartaruga já estava cruzando a linha de chegada.", pergunta: "O que podemos aprender com a tartaruga?", opcoes: ["É sempre bom dormir durante corridas.", "Devagar e sempre se chega na frente.", "Lebres e tartarugas não podem ser amigas."], respostaCorreta: "Devagar e sempre se chega na frente." }
            ];
            const totalDesafiosL3 = licao3Data.length;
            const valorPercentualPorDesafioL3 = 100 / totalDesafiosL3;
            function inicializarEstatisticasL3() { estatisticasL3 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            function renderizarLicao3() {
                if(!areaDesafiosL3) return;
                areaDesafiosL3.innerHTML = '';
                inicializarEstatisticasL3();
                const desafios = window.shuffleArray([...licao3Data]);
                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaotextos1'; // Reutiliza estilo da Lição 1
                    desafioDiv.dataset.answered = 'false';
                    const textoContainer = document.createElement('div');
                    textoContainer.className = 'texto-container-l1t';
                    textoContainer.innerHTML = challenge.texto;
                    desafioDiv.appendChild(textoContainer);
                    const perguntaDiv = document.createElement('div');
                    perguntaDiv.className = 'pergunta-item-l1t';
                    const perguntaTexto = document.createElement('p');
                    perguntaTexto.className = 'pergunta-texto-l1t';
                    perguntaTexto.textContent = challenge.pergunta;
                    perguntaDiv.appendChild(perguntaTexto);
                    const opcoesContainer = document.createElement('div');
                    opcoesContainer.className = 'opcoes-resposta-l1t';
                    window.shuffleArray(challenge.opcoes).forEach(opcao => {
                        const btnOpcao = document.createElement('button');
                        btnOpcao.className = 'opcao-resposta-l1t';
                        btnOpcao.textContent = opcao;
                        btnOpcao.addEventListener('click', () => handleOpcaoMoralClick(btnOpcao, challenge, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(btnOpcao);
                    });
                    perguntaDiv.appendChild(opcoesContainer);
                    desafioDiv.appendChild(perguntaDiv);
                    areaDesafiosL3.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoTextos3', 0, 100, 0, {});
            }
            function handleOpcaoMoralClick(btnEscolhido, challengeData, desafioDiv, opcoesContainer) {
                if(desafioDiv.dataset.answered === 'true') return;
                desafioDiv.dataset.answered = 'true';
                const todosBotoes = opcoesContainer.querySelectorAll('.opcao-resposta-l1t');
                todosBotoes.forEach(btn => btn.classList.add('desabilitada'));
                if(btnEscolhido.textContent === challengeData.respostaCorreta) {
                    btnEscolhido.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL3.acertos++;
                } else {
                    btnEscolhido.classList.add('errada');
                    todosBotoes.forEach(btn => { if(btn.textContent === challengeData.respostaCorreta) { btn.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasL3.erros++; estatisticasL3.jogoPerfeitoAlcancado = false;
                }
                estatisticasL3.desafiosRespondidos++;
                if(!estatisticasL3.licaoConcluida && estatisticasL3.desafiosRespondidos === totalDesafiosL3) { estatisticasL3.licaoConcluida = true; }
                let netScore = (estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado) ? 100 : (estatisticasL3.acertos * valorPercentualPorDesafioL3) - (estatisticasL3.erros * valorPercentualPorDesafioL3);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoTextos3', netScore, 100, estatisticasL3.erros, { licaoConcluida: estatisticasL3.licaoConcluida, jogoPerfeito: estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL3.desafiosRespondidos });
            }
            if(refazerL3Btn) { refazerL3Btn.addEventListener('click', renderizarLicao3); }
            if (licao3Element && !licao3Element.classList.contains('licacao-bloqueada')) { renderizarLicao3(); }
        }

        // --- LIÇÃO 4: Organize a História! ---
        const licao4Element = document.getElementById('licaoTextos4');
        if(licao4Element) {
            const areaDesafiosL4 = document.getElementById('areaDesafiosLicaoTextos4');
            const refazerL4Btn = document.getElementById('refazerLicaoTextos4');
            let estatisticasL4;
            let paragrafoArrastado = null;
            const licao4Data = [ { id: 'l4t_1', paragrafosCorretos: [ "1. Num dia quente de verão, uma raposa passeava por um pomar. De repente, ela viu um cacho de uvas bonitas e maduras, pendurado bem no alto de uma videira.", "2. Com muita vontade de comer as uvas, a raposa pulou, pulou e pulou de novo, mas não conseguiu alcançá-las. As uvas estavam muito altas.", "3. Cansada e sem conseguir pegar as uvas, a raposa foi embora dizendo: 'Ah, essas uvas não me interessam. Elas devem estar verdes e azedas!'" ] } ];
            const totalDesafiosL4 = licao4Data.length;
            const valorPercentualPorDesafioL4 = 100 / totalDesafiosL4;

            function inicializarEstatisticasL4() { estatisticasL4 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            function renderizarLicao4() {
                if(!areaDesafiosL4) return;
                areaDesafiosL4.innerHTML = '';
                inicializarEstatisticasL4();
                const desafio = licao4Data[0];
                const desafioDiv = document.createElement('div');
                desafioDiv.className = 'desafio-item-licaotextos4';
                const paragrafosContainer = document.createElement('div');
                paragrafosContainer.className = 'paragrafos-container-l4t';
                paragrafosContainer.addEventListener('dragover', (e) => e.preventDefault());
                paragrafosContainer.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const elementoAlvo = e.target.closest('.paragrafo-ordenavel-l4t');
                    if (elementoAlvo) { paragrafosContainer.insertBefore(paragrafoArrastado, elementoAlvo); } 
                    else { paragrafosContainer.appendChild(paragrafoArrastado); }
                    if(paragrafoArrastado) paragrafoArrastado.classList.remove('arrastando');
                });
                window.shuffleArray([...desafio.paragrafosCorretos]).forEach((pTexto, index) => {
                    const pDiv = document.createElement('div');
                    pDiv.className = 'paragrafo-ordenavel-l4t';
                    pDiv.draggable = true;
                    pDiv.textContent = pTexto.substring(3);
                    pDiv.dataset.ordemCorreta = index + 1;
                    pDiv.addEventListener('dragstart', () => { paragrafoArrastado = pDiv; setTimeout(() => pDiv.classList.add('arrastando'), 0); });
                    pDiv.addEventListener('dragend', () => { if(paragrafoArrastado) paragrafoArrastado.classList.remove('arrastando'); });
                    paragrafosContainer.appendChild(pDiv);
                });
                const btnVerificar = document.createElement('button');
                btnVerificar.className = 'btn-verificar-ordem-l4t btn-acao';
                btnVerificar.textContent = 'Verificar Ordem';
                btnVerificar.addEventListener('click', () => handleVerificarOrdemClick(paragrafosContainer, desafio, btnVerificar));
                desafioDiv.appendChild(paragrafosContainer);
                desafioDiv.appendChild(btnVerificar);
                areaDesafiosL4.appendChild(desafioDiv);
                window.atualizarProgressoCircularAtividade('LicaoTextos4', 0, 100, 0, {});
            }
            function handleVerificarOrdemClick(paragrafosContainer, challengeData, btnVerificar) {
                btnVerificar.disabled = true;
                paragrafosContainer.classList.remove('correta', 'errada');
                const paragrafosAtuais = paragrafosContainer.querySelectorAll('.paragrafo-ordenavel-l4t');
                let ordemCorreta = true;
                paragrafosAtuais.forEach((p, index) => {
                    p.draggable = false;
                    if (parseInt(p.dataset.ordemCorreta) !== (index + 1)) { ordemCorreta = false; }
                });
                if (ordemCorreta) {
                    paragrafosContainer.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL4.acertos++;
                } else {
                    paragrafosContainer.classList.add('errada'); if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL4.erros++; estatisticasL4.jogoPerfeitoAlcancado = false;
                }
                estatisticasL4.desafiosRespondidos++;
                if(!estatisticasL4.licaoConcluida && estatisticasL4.desafiosRespondidos === totalDesafiosL4) { estatisticasL4.licaoConcluida = true; }
                let netScore = (estatisticasL4.acertos * valorPercentualPorDesafioL4) - (estatisticasL4.erros * valorPercentualPorDesafioL4);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoTextos4', netScore, 100, estatisticasL4.erros, { licaoConcluida: estatisticasL4.licaoConcluida, jogoPerfeito: estatisticasL4.licaoConcluida && estatisticasL4.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL4.desafiosRespondidos });
            }
            if(refazerL4Btn) { refazerL4Btn.addEventListener('click', renderizarLicao4); }
            if (licao4Element && !licao4Element.classList.contains('licacao-bloqueada')) { renderizarLicao4(); }
        }
        
        // --- LIÇÃO 5: Continue a História... ---
        const licao5Element = document.getElementById('licaoTextos5');
        if(licao5Element) {
            const areaDesafiosL5 = document.getElementById('areaDesafiosLicaoTextos5');
            const refazerL5Btn = document.getElementById('refazerLicaoTextos5');
            let estatisticasL5;
            const historiaData = { inicio: "Numa tarde chuvosa, Léo encontrou uma pequena caixa de madeira empoeirada no sótão. A caixa estava trancada, mas havia um bilhete ao lado que dizia: 'Apenas para os corajosos.'", nos: { 'no_inicial': { texto: "Com o coração batendo um pouco mais rápido, Léo decidiu...", opcoes: [{ texto: "...abrir a caixa imediatamente.", proximoNo: 'abriu_caixa' }, { texto: "...guardar a caixa e esperar.", proximoNo: 'fim_guardou' }] }, 'abriu_caixa': { texto: "Ele forçou a fechadura e a caixa se abriu com um 'clique'. Dentro, havia um mapa antigo e uma bússola que brilhava com uma luz azul suave. O mapa mostrava um caminho que saía de sua própria casa.", opcoes: [{ texto: "Seguir o mapa.", proximoNo: 'seguiu_mapa' }, { texto: "Achar muito perigoso e fechar a caixa.", proximoNo: 'fim_com_medo' }] }, 'fim_guardou': { texto: "Léo achou melhor não se arriscar. Ele guardou a caixa de volta no baú e desceu para tomar um achocolatado quente. A aventura podia esperar outro dia.", opcoes: [] }, 'seguiu_mapa': { texto: "Seguindo o mapa, Léo chegou a uma velha árvore no fundo do quintal. O mapa mostrava um 'X' bem na raiz da árvore. Com uma pequena pá, ele começou a cavar e encontrou um pequeno baú de tesouro!", opcoes: [] }, 'fim_com_medo': { texto: "O medo foi maior que a curiosidade. Léo fechou a caixa e a escondeu, pensando que era melhor não mexer com mistérios. A caixa nunca mais foi aberta.", opcoes: [] } } };
            function inicializarEstatisticasL5() { estatisticasL5 = { licaoConcluida: false }; }
            function renderizarLicao5() {
                if(!areaDesafiosL5) return;
                areaDesafiosL5.innerHTML = '';
                inicializarEstatisticasL5();
                const desafioDiv = document.createElement('div'); desafioDiv.className = 'desafio-item-licaotextos5';
                const historiaContainer = document.createElement('div'); historiaContainer.className = 'historia-container-l5t'; historiaContainer.id = 'historiaContainerL5';
                const opcoesContainer = document.createElement('div'); opcoesContainer.className = 'opcoes-continuacao-l5t'; opcoesContainer.id = 'opcoesContainerL5';
                desafioDiv.appendChild(historiaContainer); desafioDiv.appendChild(opcoesContainer); areaDesafiosL5.appendChild(desafioDiv);
                apresentarNo('no_inicial', true);
                window.atualizarProgressoCircularAtividade('LicaoTextos5', 0, 100, 0, {});
            }
            function apresentarNo(noId, ePrimeiroNo = false) {
                const historiaContainer = document.getElementById('historiaContainerL5');
                const opcoesContainer = document.getElementById('opcoesContainerL5');
                opcoesContainer.innerHTML = ''; 
                const noAtual = historiaData.nos[noId];
                if (ePrimeiroNo) { const pInicial = document.createElement('p'); pInicial.className = 'paragrafo-historia-l5t'; pInicial.textContent = historiaData.inicio; historiaContainer.appendChild(pInicial); }
                const pNo = document.createElement('p'); pNo.className = 'paragrafo-historia-l5t adicionado'; pNo.textContent = noAtual.texto;
                historiaContainer.appendChild(pNo);
                historiaContainer.scrollTop = historiaContainer.scrollHeight;
                if (noAtual.opcoes.length > 0) {
                    const pEscolha = document.createElement('p'); pEscolha.textContent = "O que acontece agora?";
                    opcoesContainer.appendChild(pEscolha);
                    noAtual.opcoes.forEach(opcao => {
                        const btnOpcao = document.createElement('button'); btnOpcao.className = 'opcao-continuacao-l5t'; btnOpcao.textContent = opcao.texto;
                        btnOpcao.addEventListener('click', () => { apresentarNo(opcao.proximoNo); }, { once: true });
                        opcoesContainer.appendChild(btnOpcao);
                    });
                } else {
                    const pFim = document.createElement('p'); pFim.className = 'feedback-fim-historia-l5t'; pFim.textContent = "FIM DA HISTÓRIA!";
                    opcoesContainer.appendChild(pFim);
                    if(!estatisticasL5.licaoConcluida) {
                        estatisticasL5.licaoConcluida = true; if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                        window.atualizarProgressoCircularAtividade('LicaoTextos5', 100, 100, 0, { licaoConcluida: true });
                    }
                }
            }
            if(refazerL5Btn) { refazerL5Btn.addEventListener('click', renderizarLicao5); }
            if (licao5Element && !licao5Element.classList.contains('licacao-bloqueada')) { renderizarLicao5(); }
        }
        
        ['refazerLicaoTextos1', 'refazerLicaoTextos2', 'refazerLicaoTextos3', 'refazerLicaoTextos4', 'refazerLicaoTextos5'].forEach(id => {
            const btn = document.getElementById(id);
            if(btn && audioRefazerGeral) {
                btn.addEventListener('mouseover', () => { window.pararAudioGlobal(); audioRefazerGeral.currentTime = 0; audioRefazerGeral.play().catch(e => {}); });
            }
        });
    }
});