const listeners = new Set();
let observer = null;
const THROTTLE_TIME = 200; // ms

function throttle(callback, time = THROTTLE_TIME) {
  let lastTime = 0;

  return function() {
    if (performance.now() - lastTime > time) {
      callback.apply(this, arguments);
      lastTime = performance.now();
    }
  };
}

function queryElements(selector, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => callback(element));
}

function createObserver() {
  const observer = new MutationObserver(
    throttle(() => {
      listeners.forEach(([selector, callback]) => {
        queryElements(selector, callback);
      });
    })
  );

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
