import getUserLoginName from '../utils/get-user-login-name';
import insertDynamicStyle from '../utils/insert-dynamic-style';

export default function disableHovercard() {
  const userLoginName = getUserLoginName();

  // allow hovercard on your profile pictures
  insertDynamicStyle(
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
  };
}
