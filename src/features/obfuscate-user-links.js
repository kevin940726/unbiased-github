import observe from '../utils/observe-selector';
import { encryptUserName } from '../utils/unbiased-names';
import getUserLoginName from '../utils/get-user-login-name';

// obfuscate link href, the link will be redirected by background.js
export default function obfuscateUserLinks() {
  const userLoginName = getUserLoginName();

  function obfuscateLink(anchorElement) {
    const href = anchorElement.getAttribute('href');

    if (
      href.startsWith(`/${userLoginName}`) ||
      href.startsWith(`${location.origin}/${userLoginName}`)
    ) {
      return;
    }

    const unbiasedHref = href.replace(
      /\/([\w-_]+)$/,
      (_, name) => `/@unbiased-github/?unbiased-name=${encryptUserName(name)}`
    );

    anchorElement.dataset.biasedHref = href;
    anchorElement.setAttribute('href', unbiasedHref);
  }

  const unobserve = observe(
    'a[data-hovercard-type="user"]:not([data-biased-href]), [data-hovercard-type="user"] a:not([data-biased-href])',
    obfuscateLink
  );

  return () => {
    unobserve();

    document.querySelectorAll('[data-biased-href]').forEach(element => {
      element.setAttribute('href', element.dataset.biasedHref);
      delete element.dataset.biasedHref;
    });
  };
}
