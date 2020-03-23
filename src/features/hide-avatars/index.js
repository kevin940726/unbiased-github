import getUserLoginName from '../../utils/get-user-login-name';
import injectExceptionStyle from './inject-exception-style';
import './content.css';

export default function hideAvatars() {
  const userLoginName = getUserLoginName();

  // Don't hide your own profile pictures
  const stylesheet = injectExceptionStyle(userLoginName);

  return () => {
    stylesheet.remove();
  };
}
