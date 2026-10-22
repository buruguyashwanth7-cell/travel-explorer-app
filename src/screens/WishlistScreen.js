import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

export const WishlistScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textHeading }]}>
            My Saved Places
          </Text>
          <Text style={[styles.subtitle, { color: theme.textBody }]}>
            Your personal travel bucket list across India
          </Text>
        </View>

        {/* Counter Badge */}
        {wishlist.length > 0 && (
          <View style={styles.counterRow}>
            <View
              style={[
                styles.counterBadge,
                {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons name="bookmark" size={13} color={theme.primary} />
              <Text style={[styles.counterText, { color: theme.primary }]}>
                {wishlist.length} {wishlist.length === 1 ? 'place' : 'places'} saved
              </Text>
            </View>
            <Text style={[styles.hintText, { color: theme.textMuted }]}>
              Tap card for complete itinerary
            </Text>
          </View>
        )}

        {/* Wishlist Items List */}
        {wishlist.length > 0 ? (
          <View style={styles.listContainer}>
            {wishlist.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.92}
                style={[
                  styles.wishlistCard,
                  {
                    backgroundColor: theme.cardSurface,
                    borderColor: theme.cardBorder,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('Details', { destination: item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View style={styles.cardContent}>
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.tagBadge,
                        { backgroundColor: theme.primaryLight },
                      ]}
                    >
                      <Text
                        style={[styles.tagText, { color: theme.primary }]}
                      >
                        {item.category}
                      </Text>
                    </View>

                    {/* Remove Action Button */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[
                        styles.removeBtn,
                        { backgroundColor: theme.primaryLight },
                      ]}
                      onPress={(e) => {
                        e.stopPropagation?.();
                        removeFromWishlist(item.id);
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={17}
                        color={theme.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[
                      styles.destinationName,
                      { color: theme.textHeading },
                    ]}
                  >
                    {item.name}
                  </Text>

                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-sharp"
                      size={12}
                      color={theme.primary}
                    />
                    <Text
                      style={[styles.locationText, { color: theme.textMuted }]}
                    >
                      {item.location}
                    </Text>
                  </View>

                  <View style={styles.footerRow}>
                    <View style={styles.ratingBox}>
                      <Ionicons name="star" size={12} color={theme.star} />
                      <Text
                        style={[
                          styles.ratingNumber,
                          { color: theme.textHeading },
                        ]}
                      >
                        {item.rating}
                      </Text>
                    </View>
                    <View style={styles.seasonBox}>
                      <Text
                        style={[styles.seasonText, { color: theme.textBody }]}
                        numberOfLines={1}
                      >
                        Best: {item.bestTimeToVisit.split('&')[0]}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View
              style={[
                styles.emptyIconCircle,
                {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons
                name="heart-dislike-outline"
                size={46}
                color={theme.primary}
              />
            </View>
            <Text
              style={[styles.emptyTitle, { color: theme.textHeading }]}
            >
              Your Wishlist is Empty
            </Text>
            <Text
              style={[styles.emptyDescription, { color: theme.textMuted }]}
            >
              Save your dream beaches, Himalayan retreats, or holy temples by
              tapping the heart icon on any card!
            </Text>
            <TouchableOpacity
              activeOpacity={0.88}
              style={[
                styles.exploreBtn,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Ionicons name="compass-outline" size={18} color="#FFFFFF" />
              <Text style={styles.exploreBtnText}>Discover Destinations</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  counterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  hintText: {
    fontSize: 11,
  },
  listContainer: {
    gap: 14,
  },
  wishlistCard: {
    flexDirection: 'row',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: 120,
    height: 125,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  removeBtn: {
    padding: 4,
    borderRadius: 8,
  },
  destinationName: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: '700',
  },
  seasonBox: {
    maxWidth: '65%',
  },
  seasonText: {
    fontSize: 10,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  emptyDescription: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
