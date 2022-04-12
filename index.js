const linceCards = document.querySelectorAll(".lince-card");
const cards = [
    '1.png', '2.png', '3.png', '4.png', '5.png',
    '6.png', '7.png', '8.png', '9.png', '10.png',
    '11.png', '12.png', '13.png', '14.png', '15.png',
    '16.png', '17.png', '18.png', '19.png', '20.png'
];


const botaoIniciar = document.querySelector("#iniciar-jogo");
const areaImagemSorteada = document.querySelector("#imagem-sorteada");
const areaPontos = document.querySelector("#pontuacao");
const botaoPararJogo = document.querySelector("#parar-jogo");
let intervalo = null;
let cronometro = null;
let cardParaEncontrar = null;
let jogoIniciado = false;


// JOGO
const lince = {
    iniciar: () => {
        areaPontos.innerHTML = 0;
        botaoPararJogo.classList.remove("noclick")

        botaoPararJogo.addEventListener("click", () => {
            lince.pararJogo();
        })

        clearInterval(intervalo);
        clearInterval(cronometro);
        clearInterval(cardParaEncontrar);

        lince.gerarNovaImagemSorteada();
        lince.cronometro();
        linceCards.forEach(linceCard => {
            linceCard.addEventListener("click", (e) => {
                const imagemClicada = e.target;
                const caminhoDaImageClicada = (imagemClicada.src.split("/"))[12];

                if (`${cardParaEncontrar}.png` === caminhoDaImageClicada) {
                    const pontuacaoAtual = parseInt(document.querySelector("#pontuacao").innerHTML);
                    areaPontos.innerHTML = pontuacaoAtual + 1;

                    lince.gerarNovaImagemSorteada();
                } else {

                    lince.pararJogo();
                }

            })
        });
    },
    pararJogo: () => {
        window.localStorage.setItem("pontuacao", parseInt(document.querySelector("#pontuacao").innerHTML));
        window.location.href = "gameover.html"
    },
    gerarNovaImagemSorteada: () => {
        clearInterval(intervalo);
        cardParaEncontrar = parseInt(Math.random() * (20 - 1) + 1);
        areaImagemSorteada.src = `./fotos/png/${cardParaEncontrar}.png`;

        intervalo = setInterval(() => {
            lince.gerarNovaImagemSorteada();
            const pontuacaoAtual = parseInt(document.querySelector("#pontuacao").innerHTML);
            if (pontuacaoAtual - 1 < 0) {
                lince.pararJogo();
            } else {
                areaPontos.innerHTML = pontuacaoAtual - 1;
            }

        }, 2000);
        intervalo;
        return cardParaEncontrar;
    },
    cronometro: () => {
        cronometro = setInterval(() => {
            const cronometroElement = document.querySelector("#cronometro");
            const tempoAtualNoCronometro = parseInt(cronometroElement.innerHTML);
            if (tempoAtualNoCronometro - 1 < 0) {
                lince.pararJogo()
            } else {
                cronometroElement.innerHTML = tempoAtualNoCronometro - 1;
            }
        }, 1000);
    }
};


botaoIniciar.addEventListener("click", () => {
    botaoIniciar.classList.add("noclick");
    if (jogoIniciado === false) {
        document.querySelector("#cronometro").innerHTML = 30;
        jogoIniciado = true;
        botaoIniciar.innerHTML = "Reiniciar";
        lince.iniciar();
    } else {
        window.location.reload();
    }
})




