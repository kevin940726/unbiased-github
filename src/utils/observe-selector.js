const listeners = new Set();
let observer = null;

function createObserver() {
  const observer = new MutationObserver(handler);

  function handler([mutation]) {
    [...mutation.addedNodes, mutation.target].forEach(node => {
      if ('matches' in node) {
        listeners.forEach(([selector, callback]) => {
          if (node.matches(selector)) {
            callback(mutation.target);
          }
        });
      }

      if ('querySelectorAll' in node) {
        listeners.forEach(([selector, callback]) => {
          const elements = node.querySelectorAll(selector);
          elements.forEach(element => callback(element));
        });
      }
    });
  }

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  });

  return observer;
}

function observe(selector, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => callback(element));

  const listener = [selector, callback];

  listeners.add(listener);

  if (!observer) {
    observer = createObserver();
  }

  return () => {
    listeners.delete(listener);

    if (!listeners.size && observer) {
      observer.disconnect();
      observer = null;
    }
  };
}

export default observe;
