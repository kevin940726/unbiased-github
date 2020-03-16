import getUserLoginName from '../../utils/get-user-login-name';
import createDynamicStylesheet from '../../utils/create-dynamic-stylesheet';
import { TRANSPARENT_IMAGE, SEE_NO_EVIL_IMAGE } from '../../css-variables';
import './content.css';

export default function hideAvatars() {
  const userLoginName = getUserLoginName();

  const stylesheet = createDynamicStylesheet('hide-avatars');

  document.body.style.setProperty(
    '--avatar-content',
    `url(${SEE_NO_EVIL_IMAGE})`
  );

  // Don't hide your own profile pictures
  stylesheet.insertStyle(
    [`img[alt="${userLoginName}"]`, `img[alt="@${userLoginName}"]`],
    `content: none !important;`
  );

  return () => {
    stylesheet.remove();
    document.body.style.setProperty('--avatar-content', TRANSPARENT_IMAGE);
  };
}
