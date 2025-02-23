import { getCurrentUser, logoutUser } from './auth.js';

const d = document;

d.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  const $loginBtn = d.getElementById('login-btn');
  const $registerBtn = d.getElementById('register-btn');
  const $adminBtn = d.getElementById('admin-btn');
  const $logoutBtn = d.getElementById('logout-btn');

  if (currentUser) {
    if ($loginBtn) $loginBtn.style.display = 'none';
    if ($registerBtn) $registerBtn.style.display = 'none';
    if ($adminBtn) $adminBtn.style.display = '';
    if ($logoutBtn) {
      $logoutBtn.style.display = '';
      $logoutBtn.addEventListener('click', () => {
        logoutUser();
      });
    }
  } else {
    if ($loginBtn) $loginBtn.style.display = '';
    if ($registerBtn) $registerBtn.style.display = '';
    if ($adminBtn) $adminBtn.style.display = 'none';
    if ($logoutBtn) $logoutBtn.style.display = 'none';
  }
});
