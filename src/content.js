import { insertDynamicStyle } from './dom-utils';
import './content.css';

const USER_NAME_POOLS = {};
const BOT_USER_NAMES = new Set();
const REACTION_REGEX = /(^|,\s(?:and\s)?)([\w-_]+)/g;
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

  insertDynamicStyle(`
img[alt="${userLoginName}"], img[alt="@${userLoginName}"] {
  content: none !important;
  pointer-events: auto !important;
}
  `);
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
        // Don't unbias yourselves
        if (userName === userLoginName) {
          return p1 + userName;
        }

        return p1 + getUnbiasedName(userName);
      }
    );

    e.target.setAttribute('aria-label', unbiasedReaction);
    e.target.dataset.biasedReaction = label;
  }
});

document.addEventListener('animationstart', e => {
  if (e.animationName === 'bot-label' && e.target.innerText === 'bot') {
    // Observe bot labels and record their names
    showUnbiasedName(e.target.previousElementSibling);
  } else if (e.animationName === 'user-name') {
    // Observe every user name and "unbias" each one of them
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

  if (
    // Don't unbias yourselves
    (userLoginName && userName === userLoginName) ||
    // Or bots
    BOT_USER_NAMES.has(userName)
  ) {
    element.dataset.biasedUserName = prefix + userName;
    return;
  }

  const unbiasedName = getUnbiasedName(userName);
  element.innerText = prefix + unbiasedName;
  element.dataset.biasedUserName = prefix + userName;

  // Unbias link href, the link will be redirected by background.js
  if (element.nodeName === 'A' && element.getAttribute('href')) {
    const href = element.getAttribute('href');
    const unbiasedHref = href.replace(
      /\/([\w-_]+)$/,
      (_, name) => `/@unbiased/?unbiased-name=${btoa(name)}`
    );
    element.setAttribute('href', unbiasedHref);
  }
}

function showUnbiasedName(element) {
  const biasedUserName = element.dataset.biasedUserName;
  let userName;

  if (biasedUserName) {
    userName = biasedUserName.startsWith('@')
      ? biasedUserName.slice(1)
      : biasedUserName;
    element.innerText = biasedUserName;
  } else {
    userName = element.innerText;
  }

  if (!BOT_USER_NAMES.has(userName)) {
    BOT_USER_NAMES.add(userName);
    insertDynamicStyle(`
img[alt="${userName}"], img[alt="@${userName}"] {
  content: none !important;
  pointer-events: auto !important;
}
    `);
  }
  delete USER_NAME_POOLS[userName];
}

function getUnbiasedName(userName) {
  if (!USER_NAME_POOLS[userName]) {
    USER_NAME_POOLS[userName] = generateRandomUnbiasedName(userName.length);
  }

  return USER_NAME_POOLS[userName];
}
