export const PREFIX = 'html:not([data-unbiased="disabled"])';

export const USER_NAME_SELECTOR = [
  'a.author',
  'a.author:hover',
  '[data-hovercard-type="user"]',
  /* Edit history */
  '.js-comment-edit-history-menu .v-align-middle.text-bold',
  /* Head ref branch */
  '.commit-ref.head-ref span:first-child:not(:last-child)',
  /* Inside hovercard */
  '.hovercard-icon + div > span.text-bold',
  /* Head ref branch inside hovercard */
  '.commit-ref:not(.base-ref) > .user',
]
  .map(selector => selector + ':not([data-biased-user-name])')
  .join(',');

export const BOT_SELECTOR = 'a.author + .Label--outline';

export const TRANSPARENT_IMAGE =
  'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)';

export const SEE_NO_EVIL_IMAGE =
  'url(https://github.githubassets.com/images/icons/emoji/unicode/1f648.png)';

export const MONKEY_FACE_IMAGE =
  'url(https://github.githubassets.com/images/icons/emoji/unicode/1f435.png)';
