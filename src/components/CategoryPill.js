import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const categoryIcons = {
  All: 'sparkles-outline',
  Beaches: 'umbrella-outline',
  Mountains: 'trail-sign-outline',
  Heritage: 'business-outline',
  Adventure: 'compass-outline',
  'Religious & Spiritual': 'flower-outline',
  Wildlife: 'paw-outline',
  Spiritual: 'flower-outline',
};

export const CategoryPill = ({ title, isSelected, onPress }) => {
  const { theme } = useTheme();
  const iconName = categoryIcons[title] || 'earth-outline';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.pill,
        isSelected
          ? {
              backgroundColor: theme.primary,
              borderColor: theme.primaryDark,
            }
          : {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
      ]}
    >
      <Ionicons
        name={iconName}
        size={15}
        color={isSelected ? '#FFFFFF' : theme.textBody}
        style={styles.icon}
      />
      <Text
        style={[
          styles.label,
          {
            color: isSelected ? '#FFFFFF' : theme.textHeading,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 22,
    marginRight: 9,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
