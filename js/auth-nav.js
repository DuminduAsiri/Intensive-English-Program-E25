/**
 * Intensive English Program E25 — Global Authentication & Dynamic Navigation
 * Manages user state, "Welcome, [User Name]" navbar display, and login session synchronization.
 */

// Allowed Admin Emails
const E25_ADMIN_EMAILS = [
  "e25eise041@eng.pdn.ac.lk",
  "e25362@eng.pdn.ac.lk",
  "e25300@eng.pdn.ac.lk",
  "e25381@eng.pdn.ac.lk",
  "e25371@eng.pdn.ac.lk",
  "admin@eng.pdn.ac.lk"
];

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA3zM_fz3snYxd11zIO-lFuRYNA-VCfvfI",
  authDomain: "intensive-english-program-e25.firebaseapp.com",
  databaseURL: "https://intensive-english-program-e25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "intensive-english-program-e25",
  storageBucket: "intensive-english-program-e25.firebasestorage.app",
  messagingSenderId: "819181152560",
  appId: "1:819181152560:web:de3bf3ad50dbd2c58cc0f5",
  measurementId: "G-05EWGZK6HJ"
};

// Helper: Escape HTML to prevent injection
function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
  }[char]));
}

// Helper: Format user display name cleanly
function formatUserName(user) {
  if (!user) return 'User';
  if (user.displayName && user.displayName.trim()) {
    return user.displayName.trim();
  }
  const cachedName = localStorage.getItem("loggedInUserName");
  if (cachedName && cachedName.trim() && cachedName !== "User") {
    return cachedName.trim();
  }
  if (user.email) {
    const parts = user.email.split('@')[0];
    return parts.charAt(0).toUpperCase() + parts.slice(1);
  }
  return 'User';
}

