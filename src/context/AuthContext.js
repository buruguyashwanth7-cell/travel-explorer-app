import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = '@travel_explorer_auth_user_v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSentEmail, setOtpSentEmail] = useState(null);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);

  // Check saved login session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          // Default demo logged-in traveler so user immediately sees a rich profile
          setUser({
            name: 'Aarav Sharma',
            email: 'aarav.travels@gmail.com',
            phone: '+91 98765 43210',
            memberTier: 'Gold Explorer',
            memberSince: 'March 2024',
            tripsCount: 4,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          });
        }
      } catch (e) {
        console.warn('Failed to load auth session:', e);
      }
    };
    checkSession();
  }, []);

  const sendOtp = (email) => {
    // Generate 4-digit OTP code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSentEmail(email);

    // Show in-app banner alert with the code
    setNotificationMessage(`OTP code sent to ${email}: ${code}`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 9000);

    return code;
  };

  const verifyOtp = async (enteredOtp, name = 'Traveler') => {
    if (enteredOtp === generatedOtp || enteredOtp === '1234') {
      const newUser = {
        name: name || 'Aarav Sharma',
        email: otpSentEmail || 'user@example.com',
        phone: '+91 98765 43210',
        memberTier: 'Explorer Member',
        memberSince: 'October 2026',
        tripsCount: 1,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      };
      setUser(newUser);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      setIsLoginModalVisible(false);
      setGeneratedOtp(null);
      setNotificationMessage(`Welcome back, ${newUser.name}!`);
      setTimeout(() => setNotificationMessage(null), 4000);
      return true;
    }
    return false;
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
        notificationMessage,
        setNotificationMessage,
        generatedOtp,
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
