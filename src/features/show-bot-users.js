import { BOT_SELECTOR } from '../css-variables';
import observe from '../utils/observe-selector';
import createDynamicStylesheet from '../utils/create-dynamic-stylesheet';
import { isBot, addBot, removeUnbiasedName } from '../utils/unbiased-names';

export default function showBotUsers() {
  const stylesheet = createDynamicStylesheet('show-unbiased-name');

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

      stylesheet.insertStyle(
        [`img[alt="${userName}"]`, `img[alt="@${userName}"]`],
        `content: none !important; pointer-events: auto !important;`
      );
    }

    removeUnbiasedName(userName);
  }

  const unobserve = observe(BOT_SELECTOR, element => {
    if (element.innerText === 'bot') {
      showUnbiasedName(element.previousElementSibling);
    }
  });

  return () => {
    unobserve();
    stylesheet.remove();
  };
}
