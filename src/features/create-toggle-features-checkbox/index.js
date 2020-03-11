import './content.css';

const CLASS_NAME = 'toggle-unbiased-github-checkbox';
const STICKY_HEADER_SELECTOR = '.gh-header-sticky:not(.is-placeholder) .d-flex';
const TOP_HEADER_SELECTOR = '.gh-header-actions';

const checkboxElements = new Set();

function createCheckbox({ onChange, checked }) {
  const label = document.createElement('label');
  label.className = `${CLASS_NAME} btn btn-sm tooltipped tooltipped-w`;
  label.setAttribute('aria-label', 'Toggle unbiased-github');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', onChange);

  const text = document.createElement('span');

  label.appendChild(input);
  label.appendChild(text);

  checkboxElements.add(input);

  return label;
}

export default function createToggleFeaturesCheckbox(
  initialIsEnabled,
  toggleFeatures
) {
  if (initialIsEnabled) {
    toggleFeatures();
  }

  function handleChangeCheckbox(e) {
    const checked = e.target.checked;

    checkboxElements.forEach(input => {
      input.checked = checked;
    });

    toggleFeatures();
  }

  const stickyCheckbox = createCheckbox({
    onChange: handleChangeCheckbox,
    checked: initialIsEnabled,
  });
  const topCheckbox = createCheckbox({
    onChange: handleChangeCheckbox,
    checked: initialIsEnabled,
  });

  const stickyHeader = document.querySelector(STICKY_HEADER_SELECTOR);
  stickyHeader.appendChild(stickyCheckbox);

  const topHeader = document.querySelector(TOP_HEADER_SELECTOR);
  topHeader.prepend(topCheckbox);

  return () => {
    checkboxElements.clear();
    stickyHeader.removeChild(stickyCheckbox);
    topHeader.removeChild(topCheckbox);
  };
}
