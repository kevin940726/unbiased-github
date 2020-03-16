import './content.css';

const CLASS_NAME = 'toggle-unbiased-github-checkbox';
const STICKY_HEADER_SELECTOR = '.gh-header-sticky:not(.is-placeholder) .d-flex';
const TOP_HEADER_ACTIONS_SELECTOR = '.gh-header-actions';
const STICKY_REVIEW_ACTIONS_SELECTOR = '.js-reviews-container';
const NEW_BUTTON_SELECTOR = '[data-hotkey="c"]';

const checkboxElements = {};

function createCheckbox(name, onChange) {
  const label = document.createElement('label');
  label.className = `${CLASS_NAME} btn btn-sm tooltipped tooltipped-w`;
  label.setAttribute('aria-label', 'Toggle Unbiased GitHub');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('change', onChange);

  const img = document.createElement('img');

  label.appendChild(input);
  label.appendChild(img);

  checkboxElements[name] = input;

  return label;
}

export default function renderToggleFeaturesCheckbox(isEnabled, setIsEnabled) {
  function handleChangeCheckbox(e) {
    setIsEnabled(e.target.checked);
  }

  const stickyHeader = document.querySelector(STICKY_HEADER_SELECTOR);
  if (stickyHeader && !checkboxElements.stickyHeader) {
    const stickyCheckbox = createCheckbox('stickyHeader', handleChangeCheckbox);

    stickyHeader.appendChild(stickyCheckbox);
  }

  const topActionsHeader = document.querySelector(TOP_HEADER_ACTIONS_SELECTOR);
  if (topActionsHeader && !checkboxElements.topActionsHeader) {
    const topCheckbox = createCheckbox(
      'topActionsHeader',
      handleChangeCheckbox
    );

    topActionsHeader.prepend(topCheckbox);
  }

  const stickyReviewActions = document.querySelector(
    STICKY_REVIEW_ACTIONS_SELECTOR
  );
  if (stickyReviewActions && !checkboxElements.stickyReviewActions) {
    const stickyReviewCheckbox = createCheckbox(
      'stickyReviewActions',
      handleChangeCheckbox
    );

    stickyReviewActions.prepend(stickyReviewCheckbox);
  }

  const newButton = document.querySelector(NEW_BUTTON_SELECTOR);
  // Only append when there's no top header, i.e. in issues/PRs page
  if (!topActionsHeader && newButton && !checkboxElements.newButton) {
    const newButtonCheckbox = createCheckbox('newButton', handleChangeCheckbox);
    newButtonCheckbox.classList.remove('btn-sm');

    newButton.insertAdjacentElement('beforebegin', newButtonCheckbox);
  }

  Object.values(checkboxElements).forEach(checkbox => {
    checkbox.checked = isEnabled;
  });
}
