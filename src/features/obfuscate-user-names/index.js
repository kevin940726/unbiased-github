import { USER_NAME_SELECTOR } from '../../css-variables';
import observe from '../../utils/observe-selector';
import {
  getUnbiasedName,
  isBot,
  encryptUserName,
} from '../../utils/unbiased-names';
import getUserLoginName from '../../utils/get-user-login-name';
import './content.css';

function obfuscateUserNameElement(element) {
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
    element.dataset.biasedHref = href;
    element.setAttribute('href', unbiasedHref);
  }
}

export default function obfuscateUserNames() {
  const unobserve = observe(USER_NAME_SELECTOR, obfuscateUserNameElement);

  return () => {
    unobserve();

    document.querySelectorAll('[data-biased-user-name]').forEach(element => {
      element.innerText = element.dataset.biasedUserName;
      delete element.dataset.biasedUserName;
    });

    document.querySelectorAll('[data-biased-href]').forEach(element => {
      element.setAttribute('href', element.dataset.biasedHref);
      delete element.dataset.biasedHref;
    });
  };
}
