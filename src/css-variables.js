export const USER_NAME_SELECTOR = [
  'a.author',
  'a.author:hover',
  /* Mentions */
  '.user-mention',
  /* Assignees */
  '.assignee',
  '.assignee.link-gray-dark',
  /* Edit history */
  '.js-comment-edit-history-menu .v-align-middle.text-bold',
  /* Head ref branch */
  '.commit-ref.head-ref span:first-child:not(:last-child)',
  /* Inside hovercard */
  '.hovercard-icon + div > span.text-bold',
  /* Head ref branch inside hovercard */
  '.commit-ref:not(.base-ref) > .user',
  /* issues/PRs page author names */
  'a[data-hovercard-type="user"]',
].join(',');

export const BOT_SELECTOR = 'a.author + .Label--outline';
