const listeners = new Set();
let observer = null;

function createObserver() {
  const observer = new MutationObserver(handler);

  function handler([mutation]) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if ('querySelectorAll' in node) {
          listeners.forEach(([selector, callback]) => {
            const elements = node.querySelectorAll(selector);
            elements.forEach(
              element => console.log('added', element) || callback(element)
            );
          });
        }
      });
    } else if (mutation.type === 'attributes') {
      listeners.forEach(([selector, callback]) => {
        if (mutation.target.matches(selector)) {
          console.log('attr', mutation.target) || callback(mutation.target);
        }
      });
    }
  }

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
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
