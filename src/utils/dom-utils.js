export function observe(selector, callback) {
  const observer = new MutationObserver(handler);

  function handler([mutation]) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if ('querySelectorAll' in node) {
          const elements = node.querySelectorAll(selector);
          elements.forEach(element => callback(element));
        }
      });
    } else if (mutation.type === 'attributes') {
      if (mutation.target.matches(selector)) {
        callback(mutation.target);
      }
    }
  }

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  const elements = document.querySelectorAll(selector);
  elements.forEach(element => callback(element));

  return () => {
    observer.disconnect();
  };
}

export function insertDynamicStyle(style) {
  let styleElement = document.getElementById('unbiased-style');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'unbiased-style';
    document.head.appendChild(styleElement);
  }

  styleElement.sheet.insertRule(style.trim(), styleElement.sheet.rules.length);
}
