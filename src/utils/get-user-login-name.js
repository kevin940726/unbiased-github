let userLoginName;

// Get the login user name (yourself)
const userLoginMeta = document.head.querySelector('meta[name="user-login"]');

if (userLoginMeta) {
  userLoginName = userLoginMeta.getAttribute('content');
}

export default function getUserLoginName() {
  return userLoginName;
}
