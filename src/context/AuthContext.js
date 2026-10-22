import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = '@travel_explorer_auth_user_v2';
const HAS_SEEN_AUTH_KEY = '@travel_explorer_has_seen_auth_v2';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSentEmail, setOtpSentEmail] = useState(null);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          // Check if first launch
          const hasSeen = await AsyncStorage.getItem(HAS_SEEN_AUTH_KEY);
          if (!hasSeen) {
            // First time opening app: Prompt Create Account immediately as requested
            setIsLoginModalVisible(true);
            setAuthMode('signup');
          }
        }
      } catch (e) {
        console.warn('Failed to load auth session:', e);
      } finally {
        setIsAuthLoaded(true);
      }
    };
    checkSession();
  }, []);

  const sendOtp = (email) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSentEmail(email);

    setNotificationMessage(`OTP code sent to ${email}: ${code}`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 10000);

    return code;
  };

  const verifyOtp = async (enteredOtp, name = '') => {
    if (enteredOtp === generatedOtp || enteredOtp === '1234') {
      const newUser = {
        name: name || (authMode === 'signup' ? 'Traveler' : 'Aarav Sharma'),
        email: otpSentEmail || 'traveler@example.com',
        phone: '+91 98765 43210',
        memberTier: 'Gold Explorer',
        memberSince: 'October 2026',
        tripsCount: 4,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      };
      setUser(newUser);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      await AsyncStorage.setItem(HAS_SEEN_AUTH_KEY, 'true');
      setIsLoginModalVisible(false);
      setGeneratedOtp(null);
      setNotificationMessage(
        authMode === 'signup'
          ? `Account created successfully! Welcome, ${newUser.name}.`
          : `Welcome back, ${newUser.name}!`
      );
      setTimeout(() => setNotificationMessage(null), 5000);
      return true;
    }
    return false;
  };

  const dismissAuthModal = async () => {
    await AsyncStorage.setItem(HAS_SEEN_AUTH_KEY, 'true');
    setIsLoginModalVisible(false);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setNotificationMessage('You have been logged out.');
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        sendOtp,
        verifyOtp,
        logout,
        isLoginModalVisible,
        setIsLoginModalVisible,
        authMode,
        setAuthMode,
        dismissAuthModal,
        notificationMessage,
        setNotificationMessage,
        generatedOtp,
        isAuthLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
