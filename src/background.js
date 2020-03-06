import { decryptUserName } from './utils/unbiased-names';

function unbiasedNameRedirectHandler(details) {
  const { origin, searchParams } = new URL(details.url);

  const unbiasedName = searchParams.get('unbiased-name');

  if (!unbiasedName) {
    return {};
  }

  const userName = decryptUserName(unbiasedName);

  return {
    redirectUrl: `${origin}/${userName}`,
  };
}

chrome.webRequest.onBeforeRequest.addListener(
  unbiasedNameRedirectHandler,
  {
    urls: ['https://github.com/@unbiased/*'],
    types: ['main_frame', 'sub_frame', 'image', 'xmlhttprequest'],
  },
  ['blocking']
);
