import { PREFIX } from '../css-variables';

function createDynamicStylesheet(styleName) {
  let styleElement = document.head.querySelector(
    `.unbiased-style[data-style-name="${styleName}"]`
  );

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.className = 'unbiased-style';
    styleElement.dataset.styleName = styleName;
    document.head.appendChild(styleElement);
  }

  return {
    insertStyle: insertStyle.bind(null, styleElement),
    remove: () => {
      document.head.removeChild(styleElement);
    },
  };
}

function insertStyle(
  styleElement,
  selector,
  style,
  { includePrefix = true } = {}
) {
  const sheet = styleElement.sheet;

  const prefixedSelector = []
    .concat(selector)
    .map(s => s.trim())
    .map(s => (includePrefix ? `${PREFIX} ${s}` : s))
    .join(',');

  const rule = `${prefixedSelector.trim()}{${style.trim()}}`;

  sheet.insertRule(rule, sheet.cssRules.length);
}

export default createDynamicStylesheet;
