import { disableDynamicStylesheet } from './utils/insert-dynamic-style';

// Features
import disableHovercard from './features/disable-hovercard';
import obfuscateReactionTooltips from './features/obfuscate-reaction-tooltips';
import showBotUsers from './features/show-bot-users';
import obfuscateUserNames from './features/obfuscate-user-names';

import './features/hide-avatars.css';
import './features/hide-comment-labels.css';

const features = [
  disableHovercard,
  obfuscateReactionTooltips,
  showBotUsers,
  obfuscateUserNames,
];

// Hold a list of disabler functions
let disable = null;

function toggleFeatures() {
  if (disable) {
    document.documentElement.dataset.unbiased = 'disabled';

    disable.forEach(fn => fn());
    disable = null;

    disableDynamicStylesheet();
  } else {
    document.documentElement.dataset.unbiased = 'enabled';

    disable = features.map(fn => fn());
  }
}

toggleFeatures();
