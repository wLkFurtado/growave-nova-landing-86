
// Admin authentication utilities

// In a production environment, this would be handled more securely
// For this demo, we'll use a simple hardcoded credential
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'growave2025', // This would be stored securely in a real app
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('adminToken') !== null;
};

// Login function
export const loginAdmin = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Generate a simple token (in a real app, this would be more secure)
    const token = btoa(`${username}:${Date.now()}`);
    localStorage.setItem('adminToken', token);
    return true;
  }
  return false;
};

// Logout function
export const logoutAdmin = (): void => {
  localStorage.removeItem('adminToken');
};

// Protected route HOC (Higher-Order Component)
export const requireAuth = (nextUrl: string): string => {
  if (!isLoggedIn()) {
    return `/admin/login?redirect=${encodeURIComponent(nextUrl)}`;
  }
  return nextUrl;
};
