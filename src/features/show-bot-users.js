import { BOT_SELECTOR } from '../css-variables';
import observe from '../utils/observe-selector';
import insertDynamicStyle from '../utils/insert-dynamic-style';
import { isBot, addBot, removeUnbiasedName } from '../utils/unbiased-names';

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

  if (!isBot(userName)) {
    addBot(userName);
    insertDynamicStyle(
      [`img[alt="${userName}"]`, `img[alt="@${userName}"]`],
      `content: none !important; pointer-events: auto !important;`
    );
  }

  removeUnbiasedName(userName);
}

export default function showBotUsers() {
  return observe(BOT_SELECTOR, element => {
    if (element.innerText === 'bot') {
      showUnbiasedName(element.previousElementSibling);
    }
  });
}
