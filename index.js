const startButton = document.querySelector('.startButton');

const redButton = document.querySelector('.redB');
const greenButton = document.querySelector('.greenB');
const blueButton = document.querySelector('.blueB');
const yellowButton = document.querySelector('.yellowB');
const textLevel = document.querySelector('.levelLabel');
const restart = document.querySelector(".restartButton");    // US7 Button.

let gameSeqnc = [];
let playerSeqnc = [];
let round = 1;
const MAX_ROUNDS = 20;
let hardmode = false;

/* Event listener waiting for User to click START button. */
startButton.addEventListener('click', () => {
  removeAllActiveListeners();

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
  updateLevel(round);

  /* Function that shows the current round game-sequence. */
  showCurrentGameSeqnc();

  /* Event listeners waiting for User to click any of the four buttons. */
  redButton.addEventListener('click', handleRedButton);
  greenButton.addEventListener('click', handleGreenButton);
  blueButton.addEventListener('click', handleBlueButton);
  yellowButton.addEventListener('click', handleYellowButton);
  restart.addEventListener('click', restarting);
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
            playAudio('r');
            setTimeout(() => {
              redButton.setAttribute('class', 'gameButton redB');
              resolve();
            }, 500);
            break;
          case 'g':
            greenButton.setAttribute('class', 'pressedButton pressedGB');
            playAudio('g');
            setTimeout(() => {
              greenButton.setAttribute('class', 'gameButton greenB');
              resolve();
            }, 500);
            break;
          case 'b':
            blueButton.setAttribute('class', 'pressedButton pressedBB');
            playAudio('b');
            setTimeout(() => {
              blueButton.setAttribute('class', 'gameButton blueB');
              resolve();
            }, 500);
            break;
          case 'y':
            yellowButton.setAttribute('class', 'pressedButton pressedYB');
            playAudio('y');
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
  if (!seqncIsCorrect){
    round = 1;    
    playerSeqnc = [];    
    playAudio('wrong');
    showCurrentGameSeqnc();
    updateLevel(round);
    alert("You have entered an incorrect pattern!");
    
  }
  if (playerSeqnc.length !== round)
    return;
  if (playerSeqnc.length !== MAX_ROUNDS) {
    round++;
    updateLevel(round);
    playerSeqnc = [];
    showCurrentGameSeqnc(gameSeqnc);
    return;
  }
  removeAllActiveListeners();
};

/* Event listeners waiting for User to click any of the four buttons. */
const handleRedButton = () => {
  playerSeqnc.push('r');
  playAudio('r');
  /* Function that verifies if User inputs are equal to the current round game-sequence */
  verifySeqnc();
};
const handleGreenButton = () => {
  playerSeqnc.push('g');
  playAudio('g');
  verifySeqnc();
};
const handleBlueButton = () => {
  playerSeqnc.push('b');
  playAudio('b');
  verifySeqnc();
};
const handleYellowButton = () => {
  playerSeqnc.push('y');
  playAudio('y');
  verifySeqnc();
};
// US 7 Function. Restart the game at the dificulty level that was being played. 
const restarting = () => {
  playerSeqnc = [];
  round = 1;  
  updateLevel(round);
  verifySeqnc();

  if (hardmode) {
    hardRun();
  } else {
    normalRun();
  };

};

/* Function that removes all active listeners */
const removeAllActiveListeners = () => {
  redButton.removeEventListener('click', handleRedButton);
  greenButton.removeEventListener('click', handleGreenButton);
  blueButton.removeEventListener('click', handleBlueButton);
  yellowButton.removeEventListener('click', handleYellowButton);
  restart.removeEventListener('click', restarting);
};

const playAudio = (color) => {
  
  let filePath = `sounds/${color}.mp3`;
  let audio = new Audio(filePath);
  audio.play();
};


const updateLevel = (level) => {

  textLevel.innerText = "Level " + level + " of 20";
 
};