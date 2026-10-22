import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export const MobileFrame = ({ children }) => {
  const { width } = useWindowDimensions();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { notificationMessage } = useAuth();

  // Real-time live clock ticking every second
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isDesktopWeb = Platform.OS === 'web' && width > 640 && !isFullscreen;

  if (!isDesktopWeb) {
    return (
      <View style={styles.nativeContainer}>
        {/* In-app Toast Banner */}
        {notificationMessage && (
          <View style={styles.toastBanner}>
            <Ionicons name="notifications" size={16} color="#FFFFFF" />
            <Text style={styles.toastText}>{notificationMessage}</Text>
          </View>
        )}

        {Platform.OS === 'web' && (
          <TouchableOpacity
            style={styles.mobileExitFullscreenBtn}
            onPress={() => setIsFullscreen(false)}
          >
            <Ionicons name="contract-outline" size={16} color="#FFFFFF" />
            <Text style={styles.fullscreenBtnText}>Frame View</Text>
          </TouchableOpacity>
        )}
        {children}
      </View>
    );
  }

  return (
    <View style={styles.desktopOuterContainer}>
      {/* Top Banner for Traveler App */}
      <View style={styles.desktopHeader}>
        <View style={styles.desktopHeaderLeft}>
          <Text style={styles.appNameBadge}>WANDERLUST INDIA</Text>
          <Text style={styles.appTitle}>Travel Explorer Mobile App</Text>
        </View>

        <View style={styles.desktopHeaderRight}>
          <TouchableOpacity
            style={styles.fullscreenToggle}
            onPress={() => setIsFullscreen(true)}
          >
            <Ionicons name="expand-outline" size={16} color={colors.primary} />
            <Text style={styles.toggleText}>Full Screen</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Realistic Mobile Device Mockup */}
      <View style={styles.phoneChassis}>
        {/* Phone Speaker & Dynamic Island */}
        <View style={styles.dynamicIsland}>
          <View style={styles.cameraLens} />
          <View style={styles.speakerGrill} />
        </View>

        {/* Real-time Live Status Bar */}
        <View style={styles.mockStatusBar}>
          <Text style={styles.mockTime}>{currentTime}</Text>
          <View style={styles.mockStatusIcons}>
            <Ionicons name="cellular" size={12} color={colors.textHeading} />
            <Ionicons name="wifi" size={12} color={colors.textHeading} />
            <Ionicons name="battery-full" size={14} color={colors.textHeading} />
          </View>
        </View>

        {/* Toast Notification Banner inside Mobile Screen */}
        {notificationMessage && (
          <View style={styles.phoneToastBanner}>
            <Ionicons name="notifications" size={14} color="#FFFFFF" />
            <Text style={styles.phoneToastText} numberOfLines={2}>
              {notificationMessage}
            </Text>
          </View>
        )}

        {/* Screen Content Container */}
        <View style={styles.phoneScreen}>{children}</View>

        {/* Bottom Home Indicator Bar */}
        <View style={styles.homeIndicatorContainer}>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.background,
  },
  desktopOuterContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F3E5E8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  desktopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 420,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  desktopHeaderLeft: {
    flexDirection: 'column',
  },
  appNameBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  desktopHeaderRight: {
    flexDirection: 'row',
  },
  fullscreenToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  mobileExitFullscreenBtn: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 9999,
    backgroundColor: 'rgba(54, 33, 55, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  fullscreenBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  toastBanner: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: colors.primaryDark,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 99999,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  phoneChassis: {
    width: 414,
    height: 852,
    backgroundColor: '#261C26',
    borderRadius: 50,
    padding: 11,
    shadowColor: '#2B1225',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.28,
    shadowRadius: 36,
    elevation: 20,
    position: 'relative',
  },
  dynamicIsland: {
    position: 'absolute',
    top: 18,
    left: '50%',
    transform: [{ translateX: -48 }],
    width: 96,
    height: 24,
    backgroundColor: '#150E16',
    borderRadius: 16,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cameraLens: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E1929',
  },
  speakerGrill: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2D2838',
  },
  mockStatusBar: {
    position: 'absolute',
    top: 20,
    left: 28,
    right: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 998,
  },
  mockTime: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textHeading,
    letterSpacing: 0.4,
  },
  mockStatusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  phoneToastBanner: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: colors.primaryDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 99999,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  phoneToastText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 40,
    overflow: 'hidden',
    paddingTop: 36,
  },
  homeIndicatorContainer: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  homeIndicator: {
    width: 134,
    height: 4,
    backgroundColor: colors.textMuted,
    borderRadius: 2,
    opacity: 0.6,
  },
});
