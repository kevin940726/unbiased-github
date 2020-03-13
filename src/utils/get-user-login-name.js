// Get the login user name (yourself)
export default function getUserLoginName() {
  let userLoginName;

  const userLoginMeta = document.head.querySelector('meta[name="user-login"]');

  if (userLoginMeta) {
    userLoginName = userLoginMeta.getAttribute('content');
  }

  return userLoginName;
}
