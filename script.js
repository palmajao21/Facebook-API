// Facebook App Configuration
const APP_ID = '1984787785406436';
const REQUIRED_PERMISSIONS = 'public_profile,email';

// DOM elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const helperText = document.getElementById('helper-text');
const statusMessage = document.getElementById('status-message');

// Suppress non-critical Facebook SDK analytics errors
// These occur when ad blockers block Facebook's analytics requests
// The SDK still works correctly, these are just telemetry failures
window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && typeof event.reason === 'object') {
    const message = event.reason.message || '';
    // Suppress Facebook SDK analytics/telemetry errors
    if (message.includes('Failed to fetch') || 
        message.includes('ERR_BLOCKED_BY_CLIENT') ||
        event.reason.name === 'TypeError') {
      event.preventDefault(); // Prevent console error
      return;
    }
  }
});

// HTTPS check (required for Facebook SDK in browsers)
if (window.location.protocol !== 'https:') {
  alert('This app must be opened using the HTTPS ngrok URL.');
}

// fbAsyncInit MUST be defined globally so the SDK can call it
window.fbAsyncInit = function () {
  FB.init({
    appId: APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v19.0'
  });

  // Check login status on load
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      fetchUserInfo();
    } else {
      // Make sure login button is visible initially
      userInfo.style.display = 'none';
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
      // Helper text visible only in logged-out state
      if (helperText) {
        helperText.style.opacity = '1';
        helperText.style.display = 'block';
      }
    }
  });
};

// Login with re-authentication to force account selection dialog
// This ensures Facebook shows "Continue as [Name]" and "Cancel" options
// even if user is already logged into Facebook, allowing account switching
loginBtn.addEventListener('click', function () {
  const btnText = loginBtn.querySelector('.btn-text');
  const originalText = btnText.textContent;
  
  // Show loading state
  loginBtn.disabled = true;
  btnText.textContent = 'Connecting...';
  
  try {
    FB.login(function (response) {
      // Reset button state
      loginBtn.disabled = false;
      btnText.textContent = originalText;
      
      if (response.authResponse) {
        // Login successful - fetch and display user info
        fetchUserInfo();
      } else {
        // User cancelled login or closed the dialog
        // UI remains on login screen, user can try again with different account
      }
    }, { 
      scope: REQUIRED_PERMISSIONS,
      auth_type: 'reauthenticate' // Force Facebook to show account selection dialog
    });
  } catch (error) {
    // Reset button state on error
    loginBtn.disabled = false;
    btnText.textContent = originalText;
    // Silently handle any SDK initialization errors
    console.warn('Login attempt failed:', error);
  }
});

// Logout - clears app session and resets UI
// Note: This only logs out from the app, not from Facebook globally
// User can log in again and will see account selection dialog due to reauthenticate
logoutBtn.addEventListener('click', function () {
  try {
    FB.logout(function (response) {
      // Clear user data from UI
      document.getElementById('user-name').textContent = '';
      document.getElementById('user-email').textContent = '';
      document.getElementById('profile-picture').src = '';
      
      // Reset UI to login state
      userInfo.style.display = 'none';
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
      // Show helper text again when logged out
      if (helperText) {
        helperText.style.display = 'block';
        helperText.style.opacity = '1';
      }
    });
  } catch (error) {
    // Silently handle any SDK errors during logout
    console.warn('Logout error:', error);
    // Still reset UI even if SDK call fails
    document.getElementById('user-name').textContent = '';
    document.getElementById('user-email').textContent = '';
    document.getElementById('profile-picture').src = '';
    userInfo.style.display = 'none';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    if (helperText) {
      helperText.style.display = 'block';
      helperText.style.opacity = '1';
    }
  }
});

// Fetch user data
function fetchUserInfo() {
  try {
    FB.api('/me', { fields: 'name,email,picture.type(large)' }, function (response) {
      if (!response || response.error) {
        console.error('Error fetching user info:', response && response.error);
        return;
      }

      document.getElementById('user-name').textContent = response.name || 'N/A';
      document.getElementById('user-email').textContent = response.email || 'Email not available';
      if (response.picture && response.picture.data && response.picture.data.url) {
        document.getElementById('profile-picture').src = response.picture.data.url;
      }

      userInfo.style.display = 'block';
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
      // Hide helper text in logged-in state
      if (helperText) {
        helperText.style.opacity = '0';
        helperText.style.display = 'none';
      }
    });
  } catch (error) {
    console.error('Error in fetchUserInfo:', error);
  }
}

