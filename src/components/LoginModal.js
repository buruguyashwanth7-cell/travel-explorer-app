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
    const success = await verifyOtp(otp, name);
    if (!success) {
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
          {/* Close / Skip Button */}
          <TouchableOpacity
            style={[styles.closeBtn, { backgroundColor: theme.backgroundLight }]}
            onPress={dismissAuthModal}
          >
            <Ionicons name="close" size={20} color={theme.textHeading} />
          </TouchableOpacity>

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
                ? 'Create your traveler account to save wishlists & track trips'
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
                    placeholder="e.g. Aarav Sharma"
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
                    {authMode === 'signup' ? 'Sign In' : 'Create One'}
                  </Text>
                </Text>
              </TouchableOpacity>

              {/* Guest Explore Shortcut */}
              <TouchableOpacity
                style={styles.guestLink}
                onPress={dismissAuthModal}
              >
                <Text style={[styles.guestLinkText, { color: theme.textMuted }]}>
                  Explore App as Guest
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

              {generatedOtp && (
                <TouchableOpacity
                  style={[
                    styles.autoFillBtn,
                    {
                      backgroundColor: theme.primaryLight,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                  onPress={handleAutoFill}
                >
                  <Ionicons name="flash" size={14} color={theme.primary} />
                  <Text style={[styles.autoFillText, { color: theme.primary }]}>
                    Auto-fill Code: {generatedOtp}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
                onPress={handleVerify}
              >
                <Text style={styles.primaryBtnText}>
                  {authMode === 'signup' ? 'Complete & Register' : 'Verify & Sign In'}
                </Text>
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryLink}
                onPress={() => setStep(1)}
              >
                <Text style={[styles.secondaryLinkText, { color: theme.primary }]}>
                  Change Email or Re-enter Details
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
    backgroundColor: 'rgba(25, 12, 26, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 999999,
  },
  modalContent: {
    width: '100%',
    maxWidth: 390,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSwitch: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 4,
    marginBottom: 16,
    alignSelf: 'center',
  },
  tabSwitchBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEDED',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: '600',
  },
  formContainer: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
    marginBottom: 4,
  },
  input: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 10,
  },
  autoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
  },
  autoFillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 20,
    gap: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  switchModeLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  switchModeText: {
    fontSize: 12,
  },
  guestLink: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  guestLinkText: {
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  secondaryLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  secondaryLinkText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
