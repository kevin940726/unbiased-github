export function insertDynamicStyle(
  selector,
  style,
  { includePrefix = true } = {}
) {
  let styleElement = document.getElementById('unbiased-style');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'unbiased-style';
    document.head.appendChild(styleElement);
  }

  const sheet = styleElement.sheet;
  sheet.disabled = false;

  const prefixedSelector = []
    .concat(selector)
    .map(s =>
      includePrefix
        ? `html:not([data-unbiased="disabled"]) ${s.trim()}`
        : s.trim()
    )
    .join(',');

  const rule = `${prefixedSelector.trim()}{${style.trim()}}`;

  sheet.insertRule(rule, sheet.cssRules.length);
}

export function disableDynamicStylesheet() {
  let styleElement = document.getElementById('unbiased-style');

  if (!styleElement) {
    return;
  }

  styleElement.sheet.disabled = true;
}

export default insertDynamicStyle;
