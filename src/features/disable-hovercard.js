import getUserLoginName from '../utils/get-user-login-name';

export default function disableHovercard() {
  const userLoginName = getUserLoginName();

  // Disable hovercard on type of "user"
  function handleMouseOver(e) {
    // Stop when itself has hovercard, or it's inside a hovercard element
    const hovercard = e.target.closest('[data-hovercard-type="user"]');

    if (hovercard) {
      if (
        userLoginName &&
        hovercard.dataset.hovercardUrl === `/users/${userLoginName}/hovercard`
      ) {
        return;
      }

      e.stopImmediatePropagation();
    }
  }

  document.addEventListener('mouseover', handleMouseOver, true);

  return () => {
    document.removeEventListener('mouseover', handleMouseOver, true);
  };
}
