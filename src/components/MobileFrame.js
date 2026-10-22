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
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const MobileFrame = ({ children }) => {
  const { width } = useWindowDimensions();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { notificationMessage } = useAuth();
  const { theme, isDarkMode } = useTheme();

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
      <View
        style={[styles.nativeContainer, { backgroundColor: theme.background }]}
      >
        {/* In-app Toast Banner */}
        {notificationMessage && (
          <View
            style={[styles.toastBanner, { backgroundColor: theme.primaryDark }]}
          >
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
    <View
      style={[
        styles.desktopOuterContainer,
        {
          backgroundColor: isDarkMode ? '#110713' : '#F3E5E8',
        },
      ]}
    >
      {/* Top Banner */}
      <View style={styles.desktopHeader}>
        <View style={styles.desktopHeaderLeft}>
          <Text style={[styles.appNameBadge, { color: theme.primary }]}>
            WANDERLUST INDIA
          </Text>
          <Text style={[styles.appTitle, { color: theme.textHeading }]}>
            Travel Explorer App
          </Text>
        </View>

        <View style={styles.desktopHeaderRight}>
          <TouchableOpacity
            style={[
              styles.fullscreenToggle,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={() => setIsFullscreen(true)}
          >
            <Ionicons name="expand-outline" size={16} color={theme.primary} />
            <Text style={[styles.toggleText, { color: theme.primary }]}>
              Full Screen
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Realistic Mobile Device Mockup */}
      <View style={styles.phoneChassis}>
        {/* Phone Dynamic Island */}
        <View style={styles.dynamicIsland}>
          <View style={styles.cameraLens} />
          <View style={styles.speakerGrill} />
        </View>

        {/* Real-time Live Status Bar */}
        <View style={styles.mockStatusBar}>
          <Text style={[styles.mockTime, { color: theme.textHeading }]}>
            {currentTime}
          </Text>
          <View style={styles.mockStatusIcons}>
            <Ionicons name="cellular" size={12} color={theme.textHeading} />
            <Ionicons name="wifi" size={12} color={theme.textHeading} />
            <Ionicons name="battery-full" size={14} color={theme.textHeading} />
          </View>
        </View>

        {/* Toast Notification Banner */}
        {notificationMessage && (
          <View
            style={[
              styles.phoneToastBanner,
              { backgroundColor: theme.primaryDark },
            ]}
          >
            <Ionicons name="notifications" size={14} color="#FFFFFF" />
            <Text style={styles.phoneToastText} numberOfLines={2}>
              {notificationMessage}
            </Text>
          </View>
        )}

        {/* Screen Content Container */}
        <View
          style={[
            styles.phoneScreen,
            { backgroundColor: theme.background },
          ]}
        >
          {children}
        </View>

        {/* Bottom Home Indicator Bar */}
        <View
          style={[
            styles.homeIndicatorContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <View
            style={[
              styles.homeIndicator,
              {
                backgroundColor: isDarkMode ? '#FFFFFF' : '#4E364F',
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
    height: '100%',
  },
  desktopOuterContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  desktopHeaderRight: {
    flexDirection: 'row',
  },
  fullscreenToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mobileExitFullscreenBtn: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 9999,
    backgroundColor: 'rgba(34, 18, 35, 0.85)',
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
    backgroundColor: '#1E1220',
    borderRadius: 50,
    padding: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.35,
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
    backgroundColor: '#0D050F',
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
    backgroundColor: '#1C111E',
  },
  speakerGrill: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2D1F2F',
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 99999,
    shadowColor: '#000',
    shadowOpacity: 0.25,
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
    borderRadius: 40,
    overflow: 'hidden',
    paddingTop: 36,
  },
  homeIndicatorContainer: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  homeIndicator: {
    width: 134,
    height: 4,
    borderRadius: 2,
    opacity: 0.5,
  },
});
