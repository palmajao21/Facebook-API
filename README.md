# Connecta

A modern, polished web application for Facebook authentication with a clean and intuitive user interface.

## Overview

Connecta is a single-page web application that allows users to authenticate using their Facebook accounts. The app features a dashboard-style layout with a premium UI design, smooth animations, and support for both light and dark themes.

## Features

- 🔐 **Facebook Authentication** - Secure login using Facebook JavaScript SDK
- 🎨 **Modern UI Design** - Clean, flat design with blue accent colors
- 🌓 **Dark Mode Support** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✨ **Smooth Animations** - Polished transitions and hover effects
- 👤 **Profile Display** - Shows user profile picture, name, and email after login

## Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling with CSS variables for theming
- **JavaScript** - Facebook SDK integration and UI logic
- **Facebook JavaScript SDK** - Authentication and user data retrieval

## Prerequisites

- A Facebook App ID (configured in `script.js`)
- HTTPS connection (required for Facebook SDK)
- Modern web browser with JavaScript enabled

## Setup Instructions

### 1. Facebook App Configuration

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add Facebook Login product to your app
4. Configure OAuth redirect URIs:
   - Add your domain (e.g., `https://yourdomain.com`)
   - For local development with ngrok: `https://your-ngrok-url.ngrok.io`
5. Copy your App ID

### 2. Update App ID

Open `script.js` and update the `APP_ID` constant:

```javascript
const APP_ID = 'YOUR_FACEBOOK_APP_ID';
```

### 3. Local Development with HTTPS

Since Facebook SDK requires HTTPS, use one of these options:

#### Option A: Using ngrok (Recommended for testing)

1. Start a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server -p 8000
   ```

2. Start ngrok:
   ```bash
   ngrok http 8000
   ```

3. Copy the HTTPS URL from ngrok and update your Facebook App settings

#### Option B: Using a local HTTPS server

Use tools like `mkcert` to create local SSL certificates.

### 4. Deploy

1. Upload all files to your web server
2. Ensure HTTPS is enabled
3. Update Facebook App settings with your production domain
4. Update `APP_ID` in `script.js` if using a different app for production

## File Structure

```
Connecta/
├── index.html          # Main HTML structure
├── style.css          # All styling and theme variables
├── script.js          # Facebook SDK integration and logic
└── README.md          # This file
```

## Usage

1. **Login**: Click the "Login with Facebook" button in the header
2. **Facebook Authorization**: You'll be redirected to Facebook to authorize the app
3. **Profile Display**: After successful login, your profile information will be displayed
4. **Logout**: Click the "Log out" button to disconnect from Facebook
5. **Theme Toggle**: Use the theme toggle button (🌙/☀️) to switch between light and dark modes

## Configuration

### Facebook Permissions

The app requests the following permissions:
- `public_profile` - Basic profile information
- `email` - User's email address

To modify permissions, update the `REQUIRED_PERMISSIONS` constant in `script.js`:

```javascript
const REQUIRED_PERMISSIONS = 'public_profile,email';
```

### Customization

#### Colors

Edit CSS variables in `style.css` to customize the color scheme:

```css
:root {
    --accent-primary: #2563EB;  /* Primary blue */
    --accent-light: #DBEAFE;     /* Light blue accent */
    --bg-primary: #F8FAFC;        /* Background */
    /* ... more variables */
}
```

#### Styling

All styles are contained in `style.css`. The design uses:
- CSS custom properties for theming
- Flat, modern design principles
- Smooth transitions and animations
- Responsive breakpoints for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- The app requires HTTPS for Facebook SDK to work
- User data is only stored in the browser session (not persisted)
- Logout only clears the app session, not the global Facebook session
- The app uses Facebook's official JavaScript SDK for secure authentication

## Troubleshooting

### "This app must be opened using the HTTPS ngrok URL"

- Ensure you're accessing the app via HTTPS
- If using ngrok, make sure you're using the HTTPS URL provided
- Check that your Facebook App settings include the correct redirect URI

### Login button not working

- Verify your Facebook App ID is correct in `script.js`
- Check browser console for any error messages
- Ensure Facebook SDK is loading correctly (check Network tab)
- Verify your app is not in Development Mode restrictions (if testing with non-admin accounts)

### Profile not displaying

- Check that required permissions are granted
- Verify the Facebook App has the correct permissions configured
- Check browser console for API errors

## License

This project is provided as-is for educational and development purposes.

## Support

For Facebook SDK related issues, refer to the [Facebook Developers Documentation](https://developers.facebook.com/docs/javascript).

---

**Note**: This app uses Facebook's authentication services. Make sure to comply with Facebook's Platform Policy when deploying to production.

