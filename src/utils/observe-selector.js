const listeners = new Set();
let observer = null;

function queryElements(selector, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => callback(element));
}

function createObserver() {
  const observer = new MutationObserver(() => {
    listeners.forEach(([selector, callback]) => {
      queryElements(selector, callback);
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  });

  return observer;
}

function observe(selector, callback) {
  queryElements(selector, callback);

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
