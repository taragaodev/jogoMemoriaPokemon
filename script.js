const memoryTable = document.getElementsByTagName("main")[0];
const btnStart = document.querySelector(".start");
const game = document.querySelector(".game");

let inicio = document.querySelector(".inicio");

btnStart.addEventListener("click", start);

function start() {
  inicio.style.zIndex = -1;
  inicio.style.visibility = "hidden";
  game.style.opacity = 1;
}

// ARRAY COM O NOME DAS IMAGENS
let images = [
  "bulbasauro.png",
  "caterpie.png",
  "charmander.png",
  "pikachu.png",
  "squirtle.png",
  "meowth.png",
  "pignite.png",
  "pawmi.png",
  "bulbasauro.png",
  "caterpie.png",
  "charmander.png",
  "pikachu.png",
  "squirtle.png",
  "meowth.png",
  "pignite.png",
  "pawmi.png",
];

// EMBARALHANDO AS IMAGENS
(function embaralhar() {
  let m = images.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = images[m];
    images[m] = images[i];
    images[i] = t;
  }
})();

// CRIANDO OS CARDS
for (let i = 0; i <= 15; i++) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-card", images[i]);
  memoryTable.appendChild(card);
}

//INSERINDO AS IMAGENS NOS CARDS
for (let c = 0; c <= 15; c++) {
  let table = document.querySelectorAll(`.memory-game :nth-child(${c + 1})`);
  table.forEach((data) => {
    // FUNDO DOS CARDS
    const imageCardBack = document.createElement("img");
    imageCardBack.classList.add("card-back");
    imageCardBack.src = "./img/int.png";

    // FRENTE DOS CARDS
    let imageCardFront = document.createElement("img");
    imageCardFront.classList.add("card-front");
    imageCardFront.src = `./img/${images[c]}`;
    data.appendChild(imageCardFront);
    data.appendChild(imageCardBack);
  });
}

// FUNCIONALIDADES DE ANIMAÇÃO E VERIFICAÇÃO DAS CARTAS
const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let viradas = [];
let countClicks = 0;
let qtdCliques = document.querySelector('.qtd-cliques')

function flipCard() {
  //CONTANTO OS CLIQUES
  countClicks += 1;
  console.log(countClicks);
  // TRANCANDO O TABULEIRO PARA EVITAR GIRAR MAIS DE DUAS CARTAS POR VEZ
  if (lockBoard) return;

  // EVITANDO CLICAR DUAS VEZES NA MESMA CARTA
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch(firstCard, secondCard);
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    endGame(firstCard, secondCard);
    return;
  }

  unflipCards();
}

// DESABILITA AS CARTAS CASO SEJAM IGUAIS
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

// VIRA NOVAMENTE AS CARTAS CASO SEJAM DIFERENTES
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

// RESETAR O TABULEIRO
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [(firstCard, secondCard)] = [null,null];
}

//FINALIZANDO O JOGO
//VERIFICAR SE TODAS AS CARTAS FORAM VIRADAS ADICIONANDO UMA CLASSE VIRADA
//AS CARTAS VIRADAS SÃO ADICIONADAS A UM ARRAY
function endGame(first, second) {
  first.classList.add("virada");
  second.classList.add("virada");
  viradas.push(first, second);

  //COMPARO AS CARTAS VIRADAS DO ARRAY COM A QUANTIDADE DE CARTAS DO JOGO
  if (viradas.length == 16) {
    let end = document.querySelector(".end");
    end.style.visibility = "visible";
    end.style.zIndex = 9999;
    qtdCliques.innerHTML = countClicks
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
