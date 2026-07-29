import axios from 'axios';

// Configure explicit backend API instance to ensure requests hit Render backend
const BACKEND_URL = 'https://ccms-backend-p5rm.onrender.com';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const RESET_TOKEN_KEY = 'ccms_reset_token';
const RESET_EMAIL_KEY = 'ccms_reset_email';

export const saveResetSession = (email, resetToken = null) => {
  try {
    sessionStorage.setItem(RESET_EMAIL_KEY, email);
    if (resetToken) {
      sessionStorage.setItem(RESET_TOKEN_KEY, resetToken);
    }
  } catch (err) {
    console.error('Failed to save reset session:', err);
  }
};

export const getResetEmail = () => {
  try {
    return sessionStorage.getItem(RESET_EMAIL_KEY) || '';
  } catch (err) {
    return '';
  }
};

export const getResetToken = () => {
  try {
    return sessionStorage.getItem(RESET_TOKEN_KEY) || '';
  } catch (err) {
    return '';
  }
};

export const clearResetSession = () => {
  try {
    sessionStorage.removeItem(RESET_TOKEN_KEY);
    sessionStorage.removeItem(RESET_EMAIL_KEY);
  } catch (err) {
    console.error('Failed to clear reset session:', err);
  }
};

// 1. Verify Register Number + Email to obtain Reset Token
export const verifyAccountForResetApi = async ({ rollNumber, email }) => {
  try {
    const response = await api.post('/api/auth/forgot-password', { rollNumber, email });
    if (response.data.success && response.data.resetToken) {
      saveResetSession(email, response.data.resetToken);
      return {
        success: true,
        message: response.data.message || 'Account verified successfully!',
        resetToken: response.data.resetToken,
      };
    }
    return {
      success: false,
      message: response.data.message || 'Verification failed. Please check your details.',
    };
  } catch (error) {
    const message = error.response?.data?.message || 'Invalid Register Number or Registered Email. No matching account found.';
    return {
      success: false,
      message,
    };
  }
};

// Legacy fallback helper mapping sendOTPApi to 2-field verification if called
export const sendOTPApi = async (email) => {
  return verifyAccountForResetApi({ rollNumber: '', email });
};

// 2. Reset Password with Reset Token
export const resetPasswordApi = async (newPassword) => {
  const resetToken = getResetToken();
  if (!resetToken) {
    return {
      success: false,
      message: 'Unauthorized access. Please verify your Register Number and Email first.',
    };
  }

  try {
    const response = await api.post('/api/auth/reset-password', {
      resetToken,
      newPassword,
    });

    clearResetSession();
    return {
      success: true,
      message: response.data.message || 'Your password has been updated successfully.',
    };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update password. Please try again.';
    return {
      success: false,
      message,
    };
  }
};

// Helper: Mask email for privacy (e.g. k****@college.edu)
export const maskEmail = (email) => {
  if (!email || !email.includes('@')) return email;
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user[0]}*@${domain}`;
  }
  return `${user[0]}${'*'.repeat(user.length - 2)}${user[user.length - 1]}@${domain}`;
};
