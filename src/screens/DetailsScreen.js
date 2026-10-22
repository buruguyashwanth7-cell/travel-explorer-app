import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useWishlist } from '../context/WishlistContext';
import { AttractionCard } from '../components/AttractionCard';

export const DetailsScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorited = isInWishlist(destination.id);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image Container with Back & Wishlist Controls */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Floating Navigation Buttons */}
          <View style={styles.floatingTopBar}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.circleButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.circleButton}
              onPress={() => toggleWishlist(destination)}
            >
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={20}
                color={favorited ? colors.heart : colors.textHeading}
              />
            </TouchableOpacity>
          </View>

          {/* Category Tag pill on image */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{destination.category}</Text>
          </View>
        </View>

        {/* Content Card with soft rounded top */}
        <View style={styles.detailsCard}>
          {/* Title & Tagline */}
          <Text style={styles.destinationTitle}>{destination.name}</Text>
          <Text style={styles.destinationTagline}>{destination.subtitle}</Text>

          {/* Location & Rating Row */}
          <View style={styles.metaRow}>
            <View style={styles.locationContainer}>
              <Ionicons name="location-sharp" size={15} color={colors.primary} />
              <Text style={styles.locationText}>{destination.location}</Text>
            </View>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={colors.star} />
              <Text style={styles.ratingValue}>{destination.rating}</Text>
              <Text style={styles.reviewCount}>({destination.reviews})</Text>
            </View>
          </View>

          {/* Stage 2 Requirement: Best Time to Visit Card */}
          <View style={styles.highlightCard}>
            <View style={styles.highlightIconBox}>
              <Ionicons name="calendar" size={22} color={colors.primary} />
            </View>
            <View style={styles.highlightTextBox}>
              <Text style={styles.highlightLabel}>Best Time to Visit</Text>
              <Text style={styles.highlightValue}>
                {destination.bestTimeToVisit}
              </Text>
            </View>
          </View>

          {/* Destination Description */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>About Destination</Text>
            <Text style={styles.descriptionText}>
              {destination.fullDescription}
            </Text>
          </View>

          {/* Stage 2 Requirement: 2-3 Popular Attractions */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Popular Attractions</Text>
              <Text style={styles.attractionCount}>
                {destination.attractions.length} Must-Visits
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.attractionsScroll}
            >
              {destination.attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Sticky Action Bar */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.wishlistActionButton,
            favorited ? styles.wishlistActionActive : styles.wishlistActionInactive,
          ]}
          onPress={() => toggleWishlist(destination)}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={18}
            color="#FFFFFF"
            style={styles.actionBtnIcon}
          />
          <Text style={styles.actionBtnText}>
            {favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 310,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  floatingTopBar: {
    position: 'absolute',
    top: 16,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    backgroundColor: 'rgba(54, 33, 55, 0.82)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  detailsCard: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -20,
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  destinationTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  destinationTagline: {
    fontSize: 14,
    color: colors.primaryMuted,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0D5DD',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.textBody,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: '#F3DEE3',
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textHeading,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textMuted,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F2D7DD',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  highlightIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FDEEF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  highlightTextBox: {
    flex: 1,
  },
  highlightLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  highlightValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textHeading,
    marginTop: 2,
  },
  sectionBlock: {
    marginBottom: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 8,
  },
  attractionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textBody,
  },
  attractionsScroll: {
    paddingVertical: 6,
    paddingRight: 16,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 236, 236, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0D6DC',
  },
  wishlistActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 28,
    gap: 10,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  wishlistActionActive: {
    backgroundColor: colors.secondary,
  },
  wishlistActionInactive: {
    backgroundColor: colors.primary,
  },
  actionBtnIcon: {
    marginRight: 4,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
