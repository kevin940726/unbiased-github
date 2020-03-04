export function insertDynamicStyle(style) {
  let styleElement = document.getElementById('unbiased-style');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'unbiased-style';
    document.head.appendChild(styleElement);
  }

  styleElement.sheet.insertRule(style.trim(), styleElement.sheet.rules.length);
}
