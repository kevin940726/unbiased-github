import getUserLoginName from '../../utils/get-user-login-name';
import { getUnbiasedName } from '../../utils/unbiased-names';
import './content.css';

const REACTION_REGEX = /(^|,\s(?:and\s)?)([\w-_]+)/g;

function handleMouseOver(e) {
  if (
    e.target &&
    e.target.tagName === 'BUTTON' &&
    e.target.classList.contains('reaction-summary-item') &&
    !e.target.dataset.biasedReaction
  ) {
    const label = e.target.getAttribute('aria-label');

    const unbiasedReaction = label.replace(
      REACTION_REGEX,
      (match, p1, userName) => {
        // Don't obfuscate yourselves
        if (userName === getUserLoginName()) {
          return p1 + userName;
        }

        return p1 + getUnbiasedName(userName);
      }
    );

    e.target.setAttribute('aria-label', unbiasedReaction);
    e.target.dataset.biasedReaction = label;
  }
}

export default function obfuscateReactionTooltips() {
  document.addEventListener('mouseover', handleMouseOver);

  return () => {
    document.removeEventListener('mouseover', handleMouseOver);

    document.querySelectorAll('[data-biased-reaction]').forEach(element => {
      element.setAttribute('aria-label', element.dataset.biasedReaction);
      delete element.dataset.biasedReaction;
    });
  };
}
