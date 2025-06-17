document.addEventListener('DOMContentLoaded', () => {
    const paginaAtividadeFrases = document.querySelector('.pagina-atividade #licaoFrases1');

    if (paginaAtividadeFrases) {
        console.log("Script da Atividade Prática de Frases Carregado!");

        const audioAcertou = document.getElementById('audioAcertou');
        const audioErrou = document.getElementById('audioErrou');
        const audioRefazerGeral = document.getElementById('audioRefazerAtividade');

        const estilosDeFontePalavra = [
            { nome: 'bastao', classe: 'estilo-bastao' },
            { nome: 'imprensa', classe: 'estilo-imprensa' },
            { nome: 'cursiva', classe: 'estilo-cursiva' }
        ];

        // --- LIÇÃO 1: Qual Figura Combina com a Frase? ---
        const licao1Element = document.getElementById('licaoFrases1');
        if(licao1Element) {
            const areaDesafiosL1 = document.getElementById('areaDesafiosLicaoFrases1');
            const refazerL1Btn = document.getElementById('refazerLicaoFrases1');
            
            let estatisticasL1;
            const licao1Data = [
                { id: 'l1f_1', frase: 'O menino chuta a bola', emojiCorreto: '⚽', opcoesEmoji: ['👧', '⚽', '🐶'] },
                { id: 'l1f_2', frase: 'A menina come uma maçã', emojiCorreto: '🍎', opcoesEmoji: ['👦', '🐱', '🍎'] },
                { id: 'l1f_3', frase: 'O cachorro dorme na casinha', emojiCorreto: '🐶', opcoesEmoji: ['🐶', '🐸', '🐦'] },
                { id: 'l1f_4', frase: 'O sol está brilhando', emojiCorreto: '☀️', opcoesEmoji: ['🌙', '⭐', '☀️'] },
                { id: 'l1f_5', frase: 'O sapo pulou no lago', emojiCorreto: '🐸', opcoesEmoji: ['🚗', '🐸', '🎂'] },
                { id: 'l1f_6', frase: 'O foguete vai para a lua', emojiCorreto: '🚀', opcoesEmoji: ['🚀', '🚢', '🚲'] },
                { id: 'l1f_7', frase: 'A abelha faz mel na colmeia', emojiCorreto: '🐝', opcoesEmoji: ['🦋', '🐞', '🐝'] },
            ];
            const totalDesafiosL1 = licao1Data.length;
            const valorPercentualPorDesafioL1 = 100 / totalDesafiosL1;

            function inicializarEstatisticasL1() { estatisticasL1 = { acertos: 0, erros: 0, desafiosRespondidos: 0, jogoPerfeitoAlcancado: true, licaoConcluida: false }; }
            
            function renderizarLicao1() {
                if(!areaDesafiosL1) return;
                areaDesafiosL1.innerHTML = '';
                inicializarEstatisticasL1();
                const desafios = window.shuffleArray([...licao1Data]);

                desafios.forEach(challenge => {
                    const desafioDiv = document.createElement('div');
                    desafioDiv.className = 'desafio-item-licaofraises1';
                    desafioDiv.dataset.answered = "false";
                    const fraseP = document.createElement('p');
                    fraseP.className = 'frase-display-l1f';
                    fraseP.textContent = challenge.frase;
                    desafioDiv.appendChild(fraseP);
                    const opcoesContainer = document.createElement('div');
                    opcoesContainer.className = 'opcoes-figura-l1f';
                    const opcoesEmbaralhadas = window.shuffleArray([...challenge.opcoesEmoji]);
                    opcoesEmbaralhadas.forEach(opcaoEmoji => {
                        const btnOpcao = document.createElement('button');
                        btnOpcao.className = 'opcao-figura-l1f';
                        btnOpcao.textContent = opcaoEmoji;
                        btnOpcao.dataset.emoji = opcaoEmoji;
                        btnOpcao.addEventListener('click', () => handleOpcaoFiguraL1Click(btnOpcao, challenge, desafioDiv, opcoesContainer));
                        opcoesContainer.appendChild(btnOpcao);
                    });
                    desafioDiv.appendChild(opcoesContainer);
                    areaDesafiosL1.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoFrases1', 0, 100, 0, {});
            }

            function handleOpcaoFiguraL1Click(btnEscolhido, challengeData, desafioDiv, opcoesContainer) {
                if(desafioDiv.dataset.answered === "true") return;
                desafioDiv.dataset.answered = "true";
                const emojiEscolhido = btnEscolhido.dataset.emoji;
                const todosBotoes = opcoesContainer.querySelectorAll('.opcao-figura-l1f');
                todosBotoes.forEach(btn => btn.classList.add('desabilitada'));
                if(emojiEscolhido === challengeData.emojiCorreto) {
                    btnEscolhido.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL1.acertos++;
                } else {
                    btnEscolhido.classList.add('errada');
                    todosBotoes.forEach(btn => { if(btn.dataset.emoji === challengeData.emojiCorreto) { btn.classList.add('correta-nao-escolhida'); } });
                    if(audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                    estatisticasL1.erros++; estatisticasL1.jogoPerfeitoAlcancado = false;
                }
                estatisticasL1.desafiosRespondidos++;
                if(!estatisticasL1.licaoConcluida && estatisticasL1.desafiosRespondidos === totalDesafiosL1) { estatisticasL1.licaoConcluida = true; }
                let netScore = (estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado) ? 100 : (estatisticasL1.acertos * valorPercentualPorDesafioL1) - (estatisticasL1.erros * valorPercentualPorDesafioL1);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoFrases1', netScore, 100, estatisticasL1.erros, { licaoConcluida: estatisticasL1.licaoConcluida, jogoPerfeito: estatisticasL1.licaoConcluida && estatisticasL1.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL1.desafiosRespondidos });
            }
            if(refazerL1Btn) refazerL1Btn.addEventListener('click', renderizarLicao1);
            renderizarLicao1();
        }

        // --- LIÇÃO 2: Verdadeiro ou Falso? ---
        const licao2Element = document.getElementById('licaoFrases2');
        if(licao2Element) {
             const areaDesafiosL2 = document.getElementById('areaDesafiosLicaoFrases2');
             const refazerL2Btn = document.getElementById('refazerLicaoFrases2');
             let estatisticasL2;
             const licao2Data = [
                { id: 'l2f_1', emoji: '🍎', frase: 'A maçã é azul.', eVerdadeiro: false }, { id: 'l2f_2', emoji: '☀️', frase: 'O sol é amarelo.', eVerdadeiro: true },
                { id: 'l2f_3', emoji: '🐘', frase: 'O elefante é pequeno.', eVerdadeiro: false }, { id: 'l2f_4', emoji: '🐢', frase: 'A tartaruga é devagar.', eVerdadeiro: true },
                { id: 'l2f_5', emoji: '🔥', frase: 'O fogo é frio.', eVerdadeiro: false }, { id: 'l2f_6', emoji: '❄️', frase: 'A neve é gelada.', eVerdadeiro: true },
                { id: 'l2f_7', emoji: '🚗', frase: 'O carro pode voar.', eVerdadeiro: false }, { id: 'l2f_8', emoji: '🐟', frase: 'O peixe vive na água.', eVerdadeiro: true },
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
                    desafioDiv.className = 'desafio-item-licaofraises2';
                    desafioDiv.dataset.answered = 'false';
                    const imagemContainer = document.createElement('div');
                    imagemContainer.className = 'imagem-container-l2f';
                    imagemContainer.textContent = challenge.emoji;
                    const fraseP = document.createElement('p');
                    fraseP.className = 'frase-vf-l2f';
                    fraseP.textContent = challenge.frase;
                    const botoesContainer = document.createElement('div');
                    botoesContainer.className = 'botoes-vf-l2f';
                    const btnVerdadeiro = document.createElement('button');
                    btnVerdadeiro.className = 'btn-vf verdadeiro';
                    btnVerdadeiro.textContent = 'Verdadeiro';
                    btnVerdadeiro.addEventListener('click', () => handleVFClick(true, btnVerdadeiro, challenge, desafioDiv, botoesContainer));
                    const btnFalso = document.createElement('button');
                    btnFalso.className = 'btn-vf falso';
                    btnFalso.textContent = 'Falso';
                    btnFalso.addEventListener('click', () => handleVFClick(false, btnFalso, challenge, desafioDiv, botoesContainer));
                    botoesContainer.appendChild(btnVerdadeiro);
                    botoesContainer.appendChild(btnFalso);
                    desafioDiv.appendChild(imagemContainer);
                    desafioDiv.appendChild(fraseP);
                    desafioDiv.appendChild(botoesContainer);
                    areaDesafiosL2.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoFrases2', 0, 100, 0, {});
             }

             function handleVFClick(escolhaDoUsuario, btnEscolhido, challengeData, desafioDiv, botoesContainer) {
                if (desafioDiv.dataset.answered === 'true') return;
                desafioDiv.dataset.answered = 'true';
                botoesContainer.querySelectorAll('.btn-vf').forEach(b => b.disabled = true);
                if (escolhaDoUsuario === challengeData.eVerdadeiro) {
                    btnEscolhido.classList.add('correto'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL2.acertos++;
                } else {
                    btnEscolhido.classList.add('errado'); if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL2.erros++; estatisticasL2.jogoPerfeitoAlcancado = false;
                }
                estatisticasL2.desafiosRespondidos++;
                if(!estatisticasL2.licaoConcluida && estatisticasL2.desafiosRespondidos === totalDesafiosL2) { estatisticasL2.licaoConcluida = true; }
                let netScore = (estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado) ? 100 : (estatisticasL2.acertos * valorPercentualPorDesafioL2) - (estatisticasL2.erros * valorPercentualPorDesafioL2);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoFrases2', netScore, 100, estatisticasL2.erros, { licaoConcluida: estatisticasL2.licaoConcluida, jogoPerfeito: estatisticasL2.licaoConcluida && estatisticasL2.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL2.desafiosRespondidos });
            }
            if(refazerL2Btn) { refazerL2Btn.addEventListener('click', renderizarLicao2); }
            renderizarLicao2();
        }

        // --- LIÇÃO 3: Ordene a Bagunça! ---
        const licao3Element = document.getElementById('licaoFrases3');
        if(licao3Element) {
             const areaDesafiosL3 = document.getElementById('areaDesafiosLicaoFrases3');
             const refazerL3Btn = document.getElementById('refazerLicaoFrases3');
             let estatisticasL3;
             const licao3Data = [
                { id: 'l3f_1', emojiClue: '🐱', fraseCorreta: ['O', 'gato', 'bebe', 'leite.'] },
                { id: 'l3f_2', emojiClue: '👧', fraseCorreta: ['A', 'menina', 'pula', 'corda.'] },
                { id: 'l3f_3', emojiClue: '🚗', fraseCorreta: ['O', 'carro', 'é', 'azul.'] },
                { id: 'l3f_4', emojiClue: '🐒', fraseCorreta: ['O', 'macaco', 'come', 'banana.'] },
                { id: 'l3f_5', emojiClue: '🐦', fraseCorreta: ['O', 'pássaro', 'voa', 'alto.'] }
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
                    desafioDiv.className = 'desafio-item-licaofraises3';
                    desafioDiv.dataset.answered = 'false';

                    const dica = document.createElement('span');
                    dica.className = 'dica-visual-l3f';
                    dica.textContent = challenge.emojiClue;
                    desafioDiv.appendChild(dica);
                    
                    const slotsContainer = document.createElement('div');
                    slotsContainer.className = 'slots-frase-l3f';
                    desafioDiv.appendChild(slotsContainer);

                    const bancoPalavras = document.createElement('div');
                    bancoPalavras.className = 'banco-palavras-l3f';
                    window.shuffleArray([...challenge.fraseCorreta]).forEach(palavra => {
                        const palavraBtn = document.createElement('button');
                        palavraBtn.className = 'palavra-opcao-l3f';
                        palavraBtn.textContent = palavra;
                        palavraBtn.dataset.palavra = palavra;
                        palavraBtn.addEventListener('click', () => moverPalavraParaSlot(palavraBtn, slotsContainer, challenge, desafioDiv));
                        bancoPalavras.appendChild(palavraBtn);
                    });
                    desafioDiv.appendChild(bancoPalavras);
                    areaDesafiosL3.appendChild(desafioDiv);
                });
                window.atualizarProgressoCircularAtividade('LicaoFrases3', 0, 100, 0, {});
             }
             
             function moverPalavraParaSlot(palavraBtn, slotsContainer, challengeData, desafioDiv) {
                if (palavraBtn.classList.contains('usada') || desafioDiv.dataset.answered === 'true') return;
                palavraBtn.classList.add('usada');
                const slot = document.createElement('span');
                slot.className = 'palavra-slot-l3f';
                slot.textContent = palavraBtn.dataset.palavra;
                slot.addEventListener('click', () => removerPalavraDoSlot(slot, palavraBtn));
                slotsContainer.appendChild(slot);

                if (slotsContainer.children.length === challengeData.fraseCorreta.length) {
                    verificarFraseL3(slotsContainer, challengeData, desafioDiv);
                }
             }

             function removerPalavraDoSlot(slot, palavraBtn) {
                if (slot.parentElement.parentElement.dataset.answered === 'true') return;
                palavraBtn.classList.remove('usada');
                slot.remove();
             }

             function verificarFraseL3(slotsContainer, challengeData, desafioDiv) {
                desafioDiv.dataset.answered = 'true';
                const palavrasFormadas = Array.from(slotsContainer.children).map(s => s.textContent);
                const fraseFormada = palavrasFormadas.join(' ');
                const fraseCorreta = challengeData.fraseCorreta.join(' ');

                if (fraseFormada === fraseCorreta) {
                    slotsContainer.classList.add('correta'); if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false); estatisticasL3.acertos++;
                } else {
                    slotsContainer.classList.add('errada'); if(audioErrou) window.tocarAudioControlado(audioErrou, null, false); estatisticasL3.erros++; estatisticasL3.jogoPerfeitoAlcancado = false;
                }
                estatisticasL3.desafiosRespondidos++;
                if(!estatisticasL3.licaoConcluida && estatisticasL3.desafiosRespondidos === totalDesafiosL3) { estatisticasL3.licaoConcluida = true; }
                let netScore = (estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado) ? 100 : (estatisticasL3.acertos * valorPercentualPorDesafioL3) - (estatisticasL3.erros * valorPercentualPorDesafioL3);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoFrases3', netScore, 100, estatisticasL3.erros, { licaoConcluida: estatisticasL3.licaoConcluida, jogoPerfeito: estatisticasL3.licaoConcluida && estatisticasL3.jogoPerfeitoAlcancado, desafiosRespondidos: estatisticasL3.desafiosRespondidos });
             }

             if(refazerL3Btn) { refazerL3Btn.addEventListener('click', renderizarLicao3); }
             renderizarLicao3();
        }

        // --- LIÇÃO 4: Monte sua Própria História! (LÓGICA ATUALIZADA) ---
        const licao4Element = document.getElementById('licaoFrases4');
        if(licao4Element) {
            const areaDesafiosL4 = document.getElementById('areaDesafiosLicaoFrases4');
            const refazerL4Btn = document.getElementById('refazerLicaoFrases4');
            
            let estatisticasL4;
            const licao4Data = {
                sujeitos: ["O menino", "A gata", "O sol", "Um robô", "A fada"],
                verbos: ["pulou", "comeu", "brincou", "dormiu", "voou"],
                complementos: ["na lua", "uma banana", "com a bola", "na cama", "no céu"]
            };
            const totalFrasesParaFormarL4 = 5; // Meta de 5 frases para 100%
            const valorPercentualPorFraseL4 = 100 / totalFrasesParaFormarL4;
            let fraseAtualL4 = { sujeito: null, verbo: null, complemento: null };

            function inicializarEstatisticasL4() { 
                estatisticasL4 = { acertos: 0, erros: 0, licaoConcluida: false }; 
            }
            
            function renderizarLicao4() {
                if(!areaDesafiosL4) return;
                areaDesafiosL4.innerHTML = '';
                inicializarEstatisticasL4();
                fraseAtualL4 = { sujeito: null, verbo: null, complemento: null };

                const containerMontagem = document.createElement('div');
                containerMontagem.className = 'container-montagem-frase-l4f';

                // Cria colunas
                containerMontagem.appendChild(criarColunaL4('QUEM?', 'sujeito', licao4Data.sujeitos));
                containerMontagem.appendChild(criarColunaL4('O QUÊ?', 'verbo', licao4Data.verbos));
                containerMontagem.appendChild(criarColunaL4('ONDE/COM O QUÊ?', 'complemento', licao4Data.complementos));
                areaDesafiosL4.appendChild(containerMontagem);

                const fraseMontadaContainer = document.createElement('div');
                fraseMontadaContainer.className = 'frase-montada-container-l4f';
                const fraseMontadaDiv = document.createElement('div');
                fraseMontadaDiv.className = 'frase-montada-l4f';
                fraseMontadaDiv.id = 'displayFraseMontadaL4';
                fraseMontadaDiv.textContent = '...';
                fraseMontadaContainer.appendChild(fraseMontadaDiv);
                areaDesafiosL4.appendChild(fraseMontadaContainer);

                window.atualizarProgressoCircularAtividade('LicaoFrases4', 0, 100, 0, {});
            }

            function criarColunaL4(titulo, tipo, palavras) {
                const coluna = document.createElement('div');
                coluna.className = `coluna-palavras-l4f coluna-${tipo}`;
                const tituloH4 = document.createElement('h4');
                tituloH4.className = 'coluna-titulo-l4f';
                tituloH4.textContent = titulo;
                coluna.appendChild(tituloH4);
                palavras.forEach(palavra => {
                    const btnPalavra = document.createElement('button');
                    btnPalavra.className = 'palavra-escolha-l4f';
                    btnPalavra.textContent = palavra;
                    btnPalavra.addEventListener('click', (event) => handleEscolhaColunaL4F(palavra, tipo, coluna, event.target));
                    coluna.appendChild(btnPalavra);
                });
                return coluna;
            }

            function handleEscolhaColunaL4F(palavra, tipo, coluna, btnEscolhido) {
                // Se a frase atual já foi completada, não faz nada até ela ser limpa
                if(fraseAtualL4.sujeito && fraseAtualL4.verbo && fraseAtualL4.complemento) return;

                // **NOVA LÓGICA DE VERIFICAÇÃO DE ORDEM**
                if (tipo === 'verbo' && !fraseAtualL4.sujeito) {
                    registrarErroL4("Comece pela coluna 'QUEM?'!");
                    return;
                }
                if (tipo === 'complemento' && !fraseAtualL4.verbo) {
                    registrarErroL4("Escolha 'O QUÊ?' antes de terminar!");
                    return;
                }

                // Lógica original para seleção
                fraseAtualL4[tipo] = palavra;
                coluna.querySelectorAll('.palavra-escolha-l4f').forEach(btn => btn.classList.remove('selecionada'));
                btnEscolhido.classList.add('selecionada');
                atualizarFraseMontada();
            }
            
            function registrarErroL4(mensagem) {
                if (audioErrou) window.tocarAudioControlado(audioErrou, null, false);
                estatisticasL4.erros++;
                // Atualiza a pontuação imediatamente para refletir o erro
                let netScore = (estatisticasL4.acertos * valorPercentualPorFraseL4) - (estatisticasL4.erros * valorPercentualPorFraseL4);
                netScore = Math.min(100, Math.max(0, netScore));
                window.atualizarProgressoCircularAtividade('LicaoFrases4', netScore, 100, estatisticasL4.erros, { /* ... status ... */ });
                
                // Mostra um feedback de erro temporário
                const display = document.getElementById('displayFraseMontadaL4');
                if (display.textContent.includes('...')) { // Evita sobrepor o feedback de acerto
                    const textoOriginal = display.textContent;
                    display.textContent = mensagem;
                    display.classList.add('feedback-erro-temporario');
                    setTimeout(() => {
                        display.textContent = textoOriginal;
                        display.classList.remove('feedback-erro-temporario');
                    }, 2000);
                }
            }

            function atualizarFraseMontada() {
                const display = document.getElementById('displayFraseMontadaL4');
                const { sujeito, verbo, complemento } = fraseAtualL4;
                display.textContent = `${sujeito || '...'} ${verbo || '...'} ${complemento || '...'}.`;

                if(sujeito && verbo && complemento) {
                    display.classList.add('completa');
                    if(audioAcertou) window.tocarAudioControlado(audioAcertou, null, false);
                    estatisticasL4.acertos = Math.min(totalFrasesParaFormarL4, estatisticasL4.acertos + 1);
                    
                    if(estatisticasL4.acertos >= totalFrasesParaFormarL4) {
                        estatisticasL4.licaoConcluida = true;
                    }

                    let netScore = (estatisticasL4.acertos * valorPercentualPorFraseL4) - (estatisticasL4.erros * valorPercentualPorFraseL4);
                    netScore = Math.min(100, Math.max(0, netScore));
                    window.atualizarProgressoCircularAtividade('LicaoFrases4', netScore, 100, estatisticasL4.erros, { licaoConcluida: estatisticasL4.licaoConcluida, desafiosRespondidos: estatisticasL4.acertos });
                    
                    setTimeout(() => {
                        fraseAtualL4 = { sujeito: null, verbo: null, complemento: null };
                        display.classList.remove('completa');
                        document.querySelectorAll('.palavra-escolha-l4f.selecionada').forEach(btn => btn.classList.remove('selecionada'));
                        if(estatisticasL4.licaoConcluida) {
                            display.textContent = 'Parabéns, você criou 5 frases!';
                        } else {
                            display.textContent = '...';
                        }
                    }, 2500);
                }
            }

            if(refazerL4Btn) { refazerL4Btn.addEventListener('click', renderizarLicao4); }
            renderizarLicao4();
        }
        
        ['refazerLicaoFrases1', 'refazerLicaoFrases2', 'refazerLicaoFrases3', 'refazerLicaoFrases4'].forEach(id => {
            const btn = document.getElementById(id);
            if(btn && audioRefazerGeral) {
                btn.addEventListener('mouseover', () => { window.pararAudioGlobal(); audioRefazerGeral.currentTime = 0; audioRefazerGeral.play().catch(e => {}); });
            }
        });
    }
});