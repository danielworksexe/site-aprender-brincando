document.addEventListener('DOMContentLoaded', () => {
    console.log("Script Global Carregado!");
    let audioAtualGlobal = null; // Rastreia o áudio interativo (clicado) que está tocando

    // Função para parar qualquer áudio que esteja tocando (exceto o especificado) e limpar o estado do botão
    window.pararAudioGlobal = function(excetoEsteAudio = null) {
        if (audioAtualGlobal && audioAtualGlobal.audioElement !== excetoEsteAudio) {
            if (audioAtualGlobal.audioElement) {
                audioAtualGlobal.audioElement.pause();
                audioAtualGlobal.audioElement.currentTime = 0;
            }
            if (audioAtualGlobal.botaoElement) {
                audioAtualGlobal.botaoElement.classList.remove('audio-tocando');
            }
        }
        if (audioAtualGlobal && (excetoEsteAudio === null || (audioAtualGlobal.audioElement && audioAtualGlobal.audioElement !== excetoEsteAudio) )) {
            audioAtualGlobal = null;
        }
    }

    // Função genérica para tocar áudio, gerenciar o estado do botão e parar outros áudios globais
    window.tocarAudioControlado = function(audioElement, botaoElement, pararOutros = true) {
        if (!audioElement) {
            console.error("Elemento de áudio não fornecido para tocarAudioControlado. Botão:", botaoElement);
            return;
        }
        if (pararOutros) {
            window.pararAudioGlobal(audioElement);
        }

        if (audioElement.paused || audioElement.currentTime === 0) {
            audioElement.play().catch(e => console.error("Erro ao tocar áudio:", e.message, "ID do áudio:", audioElement.id, "Botão:", botaoElement));
            if (botaoElement) botaoElement.classList.add('audio-tocando');
            if (pararOutros && audioElement.id !== 'audioAcertou' && audioElement.id !== 'audioErrou' && audioElement.id !== 'audioRefazerAtividade' && audioElement.id !== 'audioVamosComecar') {
                audioAtualGlobal = { audioElement, botaoElement };
            }
        } else {
            audioElement.pause();
            audioElement.currentTime = 0;
            if (botaoElement) botaoElement.classList.remove('audio-tocando');
            if (pararOutros && audioAtualGlobal && audioAtualGlobal.audioElement === audioElement) {
                audioAtualGlobal = null;
            }
        }

        audioElement.onended = () => {
            if (botaoElement) botaoElement.classList.remove('audio-tocando');
            if (pararOutros && audioAtualGlobal && audioAtualGlobal.audioElement === audioElement) {
                audioAtualGlobal = null;
            }
        };
    }

    window.shuffleArray = function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    window.gerarOpcoesComDistratoresLicao = function(correta, todasOpcoesDisponiveis, numOpcoes = 3) {
        let opcoes = [correta];
        let distratores = window.shuffleArray([...todasOpcoesDisponiveis.filter(opt => opt.toUpperCase() !== correta.toUpperCase())]);
        while (opcoes.length < numOpcoes && distratores.length > 0) {
            opcoes.push(distratores.shift());
        }
        return window.shuffleArray(opcoes);
    }

    const totalEtapasTrilhaGlobal = 7;
    const localStorageKeyProgressoTrilhaGlobal = 'progressoAlfabetizacaoTrilha';

    function atualizarProgressoGlobalBaseadoNaPagina() {
        const currentPageFilename = window.location.pathname.split("/").pop() || "index.html";
        const paginaParaEtapa = {
            "vogais.html": 1,
            "atividade-vogais.html": 1,
            "encontros-vocalicos.html": 2,
            "atividade-encontros-vocalicos.html": 2,
        };

        const etapaNumeroCorrentePagina = paginaParaEtapa[currentPageFilename];

        if (etapaNumeroCorrentePagina) {
            let progressoSalvo = parseFloat(localStorage.getItem(localStorageKeyProgressoTrilhaGlobal)) || 0;
            const porcentagemDaEtapaAtual = (etapaNumeroCorrentePagina / totalEtapasTrilhaGlobal) * 100;

            if (porcentagemDaEtapaAtual > progressoSalvo) {
                localStorage.setItem(localStorageKeyProgressoTrilhaGlobal, porcentagemDaEtapaAtual.toString());
                console.log(`Progresso da trilha atualizado para ${porcentagemDaEtapaAtual.toFixed(0)}% ao visitar ${currentPageFilename}`);
            }
        }
    }
    atualizarProgressoGlobalBaseadoNaPagina();

    window.atualizarProgressoCircularAtividade = function(licaoIdPrefix, pontuacaoEntrada, totalBase, errosComputados, statusInfo = {}) {
        // Parâmetros esperados:
        // licaoIdPrefix: string (ex: 'LicaoEV1')
        // pontuacaoEntrada: number (pode ser a pontuação bruta ou já uma porcentagem)
        // totalBase: number (base para calcular a porcentagem; se pontuacaoEntrada já é %, totalBase = 100)
        // errosComputados: number (total de erros)
        // statusInfo: object { licaoConcluida: boolean, jogoPerfeito: boolean, desafiosRespondidos: number }

        const barra = document.getElementById(`barra${licaoIdPrefix}`);
        const textoProgresso = document.getElementById(`texto${licaoIdPrefix}`);
        const legendaProgressoEl = document.getElementById(`legendaProgresso${licaoIdPrefix}`);

        if (!barra || !textoProgresso || !legendaProgressoEl) {
            console.warn("Elementos da barra de progresso não encontrados para:", licaoIdPrefix);
            return;
        }

        let porcentagemFinal;
        // Se totalBase é 100, assume-se que pontuacaoEntrada já é a porcentagem (0-100).
        // Caso contrário, calcula a porcentagem.
        if (totalBase === 100 && pontuacaoEntrada >= 0 && pontuacaoEntrada <= 100) {
            porcentagemFinal = pontuacaoEntrada;
        } else {
            porcentagemFinal = (totalBase <= 0) ? 0 : (pontuacaoEntrada / totalBase) * 100;
        }
        porcentagemFinal = Math.min(Math.max(porcentagemFinal, 0), 100); // Garante que a porcentagem fique entre 0 e 100

        barra.style.strokeDasharray = `${porcentagemFinal}, 100`;
        textoProgresso.textContent = `${Math.round(porcentagemFinal)}%`;

        barra.classList.remove('cor-acerto', 'cor-erro');
        let legendaTexto = "Acertos"; // Legenda padrão

        if (statusInfo.licaoConcluida === true) {
            if (statusInfo.jogoPerfeito === true) {
                // Para ser "Perfeito!", a porcentagemFinal deve ser 100 (devido à pontuação líquida) E statusInfo.jogoPerfeito = true
                legendaTexto = "Perfeito!";
            } else {
                // Lição concluída, mas não perfeita (erros ocorreram, resultando em porcentagemFinal < 100, ou 100 mas jogoPerfeito=false por outra razão)
                legendaTexto = "Concluído!";
            }
            barra.classList.add('cor-acerto');
        } else if (porcentagemFinal > 0) { // Em andamento com pontuação líquida positiva
            barra.classList.add('cor-acerto');
            legendaTexto = "Acertos";
        } else if (errosComputados > 0 && porcentagemFinal <= 0 && (statusInfo.desafiosRespondidos || 0) > 0) {
            // Pontuação líquida zero ou negativa (exibida como 0%), houve erros e tentativas
            barra.classList.add('cor-erro');
            legendaTexto = "Tente de Novo";
        } else { // Estado inicial ou 0% sem erros ainda ou sem desafios respondidos significativos
            barra.style.stroke = '#e6e6e6';
            legendaTexto = "Acertos";
        }

        legendaProgressoEl.textContent = legendaTexto;
    };
});