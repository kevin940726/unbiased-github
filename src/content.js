import './content.css';

const USER_NAME_POOLS = {};
const REACTION_REGEX = /(^|,\s(?:and\s)?)([\w-]+)/g;
let userLoginName;

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
      if (userLoginName && e.target.dataset.biasedUserName === userLoginName) {
        return;
      }

      e.stopPropagation();
    }
  },
  true
);

// Schedule in a next tick until document.head has populated
setTimeout(() => {
  const userLoginMeta = document.head.querySelector('meta[name="user-login"]');

  if (userLoginMeta) {
    userLoginName = userLoginMeta.getAttribute('content');
  }

  const style = document.createElement('style');
  style.innerHTML = `
    img[alt="${userLoginName}"], img[alt="@${userLoginName}"] {
      content: none !important;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);
}, 0);

// Unbias reaction tooltips
document.addEventListener('mouseover', e => {
  if (
    e.target &&
    e.target.tagName === 'BUTTON' &&
    e.target.classList.contains('reaction-summary-item') &&
    !e.target.dataset.biasedReaction
  ) {
    const label = e.target.getAttribute('aria-label');

    const unbiasedReaction = label.replace(
      REACTION_REGEX,
      (match, p1, userName) => {
        return p1 + getUnbiasedName(userName);
      }
    );

    e.target.setAttribute('aria-label', unbiasedReaction);
    e.target.dataset.biasedReaction = label;
  }
});

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

  // Don't unbias yourselves
  if (userLoginName && userName === userLoginName) {
    element.dataset.biasedUserName = prefix + userName;
    return;
  }

  const unbiasedName = getUnbiasedName(userName);
  element.innerText = prefix + unbiasedName;
  element.dataset.biasedUserName = prefix + userName;
}

function getUnbiasedName(userName) {
  if (!USER_NAME_POOLS[userName]) {
    USER_NAME_POOLS[userName] = generateRandomUnbiasedName(userName.length);
  }

  return USER_NAME_POOLS[userName];
}
