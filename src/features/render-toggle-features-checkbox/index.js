import './content.css';

const CLASS_NAME = 'toggle-unbiased-github-checkbox';
const STICKY_HEADER_SELECTOR = '.gh-header-sticky:not(.is-placeholder) .d-flex';
const TOP_HEADER_SELECTOR = '.gh-header-actions';
const NEW_BUTTON_SELECTOR = '[data-hotkey="c"]';

const checkboxElements = {};

function createCheckbox(name, onChange) {
  const label = document.createElement('label');
  label.className = `${CLASS_NAME} btn btn-sm tooltipped tooltipped-w`;
  label.setAttribute('aria-label', 'Toggle unbiased-github');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('change', onChange);

  const text = document.createElement('span');

  label.appendChild(input);
  label.appendChild(text);

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

  const topHeader = document.querySelector(TOP_HEADER_SELECTOR);
  if (topHeader && !checkboxElements.topHeader) {
    const topCheckbox = createCheckbox('topHeader', handleChangeCheckbox);

    topHeader.prepend(topCheckbox);
  }

  const newButton = document.querySelector(NEW_BUTTON_SELECTOR);
  if (newButton && !checkboxElements.newButton) {
    const newButtonCheckbox = createCheckbox('newButton', handleChangeCheckbox);
    newButtonCheckbox.classList.remove('btn-sm');

    newButton.insertAdjacentElement('beforebegin', newButtonCheckbox);
  }

  Object.values(checkboxElements).forEach(checkbox => {
    checkbox.checked = isEnabled;
  });
}
