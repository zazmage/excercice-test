import { getCurrentUser, logoutUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const adminBtn = document.getElementById('admin-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (adminBtn) adminBtn.style.display = '';
    if (logoutBtn) {
      logoutBtn.style.display = '';
      logoutBtn.addEventListener('click', () => {
        logoutUser();
      });
    }
  } else {
    if (loginBtn) loginBtn.style.display = '';
    if (registerBtn) registerBtn.style.display = '';
    if (adminBtn) adminBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
});
