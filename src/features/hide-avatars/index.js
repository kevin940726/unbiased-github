import getUserLoginName from '../../utils/get-user-login-name';
import createDynamicStylesheet from '../../utils/create-dynamic-stylesheet';
import './content.css';

export default function hideAvatars() {
  const userLoginName = getUserLoginName();

  const stylesheet = createDynamicStylesheet('hide-avatars');

  // Don't hide your own profile pictures
  stylesheet.insertStyle(
    [`img[alt="${userLoginName}"]`, `img[alt="@${userLoginName}"]`],
    `content: none !important;`
  );

  return () => {
    stylesheet.remove();
  };
}
