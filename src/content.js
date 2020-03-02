import './content.css';

const USER_NAME_POOLS = {};

document.documentElement.classList.add('unbiased');

function generateRandomUnbiasedName(length) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}

// Disable hovercard on type of "user"
document.addEventListener(
  'mouseover',
  e => {
    if (e.target && e.target.dataset.hovercardType === 'user') {
      e.stopPropagation();
    }
  },
  true
);

// Observe every user name and "unbias" each one of them
document.addEventListener('animationstart', e => {
  if (e.animationName === 'user-name') {
    unbiasUserName(e.target);
  }
});

function unbiasUserName(element) {
  let userName = element.innerText;
  let prefix = '';

  if (userName.startsWith('@')) {
    userName = userName.slice(1);
    prefix = '@';
  }

  if (!userName || element.dataset.biasedUserName) {
    return;
  }

  if (!USER_NAME_POOLS[userName]) {
    USER_NAME_POOLS[userName] = generateRandomUnbiasedName(userName.length);
  }

  element.innerText = prefix + USER_NAME_POOLS[userName];
  element.dataset.biasedUserName = prefix + userName;
}
