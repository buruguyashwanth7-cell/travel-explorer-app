import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const AttractionCard = ({ attraction }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardSurface,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <Image
        source={{ uri: attraction.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View
          style={[styles.tagBadge, { backgroundColor: theme.primaryLight }]}
        >
          <Text style={[styles.tagText, { color: theme.primary }]}>
            {attraction.tag}
          </Text>
        </View>
        <Text
          style={[styles.name, { color: theme.textHeading }]}
          numberOfLines={1}
        >
          {attraction.name}
        </Text>
        <Text
          style={[styles.description, { color: theme.textBody }]}
          numberOfLines={2}
        >
          {attraction.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 110,
  },
  content: {
    padding: 12,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    lineHeight: 15,
  },
});
