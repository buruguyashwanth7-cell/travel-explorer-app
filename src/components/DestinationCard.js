import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

export const DestinationCard = ({
  destination,
  onPress,
  horizontal = false,
}) => {
  const { theme } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorited = isInWishlist(destination.id);

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[
        styles.card,
        horizontal ? styles.horizontalCard : styles.verticalCard,
        {
          backgroundColor: theme.cardSurface,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      {/* Destination Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.image }}
          style={horizontal ? styles.horizontalImage : styles.verticalImage}
          resizeMode="cover"
        />

        {/* Category Pill Tag Overlay */}
        <View style={styles.tagBadge}>
          <Text style={styles.tagBadgeText}>{destination.category}</Text>
        </View>

        {/* Wishlist Heart Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation?.();
            toggleWishlist(destination);
          }}
          style={styles.heartButton}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={18}
            color={favorited ? theme.heart : '#FFFFFF'}
          />
        </TouchableOpacity>

        {/* Rating Floating Chip */}
        <View style={styles.ratingChip}>
          <Ionicons name="star" size={13} color={theme.star} />
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
      </View>

      {/* Destination Card Body */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, { color: theme.textHeading }]}
            numberOfLines={1}
          >
            {destination.name}
          </Text>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={13} color={theme.primary} />
          <Text
            style={[styles.locationText, { color: theme.textMuted }]}
            numberOfLines={1}
          >
            {destination.location}
          </Text>
        </View>

        <Text
          style={[styles.description, { color: theme.textBody }]}
          numberOfLines={2}
        >
          {destination.shortDescription}
        </Text>

        {/* Footer with Best Time & Arrow */}
        <View
          style={[styles.cardFooter, { borderTopColor: theme.cardBorder }]}
        >
          <View
            style={[styles.seasonBadge, { backgroundColor: theme.primaryLight }]}
          >
            <Ionicons name="calendar-outline" size={11} color={theme.primary} />
            <Text
              style={[styles.seasonText, { color: theme.primary }]}
              numberOfLines={1}
            >
              {destination.bestTimeToVisit.split('&')[0].trim()}
            </Text>
          </View>

          <View style={[styles.arrowCircle, { backgroundColor: theme.primary }]}>
            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  verticalCard: {
    marginBottom: 16,
    width: '100%',
  },
  horizontalCard: {
    width: 260,
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  verticalImage: {
    width: '100%',
    height: 180,
  },
  horizontalImage: {
    width: '100%',
    height: 160,
  },
  tagBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(34, 18, 35, 0.78)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(25, 12, 26, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingChip: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2F1B2F',
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  seasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 5,
    maxWidth: '75%',
  },
  seasonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
