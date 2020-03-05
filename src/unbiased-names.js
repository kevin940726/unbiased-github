import getRandomID from './human-readable-ids/index.js';

const NAMES = {};
const BOT_NAMES = new Set();

export function getUnbiasedName(userName) {
  if (!NAMES[userName]) {
    const unbiasedName = getRandomID();
    NAMES[userName] = unbiasedName;
  }

  return NAMES[userName];
}

export function removeUnbiasedName(userName) {
  delete NAMES[userName];
}

export function isBot(userName) {
  return BOT_NAMES.has(userName);
}

export function addBot(userName) {
  BOT_NAMES.add(userName);
}

export function encryptUserName(userName) {
  const base64 = btoa(userName);

  const shift = Math.floor(Math.random() * 10);

  const shifted = base64.slice(shift) + base64.slice(0, shift);

  return String(shift) + btoa(shifted);
}

export function decryptUserName(unbiasedName) {
  const shift = parseInt(unbiasedName[0], 10);
  const shifted = atob(unbiasedName.slice(1));

  const base64 = shifted.slice(-shift) + shifted.slice(0, -shift);

  const userName = atob(base64);

  return userName;
}
