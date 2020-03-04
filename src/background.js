function unbiasedNameRedirectHandler(details) {
  const { origin, searchParams } = new URL(details.url);

  const unbiasedName = searchParams.get('unbiased-name');

  if (!unbiasedName) {
    return {};
  }

  return {
    redirectUrl: `${origin}/${atob(unbiasedName)}`,
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
