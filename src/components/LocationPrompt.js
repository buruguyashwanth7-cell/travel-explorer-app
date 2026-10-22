import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/colors';

const LOCATION_STORAGE_KEY = '@travel_explorer_location_permission_v1';

export const LocationPrompt = ({ visible, onClose, onPermissionGranted }) => {
  const [internalVisible, setInternalVisible] = useState(false);

  useEffect(() => {
    // Check if permission was already asked
    const checkPermission = async () => {
      try {
        const status = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
        if (status === null) {
          // Show prompt initially after 1.5 seconds for great UX
          const timer = setTimeout(() => {
            setInternalVisible(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.warn('Error reading location permission:', e);
      }
    };
    checkPermission();
  }, []);

  const handleAllow = async () => {
    await AsyncStorage.setItem(LOCATION_STORAGE_KEY, 'granted');
    setInternalVisible(false);
    if (onPermissionGranted) onPermissionGranted('Hyderabad, India');
    if (onClose) onClose();
  };

  const handleDeny = async () => {
    await AsyncStorage.setItem(LOCATION_STORAGE_KEY, 'denied');
    setInternalVisible(false);
    if (onClose) onClose();
  };

  const isModalVisible = visible !== undefined ? visible : internalVisible;

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={handleDeny}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={32} color={colors.primary} />
          </View>

          <Text style={styles.title}>Allow Location Access?</Text>
          <Text style={styles.description}>
            Travel Explorer uses your device location to suggest nearby hill stations,
            coastal getaways, live regional weather, and travel distances across India.
          </Text>

          <View style={styles.benefitBox}>
            <Ionicons name="compass-outline" size={16} color={colors.primary} />
            <Text style={styles.benefitText}>
              Find heritage & adventure spots closest to you
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.denyButton}
              onPress={handleDeny}
            >
              <Text style={styles.denyText}>Not Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.allowButton}
              onPress={handleAllow}
            >
              <Text style={styles.allowText}>Allow Access</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(38, 20, 36, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 999999,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F2DAE0',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FDEEF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1D8DF',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 16,
  },
  benefitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF1F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 8,
    marginBottom: 20,
  },
  benefitText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  denyButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 18,
    backgroundColor: '#FAF0F2',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0D5DC',
  },
  denyText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textBody,
  },
  allowButton: {
    flex: 1.3,
    paddingVertical: 13,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  allowText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