// Helper: Get user avatar markup (Photo or Initials)
function getUserAvatar(user, name) {
  if (user && user.photoURL) {
    return `<img src="${escapeHtml(user.photoURL)}" alt="${escapeHtml(name)}" class="user-avatar-img" />`;
  }
  const initials = (name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');
  return `<span class="user-avatar-text">${escapeHtml(initials || 'U')}</span>`;
}

// Helper: Check if an email is an Admin
function isUserAdmin(email) {
  if (!email) return false;
  return E25_ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

// Record Login Event helper (used to sync logins)
export function logUserActivity(user, method = 'Email / Password') {
  if (!user) return;
  const name = formatUserName(user);
  const email = (user.email || '').toLowerCase().trim();
  const isAdmin = isUserAdmin(email);
  const now = new Date();

  const logRecord = {
    id: 'login-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    uid: user.uid || 'anon',
    displayName: name,
    email: email || 'No Email',
    photoURL: user.photoURL || null,
    role: isAdmin ? 'Admin' : 'Student',
    method: method,
    device: /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    timestamp: Date.now(),
    loginTimeIso: now.toISOString(),
    loginTimeFormatted: now.toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  };

  // 1. Store in localStorage
  try {
    let localLogins = JSON.parse(localStorage.getItem('e25_user_logins') || '[]');
    // Prepend new record
    localLogins.unshift(logRecord);
    // Keep last 250 logins
    if (localLogins.length > 250) localLogins = localLogins.slice(0, 250);
    localStorage.setItem('e25_user_logins', JSON.stringify(localLogins));
  } catch (err) {
    console.warn('Could not save login log to localStorage:', err);
  }

  // 2. Push to Firebase Realtime Database
  import("https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js")
    .then(({ getDatabase, ref, push }) => {
      import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js")
        .then(({ getApps, initializeApp }) => {
          const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
          const db = getDatabase(app);
          const loginsRef = ref(db, 'user_logins');
          push(loginsRef, logRecord).catch(err => {
            console.log('Firebase RTDB push note:', err.message);
          });
        });
    })
    .catch(() => {});
}

// Update UI on all pages with Welcome state
export function renderAuthHeader(user, authInstance, signOutFn) {
  const headerActionsList = document.querySelectorAll('.header-actions');
  const drawerBottoms = document.querySelectorAll('#mobileDrawer .drawer-panel > div:last-child');

  if (user) {
    const name = formatUserName(user);
    const email = user.email || '';
    const avatarHtml = getUserAvatar(user, name);
    const isAdmin = isUserAdmin(email);

    // Save to localStorage for instant reload rendering
    localStorage.setItem("loggedInUserName", name);
    localStorage.setItem("loggedInUserEmail", email);

    // Desktop Header
    headerActionsList.forEach(headerActions => {
      headerActions.innerHTML = `
        <div class="user-auth-badge" id="userAuthBadge">
          <div class="user-avatar-badge">${avatarHtml}</div>
          <div class="user-info-text">
            <span class="user-welcome-title">Welcome</span>
            <span class="user-display-name" title="${escapeHtml(name)}">${escapeHtml(name)}</span>
          </div>
          ${isAdmin ? `
            <a href="admin.html" class="btn btn-outline btn-xs admin-portal-btn" title="Go to Admin Dashboard">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Admin</span>
            </a>
          ` : ''}
          <button class="user-logout-icon-btn" id="navLogoutBtn" title="Sign out" aria-label="Sign out">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      `;

      const logoutBtn = headerActions.querySelector('#navLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          if (signOutFn && authInstance) {
            await signOutFn(authInstance);
          }
          localStorage.removeItem("loggedInUserName");
          localStorage.removeItem("loggedInUserEmail");
          window.location.href = "login.html";
        });
      }
    });

    // Mobile Drawer
    drawerBottoms.forEach(drawerDiv => {
      drawerDiv.innerHTML = `
        <div class="drawer-user-box">
          <div class="drawer-user-info-row">
            <div class="user-avatar-badge">${avatarHtml}</div>
            <div class="drawer-user-text">
              <span class="drawer-welcome-msg">Welcome</span>
              <strong class="drawer-user-name">${escapeHtml(name)}</strong>
              <small class="drawer-user-email">${escapeHtml(email)}</small>
            </div>
          </div>
          <div class="drawer-user-actions">
            ${isAdmin ? `
              <a href="admin.html" class="btn btn-outline btn-sm" style="width:100%; justify-content:center;">
                Admin Dashboard
              </a>
            ` : ''}
            <button class="btn btn-secondary btn-sm" id="drawerLogoutBtn" style="width:100%;">
              Sign Out
            </button>
          </div>
        </div>
      `;

      const drawerLogoutBtn = drawerDiv.querySelector('#drawerLogoutBtn');
      if (drawerLogoutBtn) {
        drawerLogoutBtn.addEventListener('click', async () => {
          if (signOutFn && authInstance) {
            await signOutFn(authInstance);
          }
          localStorage.removeItem("loggedInUserName");
          localStorage.removeItem("loggedInUserEmail");
          window.location.href = "login.html";
        });
      }
    });

  } else {
    // Logged Out state
    headerActionsList.forEach(headerActions => {
      headerActions.innerHTML = `<a href="login.html" class="btn btn-primary btn-sm" id="loginHeaderBtn">Login</a>`;
    });

    drawerBottoms.forEach(drawerDiv => {
      drawerDiv.innerHTML = `<a href="login.html" class="btn btn-primary btn-md" style="width:100%;">Login</a>`;
    });
  }
}

// Auto Initialize Authentication on the current page
export async function initAuthNav() {
  try {
    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js");
    const { getAuth, onAuthStateChanged, signOut } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js");

    const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
    const auth = getAuth(app);

    // Initial render from cache for immediate response
    const cachedName = localStorage.getItem("loggedInUserName");
    const cachedEmail = localStorage.getItem("loggedInUserEmail");
    if (cachedName && cachedEmail) {
      renderAuthHeader({ displayName: cachedName, email: cachedEmail }, auth, signOut);
    }

    onAuthStateChanged(auth, user => {
      renderAuthHeader(user, auth, signOut);
    });
  } catch (err) {
    console.warn("AuthNav init note:", err);
  }
}

// Auto-run if imported as a script module
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initAuthNav();
  });
}
