import './content.css';

const CLASS_NAME = 'toggle-unbiased-github-checkbox';

const STICKY_HEADER_SELECTOR = '.gh-header-sticky:not(.is-placeholder) .d-flex';
const TOP_HEADER_ACTIONS_SELECTOR = '.gh-header-actions';
const STICKY_REVIEW_ACTIONS_SELECTOR = '.js-reviews-container';
const NEW_BUTTON_SELECTOR = '[data-hotkey="c"]';

const checkboxElements = {};

function createCheckbox(onChange) {
  const label = document.createElement('label');
  label.className = `${CLASS_NAME} btn btn-sm tooltipped tooltipped-w`;
  label.setAttribute('aria-label', 'Toggle Unbiased GitHub');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('change', onChange);

  const img = document.createElement('img');

  label.appendChild(input);
  label.appendChild(img);

  return label;
}

function insertAndReturnCheckbox(selector, placement, onChange) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  let checkbox = element.querySelector(`.${CLASS_NAME}`);

  if (!checkbox) {
    checkbox = createCheckbox(onChange);

    placement(element, checkbox);
  }

  return checkbox;
}

const CHECKBOXES = [
  {
    selector: STICKY_HEADER_SELECTOR,
    placement: (element, checkbox) => element.appendChild(checkbox),
  },
  {
    selector: TOP_HEADER_ACTIONS_SELECTOR,
    placement: (element, checkbox) => element.prepend(checkbox),
  },
  {
    selector: STICKY_REVIEW_ACTIONS_SELECTOR,
    placement: (element, checkbox) => element.prepend(checkbox),
  },
  {
    selector: NEW_BUTTON_SELECTOR,
    placement: (element, checkbox) => {
      // Only append when there's no top header, i.e. in issues/PRs page
      const topHeader = document.querySelector(TOP_HEADER_ACTIONS_SELECTOR);
      if (topHeader && topHeader.querySelector(`.${CLASS_NAME}`)) {
        return;
      }

      checkbox.classList.remove('btn-sm');

      element.insertAdjacentElement('beforebegin', checkbox);
    },
  },
];

export default function renderToggleFeaturesCheckbox(isEnabled, setIsEnabled) {
  function handleChangeCheckbox(e) {
    setIsEnabled(e.target.checked);
  }

  CHECKBOXES.map(({ selector, placement }) =>
    insertAndReturnCheckbox(selector, placement, handleChangeCheckbox)
  )
    .filter(Boolean)
    .forEach(checkbox => {
      checkbox.querySelector('input').checked = isEnabled;
    });
}
