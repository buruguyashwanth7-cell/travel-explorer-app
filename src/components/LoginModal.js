import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export const LoginModal = () => {
  const {
    isLoginModalVisible,
    setIsLoginModalVisible,
    sendOtp,
    verifyOtp,
    generatedOtp,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = () => {
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    sendOtp(email);
    setStep(2);
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      setErrorMessage('Please enter the 4-digit verification code.');
      return;
    }
    const success = await verifyOtp(otp, name);
    if (!success) {
      setErrorMessage('Invalid OTP code. Please try again or use 1234.');
    } else {
      setStep(1);
      setOtp('');
      setEmail('');
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
      onRequestClose={() => setIsLoginModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setIsLoginModalVisible(false)}
          >
            <Ionicons name="close" size={20} color={colors.textHeading} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerBox}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={step === 1 ? 'mail-outline' : 'shield-checkmark-outline'}
                size={26}
                color={colors.primary}
              />
            </View>
            <Text style={styles.title}>
              {step === 1 ? 'Sign In / Register' : 'Enter Email OTP'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 1
                ? 'Enter your email to receive a secure one-time verification code'
                : `We sent a 4-digit code to ${email}`}
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
              <Text style={styles.inputLabel}>Full Name (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Aarav Sharma"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleSendOtp}
              >
                <Text style={styles.primaryBtnText}>Send Verification Code</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>4-Digit OTP Code</Text>
              <TextInput
                style={[styles.input, styles.otpInput]}
                placeholder="• • • •"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
              />

              {/* Quick Auto-fill helper */}
              {generatedOtp && (
                <TouchableOpacity
                  style={styles.autoFillBtn}
                  onPress={handleAutoFill}
                >
                  <Ionicons name="flash-outline" size={14} color={colors.primary} />
                  <Text style={styles.autoFillText}>
                    Auto-fill Code: {generatedOtp}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleVerify}
              >
                <Text style={styles.primaryBtnText}>Verify & Continue</Text>
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryLink}
                onPress={() => setStep(1)}
              >
                <Text style={styles.secondaryLinkText}>Change Email Address</Text>
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
    backgroundColor: 'rgba(34, 18, 33, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 99999,
  },
  modalContent: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 26,
    borderWidth: 1,
    borderColor: '#F0D4DC',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
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
    backgroundColor: '#FCEEF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FDEEF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0D4DC',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEDED',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
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
    color: colors.textHeading,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FAF2F4',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: colors.textHeading,
    borderWidth: 1,
    borderColor: '#EED6DC',
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 10,
  },
  autoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF1F3',
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#F1D9DE',
  },
  autoFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 20,
    gap: 8,
    marginTop: 6,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  secondaryLinkText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
});
