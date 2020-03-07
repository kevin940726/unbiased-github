import getUserLoginName from '../utils/get-user-login-name';
import createDynamicStylesheet from '../utils/create-dynamic-stylesheet';

export default function disableHovercard() {
  const userLoginName = getUserLoginName();

  const stylesheet = createDynamicStylesheet('disable-hovercard');

  // allow hovercard on your profile pictures
  stylesheet.insertStyle(
    [`img[alt="${userLoginName}"]`, `img[alt="@${userLoginName}"]`],
    `content: none !important; pointer-events: auto !important;`
  );

  function handleMouseOver(e) {
    if (e.target && e.target.dataset.hovercardType === 'user') {
      if (userLoginName && e.target.dataset.biasedUserName === userLoginName) {
        return;
      }

      e.stopPropagation();
    }
  }

  // Disable hovercard on type of "user"
  document.addEventListener('mouseover', handleMouseOver, true);

  return () => {
    document.removeEventListener('mouseover', handleMouseOver, true);
    stylesheet.remove();
  };
}
