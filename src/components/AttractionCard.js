import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../constants/colors';

export const AttractionCard = ({ attraction }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: attraction.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{attraction.tag}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {attraction.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {attraction.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#F3DEE3',
    shadowColor: colors.shadowColor,
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
    backgroundColor: '#FDF0F3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textHeading,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textBody,
  },
});
