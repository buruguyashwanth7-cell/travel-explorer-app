import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { MobileFrame } from './src/components/MobileFrame';
import { LoginModal } from './src/components/LoginModal';
import { colors } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AuthProvider>
        <WishlistProvider>
          <MobileFrame>
            <StatusBar style="dark" backgroundColor={colors.background} />
            <AppNavigator />
            <LoginModal />
          </MobileFrame>
        </WishlistProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.background,
  },
});
