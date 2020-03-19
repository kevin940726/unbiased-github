/**
 * Don't let Refined GitHub to show the full names
 **/

import observe from '../utils/observe-selector';

function hideRghFullName(element) {
  const insertionPoint =
    element.parentElement.tagName === 'STRONG'
      ? element.parentElement
      : element;
  const parentElement = insertionPoint.parentElement;

  // If full name has already been grouped to a <span>, just toggle it to display none
  const hiddenSpan = parentElement.querySelector('[data-rgh-hidden-full-name]');
  if (hiddenSpan) {
    hiddenSpan.style.display = 'none';
    return;
  }

  const index = Array.from(parentElement.childNodes).indexOf(insertionPoint);

  // Matches ' (<bdo>FULL_NAME</bdo>) '
  if (
    parentElement.childNodes[index + 1].textContent === ' (' &&
    parentElement.childNodes[index + 2].nodeName === 'BDO' &&
    parentElement.childNodes[index + 3].textContent === ') '
  ) {
    // Create a <span> to group them all together
    const hiddenSpan = document.createElement('span');
    // Append them one by one since they would also be removed from the original parent
    hiddenSpan.appendChild(parentElement.childNodes[index + 1]);
    hiddenSpan.appendChild(parentElement.childNodes[index + 1]);
    hiddenSpan.appendChild(parentElement.childNodes[index + 1]);

    // Hide it and attach data attribute
    hiddenSpan.style.display = 'none';
    hiddenSpan.dataset.rghHiddenFullName = true;
    insertionPoint.after(hiddenSpan);
  }
}

export default function hideRghFullNames() {
  const unobserve = observe('.rgh-fullname', hideRghFullName);

  return () => {
    unobserve();

    document
      .querySelectorAll('[data-rgh-hidden-full-name]')
      .forEach(element => {
        element.style.display = 'unset';
      });
  };
}
