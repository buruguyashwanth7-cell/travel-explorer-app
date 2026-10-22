import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const LoginModal = () => {
  const {
    isLoginModalVisible,
    setIsLoginModalVisible,
    authMode,
    setAuthMode,
    dismissAuthModal,
    sendOtp,
    verifyOtp,
    generatedOtp,
    isEmailRegistered,
    isLoggedIn,
  } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = () => {
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    // If in Login mode, verify that an account already exists!
    if (authMode === 'login') {
      const exists = isEmailRegistered(email);
      if (!exists) {
        setErrorMessage(
          'No existing account found with this email. Please create an account first!'
        );
        setAuthMode('signup');
        return;
      }
    }
    if (authMode === 'signup' && name.trim() === '') {
      setErrorMessage('Please enter your full name to create an account.');
      return;
    }
    setErrorMessage('');
    sendOtp(email);
    setStep(2);
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      setErrorMessage('Please enter the 4-digit code.');
      return;
    }
    const result = await verifyOtp(otp, name, authMode);
    if (!result?.success) {
      setErrorMessage('Invalid verification code. Try again or enter 1234.');
    } else {
      setStep(1);
      setOtp('');
      setEmail('');
      setName('');
    }
  };

  const handleAutoFill = () => {
    if (generatedOtp) {
      setOtp(generatedOtp);
    } else {
      setOtp('1234');
    }
  };

  return (
    <Modal
      visible={isLoginModalVisible}
      transparent
      animationType="fade"
      onRequestClose={dismissAuthModal}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          {/* Close Button only if user is already logged in */}
          {isLoggedIn && (
            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: theme.backgroundLight }]}
              onPress={dismissAuthModal}
            >
              <Ionicons name="close" size={20} color={theme.textHeading} />
            </TouchableOpacity>
          )}

          {/* Mode Tabs: Create Account vs Sign In */}
          {step === 1 && (
            <View
              style={[
                styles.tabSwitch,
                { backgroundColor: theme.backgroundLight },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.tabSwitchBtn,
                  authMode === 'signup' && {
                    backgroundColor: theme.primary,
                  },
                ]}
                onPress={() => {
                  setAuthMode('signup');
                  setErrorMessage('');
                }}
              >
                <Text
                  style={[
                    styles.tabSwitchText,
                    {
                      color:
                        authMode === 'signup' ? '#FFFFFF' : theme.textBody,
                    },
                  ]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabSwitchBtn,
                  authMode === 'login' && {
                    backgroundColor: theme.primary,
                  },
                ]}
                onPress={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                }}
              >
                <Text
                  style={[
                    styles.tabSwitchText,
                    {
                      color:
                        authMode === 'login' ? '#FFFFFF' : theme.textBody,
                    },
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Header */}
          <View style={styles.headerBox}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons
                name={
                  step === 2
                    ? 'keypad-outline'
                    : authMode === 'signup'
                    ? 'person-add-outline'
                    : 'log-in-outline'
                }
                size={26}
                color={theme.primary}
              />
            </View>
            <Text style={[styles.title, { color: theme.textHeading }]}>
              {step === 2
                ? 'Enter Email OTP'
                : authMode === 'signup'
                ? 'Join Travel Explorer'
                : 'Welcome Back'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>
              {step === 2
                ? `A 4-digit code was sent to ${email}`
                : authMode === 'signup'
                ? 'Please create an account to access Travel Explorer'
                : 'Sign in to access your saved vacations & settings'}
            </Text>
          </View>

          {errorMessage !== '' && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color="#D32F2F" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {step === 1 ? (
            <View style={styles.formContainer}>
              {authMode === 'signup' && (
                <View>
                  <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
                    Full Name
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.backgroundLight,
                        borderColor: theme.cardBorder,
                        color: theme.textHeading,
                      },
                    ]}
                    placeholder="e.g. Yashwanth Sai"
                    placeholderTextColor={theme.textMuted}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              )}

              <View>
                <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
                  Email Address
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.backgroundLight,
                      borderColor: theme.cardBorder,
                      color: theme.textHeading,
                    },
                  ]}
                  placeholder="name@example.com"
                  placeholderTextColor={theme.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
                onPress={handleSendOtp}
              >
                <Text style={styles.primaryBtnText}>
                  {authMode === 'signup'
                    ? 'Send Verification OTP'
                    : 'Sign In via OTP'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Mode Switch Link */}
              <TouchableOpacity
                style={styles.switchModeLink}
                onPress={() => {
                  setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                  setErrorMessage('');
                }}
              >
                <Text style={[styles.switchModeText, { color: theme.textBody }]}>
                  {authMode === 'signup'
                    ? 'Already have an account? '
                    : "Don't have an account yet? "}
                  <Text style={{ color: theme.primary, fontWeight: '700' }}>
                    {authMode === 'signup' ? 'Sign In' : 'Create One First'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
                4-Digit Verification OTP
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.otpInput,
                  {
                    backgroundColor: theme.backgroundLight,
                    borderColor: theme.cardBorder,
                    color: theme.textHeading,
                  },
                ]}
                placeholder="• • • •"
                placeholderTextColor={theme.textMuted}
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
              />

              <TouchableOpacity
                style={styles.autoFillHint}
                onPress={handleAutoFill}
              >
                <Ionicons
                  name="flash-outline"
                  size={14}
                  color={theme.primary}
                />
                <Text
                  style={[styles.autoFillText, { color: theme.primary }]}
                >
                  Auto-fill demo OTP ({generatedOtp || '1234'})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
                onPress={handleVerify}
              >
                <Text style={styles.primaryBtnText}>Verify & Proceed</Text>
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resendBtn}
                onPress={() => setStep(1)}
              >
                <Text style={[styles.resendText, { color: theme.textMuted }]}>
                  ← Change Email or Name
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 32,
    borderWidth: 1,
    padding: 24,
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      },
      default: {
        elevation: 8,
      },
    }),
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  tabSwitch: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  tabSwitchBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  tabSwitchText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    gap: 8,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  formContainer: {
    gap: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  otpInput: {
    fontSize: 22,
    letterSpacing: 12,
    textAlign: 'center',
    fontWeight: '800',
  },
  autoFillHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  autoFillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 18,
    gap: 8,
    marginTop: 6,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
      default: {
        elevation: 4,
      },
    }),
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  switchModeLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchModeText: {
    fontSize: 13,
  },
  resendBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  resendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
