const startButton = document.querySelector('.startButton');

const redButton = document.querySelector('.redB');
const greenButton = document.querySelector('.greenB');
const blueButton = document.querySelector('.blueB');
const yellowButton = document.querySelector('.yellowB');

let gameSeqnc = [];
let playerSeqnc = [];
let round = 1;
const MAX_ROUNDS = 20;
let hardmode = false;

/* Event listener waiting for User to click START button. */
startButton.addEventListener('click', () => {
  if (hardmode) {
    hardRun();
  } else {
    normalRun();
  }
});

/* Function that runs a normal mode run of the game. */
const normalRun = () => {
  /* Function that gets the sequence that User will try to copy. */
  gameSeqnc = fillGameSeqnc();

  playerSeqnc = [];
  round = 1;

  /* Function that shows the current round game-sequence. */
  showCurrentGameSeqnc();

  /* Event listeners waiting for User to click any of the four buttons. */
  redButton.addEventListener('click', () => {
    playerSeqnc.push('r');
    /* Function that verifies if User inputs are equal to the current round game-sequence */
    verifySeqnc();
  });

  greenButton.addEventListener('click', () => {
    playerSeqnc.push('g');
    verifySeqnc();
  });

  blueButton.addEventListener('click', () => {
    playerSeqnc.push('b');
    verifySeqnc();
  });

  yellowButton.addEventListener('click', () => {
    playerSeqnc.push('y');
    verifySeqnc();
  });
};

const hardRun = () => {};

/* Function that returns the sequence that User will try to copy. */
const fillGameSeqnc = () => {
  const gameSeqnc = [];

  while (gameSeqnc.length < 20) {
    const newStep = rng(4);

    switch (newStep) {
      case 1:
        gameSeqnc.push('r');
        break;
      case 2:
        gameSeqnc.push('g');
        break;
      case 3:
        gameSeqnc.push('b');
        break;
      case 4:
        gameSeqnc.push('y');
        break;
    }
  }

  return gameSeqnc;
};

/* Function that returns a random number between 0 and max */
const rng = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

/* Function that shows the current round game-sequence. */
const showCurrentGameSeqnc = async () => {
  for (let i = 0; i < round; i++) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        switch (gameSeqnc[i]) {
          case 'r':
            redButton.setAttribute('class', 'pressedButton pressedRB');
            setTimeout(() => {
              redButton.setAttribute('class', 'gameButton redB');
              resolve();
            }, 500);
            break;
          case 'g':
            greenButton.setAttribute('class', 'pressedButton pressedGB');
            setTimeout(() => {
              greenButton.setAttribute('class', 'gameButton greenB');
              resolve();
            }, 500);
            break;
          case 'b':
            blueButton.setAttribute('class', 'pressedButton pressedBB');
            setTimeout(() => {
              blueButton.setAttribute('class', 'gameButton blueB');
              resolve();
            }, 500);
            break;
          case 'y':
            yellowButton.setAttribute('class', 'pressedButton pressedYB');
            setTimeout(() => {
              yellowButton.setAttribute('class', 'gameButton yellowB');
              resolve();
            }, 500);
            break;
        }
      }, 600);
    });
    await promise;
  }
};

/* Function that verifies if User inputs are equal to the current round game-sequence */
const verifySeqnc = () => {
  const seqncIsCorrect = playerSeqnc.every((el, i) => el === gameSeqnc[i]);
  if (!seqncIsCorrect) return false;
  if (playerSeqnc.length !== round)
    return; /* Here will be managed when User clicks the wrong button. */
  if (playerSeqnc.length !== MAX_ROUNDS) {
    round++;
    playerSeqnc = [];
    showCurrentGameSeqnc(gameSeqnc);
    return;
  }
  removeAllActiveListeners();
};

/* Function that removes all active listeners */
const removeAllActiveListeners = () => {
  redButton.removeEventListener('click');
  greenButton.removeEventListener('click');
  blueButton.removeEventListener('click');
  yellowButton.removeEventListener('click');
};
