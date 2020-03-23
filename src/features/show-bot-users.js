import { BOT_SELECTOR } from '../css-variables';
import observe from '../utils/observe-selector';
import { isBot, addBot, removeUnbiasedName } from '../utils/unbiased-names';
import injectExceptionStyle from './hide-avatars/inject-exception-style';

function showUnbiasedName(element) {
  const biasedUserName = element.dataset.biasedUserName;
  let userName;

  if (element.dataset.isBot) {
    return;
  }

  if (biasedUserName) {
    userName = biasedUserName.startsWith('@')
      ? biasedUserName.slice(1)
      : biasedUserName;
    element.innerText = biasedUserName;
    element.dataset.isBot = true;

    injectExceptionStyle(userName);
  } else {
    userName = element.innerText;
  }

  if (!userName) {
    return;
  }

  if (!isBot(userName)) {
    addBot(userName);
  }

  removeUnbiasedName(userName);
}

export default function showBotUsers() {
  const unobserve = observe(BOT_SELECTOR, element => {
    if (element.innerText === 'bot') {
      showUnbiasedName(element.previousElementSibling);
    }
  });

  return () => {
    unobserve();
  };
}
