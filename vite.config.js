// This configuration file allows the Vite development server to accept
// requests from Netlify's live preview URLs, fixing the "Blocked request" error.
export default {
  server: {
    allowedHosts: [
      // Allow any Netlify preview URL to connect.
      '.netlify.app'
    ]
  }
};
