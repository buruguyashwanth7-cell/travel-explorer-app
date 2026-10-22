import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WishlistProvider } from './src/context/WishlistContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { MobileFrame } from './src/components/MobileFrame';
import { colors } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <WishlistProvider>
        <MobileFrame>
          <StatusBar style="dark" backgroundColor={colors.background} />
          <AppNavigator />
        </MobileFrame>
      </WishlistProvider>
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
