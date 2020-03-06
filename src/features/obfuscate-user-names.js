import { USER_NAME_SELECTOR } from '../css-variables';
import { observe } from '../utils/dom-utils';
import {
  getUnbiasedName,
  isBot,
  encryptUserName,
} from '../utils/unbiased-names';
import getUserLoginName from '../utils/get-user-login-name';

function obfuscateUserName(element) {
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
    // Don't obfuscate yourself
    userName === getUserLoginName() ||
    // Or bots
    isBot(userName)
  ) {
    element.dataset.biasedUserName = prefix + userName;
    return;
  }

  const unbiasedName = getUnbiasedName(userName);
  element.innerText = prefix + unbiasedName;
  element.dataset.biasedUserName = prefix + userName;

  // obfuscate link href, the link will be redirected by background.js
  if (element.nodeName === 'A' && element.getAttribute('href')) {
    const href = element.getAttribute('href');
    const unbiasedHref = href.replace(
      /\/([\w-_]+)$/,
      (_, name) => `/@unbiased/?unbiased-name=${encryptUserName(name)}`
    );
    element.setAttribute('href', unbiasedHref);
  }
}

observe(USER_NAME_SELECTOR, obfuscateUserName);
