import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { TripsProvider } from './src/context/TripsContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { MobileFrame } from './src/components/MobileFrame';
import { LoginModal } from './src/components/LoginModal';

function MainApp() {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MobileFrame>
        <StatusBar
          style={isDarkMode ? 'light' : 'dark'}
          backgroundColor={theme.background}
        />
        <AppNavigator />
        <LoginModal />
      </MobileFrame>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <TripsProvider>
              <MainApp />
            </TripsProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    height: '100%',
  },
});
