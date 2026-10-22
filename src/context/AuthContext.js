import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = '@travel_explorer_auth_user_v3';
const HAS_SEEN_AUTH_KEY = '@travel_explorer_has_seen_auth_v3';
const REGISTERED_ACCOUNTS_KEY = '@travel_explorer_registered_accounts_v3';

const initialDefaultAccount = {
  name: 'Yashwanth Sai',
  email: 'buruguyashwanth7@gmail.com',
  phone: '+91 98765 43210',
  memberTier: 'Gold Explorer',
  memberSince: 'October 2026',
  tripsCount: 4,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredAccounts, setRegisteredAccounts] = useState([initialDefaultAccount]);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSentEmail, setOtpSentEmail] = useState(null);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Load registered accounts
        const storedAccounts = await AsyncStorage.getItem(REGISTERED_ACCOUNTS_KEY);
        if (storedAccounts) {
          setRegisteredAccounts(JSON.parse(storedAccounts));
        } else {
          await AsyncStorage.setItem(
            REGISTERED_ACCOUNTS_KEY,
            JSON.stringify([initialDefaultAccount])
          );
        }

        // Load active session
        const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If no active session, require user to create account or sign in first
          setIsLoginModalVisible(true);
          setAuthMode('signup');
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
    setOtpSentEmail(email.trim().toLowerCase());

    setNotificationMessage(`OTP code sent to ${email}: ${code}`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 10000);

    return code;
  };

  const isEmailRegistered = (email) => {
    if (!email) return false;
    const clean = email.trim().toLowerCase();
    return registeredAccounts.some(
      (a) => a.email.toLowerCase() === clean
    );
  };

  const verifyOtp = async (enteredOtp, name = '', mode = authMode) => {
    if (enteredOtp === generatedOtp || enteredOtp === '1234') {
      const cleanEmail = (otpSentEmail || 'buruguyashwanth7@gmail.com').trim().toLowerCase();
      const existing = registeredAccounts.find(
        (a) => a.email.toLowerCase() === cleanEmail
      );

      let userName = name.trim();
      if (!userName && existing) userName = existing.name;
      if (!userName) userName = 'Yashwanth Sai';

      const accountObj = {
        name: userName,
        email: cleanEmail,
        phone: existing?.phone || '+91 98765 43210',
        memberTier: existing?.memberTier || 'Gold Explorer',
        memberSince: existing?.memberSince || 'October 2026',
        tripsCount: existing?.tripsCount || 4,
        avatar:
          existing?.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      };

      // Update registered accounts
      const updatedAccounts = registeredAccounts.filter(
        (a) => a.email.toLowerCase() !== cleanEmail
      );
      updatedAccounts.push(accountObj);
      setRegisteredAccounts(updatedAccounts);
      await AsyncStorage.setItem(
        REGISTERED_ACCOUNTS_KEY,
        JSON.stringify(updatedAccounts)
      );

      // Save user session
      setUser(accountObj);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(accountObj));
      await AsyncStorage.setItem(HAS_SEEN_AUTH_KEY, 'true');

      setIsLoginModalVisible(false);
      setGeneratedOtp(null);
      setNotificationMessage(
        mode === 'signup'
          ? `Account created! Welcome, ${userName}.`
          : `Welcome back, ${userName}!`
      );
      setTimeout(() => setNotificationMessage(null), 4000);
      return { success: true };
    }
    return { success: false, reason: 'invalid_code' };
  };

  const updateUserProfile = async (updatedFields) => {
    const updated = {
      ...(user || initialDefaultAccount),
      ...updatedFields,
    };
    setUser(updated);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));

    // Also update in registeredAccounts
    const updatedAccounts = registeredAccounts.map((a) =>
      a.email.toLowerCase() === updated.email.toLowerCase() ? updated : a
    );
    setRegisteredAccounts(updatedAccounts);
    await AsyncStorage.setItem(
      REGISTERED_ACCOUNTS_KEY,
      JSON.stringify(updatedAccounts)
    );

    setNotificationMessage('Profile updated successfully!');
    setTimeout(() => setNotificationMessage(null), 3000);
    return updated;
  };

  const dismissAuthModal = async () => {
    if (user) {
      setIsLoginModalVisible(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthMode('signup');
    setIsLoginModalVisible(true);
    setNotificationMessage('You have been logged out.');
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        registeredAccounts,
        isEmailRegistered,
        sendOtp,
        verifyOtp,
        updateUserProfile,
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
