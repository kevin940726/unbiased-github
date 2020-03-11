// Features
import disableHovercard from './features/disable-hovercard';
import obfuscateReactionTooltips from './features/obfuscate-reaction-tooltips';
import showBotUsers from './features/show-bot-users';
import obfuscateUserNames from './features/obfuscate-user-names';
import obfuscateUserLinks from './features/obfuscate-user-links';
import hideAvatars from './features/hide-avatars';
// CSS based features are automatically injected or disabled
import './features/hide-comment-labels.css';

import createToggleFeaturesCheckbox from './features/create-toggle-features-checkbox';

const ENABLED_PATHS = [
  /\/[\w-_]+\/[\w-_]+\/issues\//,
  /\/[\w-_]+\/[\w-_]+\/pulls\//,
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

  try {
    disablers.forEach(fn => fn());
  } catch (err) {
    // ignore errors;
  }

  disablers = null;
}

function toggleFeatures() {
  chrome.storage.sync.get(
    {
      isEnabled: true,
    },
    ({ isEnabled }) => {
      if (isEnabled) {
        disableFeatures();

        chrome.storage.sync.set({
          isEnabled: false,
        });
      } else {
        enableFeatures();

        chrome.storage.sync.set({
          isEnabled: true,
        });
      }
    }
  );
}

function init() {
  chrome.storage.sync.get(
    {
      isEnabled: true,
    },
    ({ isEnabled }) => {
      if (
        isEnabled &&
        ENABLED_PATHS.some(pathRegex => pathRegex.test(location.pathname))
      ) {
        enableFeatures();

        createToggleFeaturesCheckbox(true, toggleFeatures);
      } else {
        disableFeatures();

        createToggleFeaturesCheckbox(false, toggleFeatures);
      }
    }
  );
}

document.addEventListener('pjax:end', init);
init();
