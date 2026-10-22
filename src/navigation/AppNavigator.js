import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { TripsScreen } from '../screens/TripsScreen';
import { WishlistScreen } from '../screens/WishlistScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'TripsTab') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'WishlistTab') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.iconWrapperActive,
              ]}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? '#FFFFFF' : colors.navIconInactive}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="SearchTab" component={SearchScreen} />
      <Tab.Screen name="TripsTab" component={TripsScreen} />
      <Tab.Screen name="WishlistTab" component={WishlistScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: colors.navDockBg,
    borderRadius: 36,
    height: 64,
    borderTopWidth: 0,
    paddingHorizontal: 6,
    // Multi-layer drop shadow for floating dock
    shadowColor: '#1F0B1E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 10,
  },
  tabBarItem: {
    height: 64,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: colors.navPillActive,
  },
});
