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
import { colors } from '../constants/colors';
import { useWishlist } from '../context/WishlistContext';

export const WishlistScreen = ({ navigation }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Travel Wishlist</Text>
          <Text style={styles.subtitle}>
            Your saved dream getaways across India
          </Text>
        </View>

        {/* Counter Badge */}
        {wishlist.length > 0 && (
          <View style={styles.counterRow}>
            <View style={styles.counterBadge}>
              <Ionicons name="bookmark" size={13} color={colors.primary} />
              <Text style={styles.counterText}>
                {wishlist.length} {wishlist.length === 1 ? 'place' : 'places'} saved
              </Text>
            </View>
            <Text style={styles.hintText}>Tap card for details</Text>
          </View>
        )}

        {/* Wishlist Items List (Stage 4 Requirement) */}
        {wishlist.length > 0 ? (
          <View style={styles.listContainer}>
            {wishlist.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.92}
                style={styles.wishlistCard}
                onPress={() => navigation.navigate('Details', { destination: item })}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View style={styles.cardContent}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.tagBadge}>
                      <Text style={styles.tagText}>{item.category}</Text>
                    </View>
                    {/* Delete / Remove Action Button */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.removeBtn}
                      onPress={(e) => {
                        e.stopPropagation?.();
                        removeFromWishlist(item.id);
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.destinationName}>{item.name}</Text>
                  
                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-sharp"
                      size={12}
                      color={colors.primary}
                    />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>

                  <View style={styles.footerRow}>
                    <View style={styles.ratingBox}>
                      <Ionicons name="star" size={12} color={colors.star} />
                      <Text style={styles.ratingNumber}>{item.rating}</Text>
                    </View>
                    <View style={styles.seasonBox}>
                      <Text style={styles.seasonText} numberOfLines={1}>
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
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name="heart-dislike-outline"
                size={46}
                color={colors.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptyDescription}>
              You haven't saved any destinations yet. Explore India's beautiful
              beaches, mountains, heritage sites and adventure hubs!
            </Text>
            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.exploreBtn}
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
    backgroundColor: colors.background,
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
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: {
    fontSize: 13,
    color: colors.textBody,
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
    backgroundColor: '#FCEEF1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#F2D9DF',
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  hintText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  listContainer: {
    gap: 14,
  },
  wishlistCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3DEE3',
    shadowColor: colors.shadowColor,
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
    backgroundColor: '#FDF0F3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  removeBtn: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#FDF1F3',
  },
  destinationName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: colors.textMuted,
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
    color: colors.textHeading,
  },
  seasonBox: {
    maxWidth: '65%',
  },
  seasonText: {
    fontSize: 10,
    color: colors.textBody,
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
    backgroundColor: '#FDEEF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F0D5DC',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textHeading,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  emptyDescription: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
    shadowColor: colors.primaryDark,
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
