import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const categoryIcons = {
  All: 'sparkles-outline',
  Beaches: 'umbrella-outline',
  Mountains: 'trail-sign-outline',
  Heritage: 'business-outline',
  Adventure: 'compass-outline',
  Wildlife: 'paw-outline',
  Spiritual: 'flower-outline',
};

export const CategoryPill = ({ title, isSelected, onPress }) => {
  const iconName = categoryIcons[title] || 'earth-outline';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.pill,
        isSelected ? styles.pillSelected : styles.pillUnselected,
      ]}
    >
      <Ionicons
        name={iconName}
        size={16}
        color={isSelected ? '#FFFFFF' : colors.textBody}
        style={styles.icon}
      />
      <Text
        style={[
          styles.label,
          isSelected ? styles.labelSelected : styles.labelUnselected,
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    // Claymorphic soft shadow
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  pillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  pillUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F0DCE0',
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
  labelUnselected: {
    color: colors.textHeading,
  },
});
