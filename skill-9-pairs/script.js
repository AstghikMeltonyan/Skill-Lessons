class Card {
  openCard = false;
  successCard = false;

  constructor(gameArea, number, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.number = number

    this.card.addEventListener('click', () => {
      this.card.textContent = number;
      if (this.open === false && this.success === false) {
        this.open = true;
        action(this);
      }
    })
    gameArea.append(this.card)
  }

  set open(value) {
    this.openCard = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }

  get open() {
    return this.openCard
  }

  set success(value) {
    this.successCard = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }

  get success() {
    return this.successCard
  }
}

function newGame(gameArea, cardCount, time) {
  let cardsNumberArray = [],
    firstCard = null,
    secondCard = null,
    interval;
  const cardsNumber = [];

  let timer = document.querySelector('.timer');

  function timeOut(time) {

    function timeDecrement() {
      time--;
      timer.textContent = time;
    }

    interval = setInterval(() => {
      timeDecrement();
      if (time === 0) {
        clearInterval(interval);
        gameArea.innerHTML += '<p class="text">Упссс! Время Вышло</p>';
        restartGame()
      }
    }, 1000)
  }
  timeOut(time)

  for (let i = 1; i <= (cardCount * cardCount) /2; i++) {
    cardsNumberArray.push(i)
    cardsNumberArray.push(i)
  }

  gameArea.style.width = `${cardCount * 130}px`;
  gameArea.classList.add('container')

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - .5);

  for (let cardNumber of cardsNumberArray) {
    cardsNumber.push(new Card(gameArea, cardNumber, flipCard))
  }

  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        firstCard = null;
        secondCard.open = false;
        secondCard = null;
      }
    }

    if (firstCard === null) {
      firstCard = card
    } else {
      if (secondCard === null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number === secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null,
          secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.success').length === cardsNumberArray.length) {
      clearInterval(interval);
      gameArea.innerHTML += '<div class="text">Победа!</div>';
      restartGame();
    }
  }

  function restartGame() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = 'Новая Игра';

    button.addEventListener('click', () => {
      clearInterval(interval);
      gameArea.innerHTML = '';
      newGame(gameArea, cardCount, time);
      button.style.display = 'none';
    })
    document.querySelector('.container').append(button);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const gameArea = document.getElementById('game');
  const startArea = document.createElement('form');
  const subTitle = document.createElement('h2');
  subTitle.classList.add('subtitle');
  subTitle.textContent = 'Внесите количество карточек'

  startArea.classList.add('startArea')

  let input = document.createElement('input');
  input.classList.add('input');

  let button = document.createElement('button');
  button.classList.add('btn');
  button.textContent = 'Начать игру';

  startArea.append(subTitle);
  startArea.append(input);
  startArea.append(button);
  gameArea.append(startArea);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value === '' || input.value < 4 || input.value > 10 ||input.value%2 === 1) {
      input.value = 4
    }

    gameArea.innerHTML = '';

    newGame(gameArea, input.value, 60)
  })
})

