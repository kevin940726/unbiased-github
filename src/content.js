// Features
import disableHovercard from './features/disable-hovercard';
import obfuscateReactionTooltips from './features/obfuscate-reaction-tooltips';
import showBotUsers from './features/show-bot-users';
import obfuscateUserNames from './features/obfuscate-user-names';
import obfuscateUserLinks from './features/obfuscate-user-links';
import hideAvatars from './features/hide-avatars';
// CSS based features are automatically injected or disabled
import './features/hide-comment-labels.css';

const features = [
  disableHovercard,
  obfuscateReactionTooltips,
  showBotUsers,
  obfuscateUserNames,
  obfuscateUserLinks,
  hideAvatars,
];

// Hold a list of disabler functions
let disable = null;

function toggleFeatures() {
  if (disable) {
    document.documentElement.dataset.unbiased = 'disabled';

    disable.forEach(fn => fn());
    disable = null;
  } else {
    document.documentElement.dataset.unbiased = 'enabled';

    disable = features.map(fn => fn());
  }
}

toggleFeatures();
