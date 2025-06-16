const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Como você lida com a pressão do dia a dia?",
        alternativas: [
            { texto: "Encaro como um desafio e tento manter o controle.", categoria: "Resiliente" },
            { texto: "Me sinto sobrecarregado e busco formas de fuga.", categoria: "Estressado" }
        ]
    },
    {
        enunciado: "O que você faz quando sente que está perdendo o equilíbrio emocional?",
        alternativas: [
            { texto: "Busco técnicas de relaxamento ou apoio profissional.", categoria: "Autocuidado" },
            { texto: "Tento ignorar os sentimentos até que passem.", categoria: "Evasivo" }
        ]
    },
    {
        enunciado: "Quando enfrenta um obstáculo inesperado, qual sua reação mais comum?",
        alternativas: [
            { texto: "Procuro alternativas e sigo em frente com resiliência.", categoria: "Resiliente" },
            { texto: "Fico paralisado e tenho dificuldade em encontrar soluções.", categoria: "Estressado" }
        ]
    },
    {
        enunciado: "Como você percebe a sua própria felicidade?",
        alternativas: [
            { texto: "Depende de minhas ações e escolhas diárias.", categoria: "Autocuidado" },
            { texto: "Depende das circunstâncias externas e do que acontece ao meu redor.", categoria: "Evasivo" }
        ]
    },
    {
        enunciado: "O que você prioriza em sua vida para sentir-se bem?",
        alternativas: [
            { texto: "Autoconhecimento e equilíbrio emocional.", categoria: "Autocuidado" },
            { texto: "Sucesso material e reconhecimento dos outros.", categoria: "Evasivo" }
        ]
    }
];

let atual = 0;
let contagemCategorias = { Resiliente: 0, Estressado: 0, Autocuidado: 0, Evasivo: 0 };

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas(perguntaAtual.alternativas);
}

function mostraAlternativas(alternativas) {
    alternativas.forEach(alternativa => {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    });
}

function respostaSelecionada(opcaoSelecionada) {
    contagemCategorias[opcaoSelecionada.categoria]++;
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    let categoriaFinal = Object.keys(contagemCategorias).reduce((a, b) => contagemCategorias[a] > contagemCategorias[b] ? a : b);

    let mensagemFinal = "";
    switch (categoriaFinal) {
        case "Resiliente":
            mensagemFinal = "Você tem uma abordagem resiliente diante dos desafios! Busque manter sua força emocional e compartilhe sua visão positiva com os outros.";
            break;
        case "Estressado":
            mensagemFinal = "O estresse pode estar afetando sua vida. Considere buscar técnicas de relaxamento, apoio emocional e estratégias para lidar com as pressões do dia a dia.";
            break;
        case "Autocuidado":
            mensagemFinal = "Você valoriza o autocuidado! Continue priorizando sua saúde mental e bem-estar, garantindo equilíbrio na sua rotina.";
            break;
        case "Evasivo":
            mensagemFinal = "Você tende a evitar problemas em vez de enfrentá-los. Tente se conectar mais com suas emoções e buscar formas de resolver desafios de maneira ativa.";
            break;
    }

    caixaPerguntas.textContent = "Seu resultado:";
    textoResultado.textContent = mensagemFinal;
    caixaAlternativas.textContent = "";
}

mostraPergunta();
