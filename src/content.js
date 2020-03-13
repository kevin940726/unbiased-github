// Features
import disableHovercard from './features/disable-hovercard';
import obfuscateReactionTooltips from './features/obfuscate-reaction-tooltips';
import showBotUsers from './features/show-bot-users';
import obfuscateUserNames from './features/obfuscate-user-names';
import obfuscateUserLinks from './features/obfuscate-user-links';
import hideAvatars from './features/hide-avatars';
// CSS based features are automatically injected or disabled
import './features/hide-comment-labels.css';

import renderToggleFeaturesCheckbox from './features/render-toggle-features-checkbox';

const ENABLED_PATHS = [
  /\/[\w-_]+\/[\w-_]+\/issues/,
  /\/[\w-_]+\/[\w-_]+\/pulls/,
  /\/[\w-_]+\/[\w-_]+\/issue\//,
  /\/[\w-_]+\/[\w-_]+\/pull\//,
];

const features = [
  disableHovercard,
  obfuscateReactionTooltips,
  showBotUsers,
  obfuscateUserNames,
  obfuscateUserLinks,
  hideAvatars,
];

// Hold a list of disabler functions
let disablers = null;

function enableFeatures() {
  document.documentElement.dataset.unbiased = 'enabled';

  if (disablers) {
    return;
  }

  disablers = features.map(fn => fn());
}

function disableFeatures() {
  document.documentElement.dataset.unbiased = 'disabled';

  if (!disablers) {
    return;
  }

  disablers.forEach(fn => fn());

  disablers = null;
}

function setIsEnabled(isEnabled) {
  chrome.storage.sync.set({ isEnabled });
}

function handleOptionsChanged({ isEnabled }) {
  renderToggleFeaturesCheckbox(isEnabled, setIsEnabled);

  if (
    isEnabled &&
    ENABLED_PATHS.some(pathRegex => pathRegex.test(location.pathname))
  ) {
    enableFeatures();
  } else {
    disableFeatures();
  }
}

function init() {
  chrome.storage.sync.get(
    {
      isEnabled: true,
    },
    handleOptionsChanged
  );
}

chrome.storage.onChanged.addListener(({ isEnabled: { newValue: isEnabled } }) =>
  handleOptionsChanged({ isEnabled })
);

document.addEventListener('pjax:end', init);
document.addEventListener('DOMContentLoaded', init);
