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
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { AttractionCard } from '../components/AttractionCard';

export const DetailsScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const { theme } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorited = isInWishlist(destination.id);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Floating Top Controls */}
          <View style={styles.floatingTopBar}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.circleButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#2F1B2F" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.circleButton}
              onPress={() => toggleWishlist(destination)}
            >
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={20}
                color={favorited ? theme.heart : '#2F1B2F'}
              />
            </TouchableOpacity>
          </View>

          {/* Category Tag pill */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{destination.category}</Text>
          </View>
        </View>

        {/* Content Card */}
        <View
          style={[
            styles.detailsCard,
            { backgroundColor: theme.background },
          ]}
        >
          {/* Title & Tagline */}
          <Text style={[styles.destinationTitle, { color: theme.textHeading }]}>
            {destination.name}
          </Text>
          <Text style={[styles.destinationTagline, { color: theme.primary }]}>
            {destination.subtitle}
          </Text>

          {/* Location & Rating */}
          <View
            style={[
              styles.metaRow,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.locationContainer}>
              <Ionicons name="location-sharp" size={15} color={theme.primary} />
              <Text style={[styles.locationText, { color: theme.textBody }]}>
                {destination.location}
              </Text>
            </View>

            <View
              style={[
                styles.ratingBadge,
                {
                  backgroundColor: theme.cardSurface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons name="star" size={14} color={theme.star} />
              <Text
                style={[styles.ratingValue, { color: theme.textHeading }]}
              >
                {destination.rating}
              </Text>
              <Text style={[styles.reviewCount, { color: theme.textMuted }]}>
                ({destination.reviews})
              </Text>
            </View>
          </View>

          {/* Quick Metrics Cards */}
          <View style={styles.metricsRow}>
            {destination.budget && (
              <View
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: theme.cardSurface,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <Ionicons name="wallet-outline" size={16} color={theme.primary} />
                <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                  Est. Budget
                </Text>
                <Text
                  style={[styles.metricValue, { color: theme.textHeading }]}
                >
                  {destination.budget}
                </Text>
              </View>
            )}

            {destination.duration && (
              <View
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: theme.cardSurface,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <Ionicons name="time-outline" size={16} color={theme.primary} />
                <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                  Duration
                </Text>
                <Text
                  style={[styles.metricValue, { color: theme.textHeading }]}
                >
                  {destination.duration.split(' ')[0]}
                </Text>
              </View>
            )}

            {destination.pace && (
              <View
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: theme.cardSurface,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <Ionicons name="speedometer-outline" size={16} color={theme.primary} />
                <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                  Trip Pace
                </Text>
                <Text
                  style={[styles.metricValue, { color: theme.textHeading }]}
                >
                  {destination.pace}
                </Text>
              </View>
            )}
          </View>

          {/* Best Time to Visit Card */}
          <View
            style={[
              styles.highlightCard,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.highlightIconBox,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <Ionicons name="calendar" size={22} color={theme.primary} />
            </View>
            <View style={styles.highlightTextBox}>
              <Text style={[styles.highlightLabel, { color: theme.primary }]}>
                Best Time to Visit
              </Text>
              <Text
                style={[styles.highlightValue, { color: theme.textHeading }]}
              >
                {destination.bestTimeToVisit}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionHeading, { color: theme.textHeading }]}>
              About Destination
            </Text>
            <Text style={[styles.descriptionText, { color: theme.textBody }]}>
              {destination.fullDescription}
            </Text>
          </View>

          {/* Popular Attractions */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text
                style={[styles.sectionHeading, { color: theme.textHeading }]}
              >
                Popular Attractions
              </Text>
              <Text
                style={[styles.attractionCount, { color: theme.primary }]}
              >
                {destination.attractions.length} Highlights
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

      {/* Sticky Bottom Action */}
      <View
        style={[
          styles.stickyFooter,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.wishlistActionButton,
            {
              backgroundColor: favorited
                ? theme.secondary
                : theme.primary,
            },
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
            {favorited ? 'Remove from Saved' : 'Save to Wishlist'}
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
    backgroundColor: 'rgba(34, 18, 35, 0.82)',
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
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -20,
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  destinationTitle: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  destinationTagline: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    borderWidth: 1,
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  reviewCount: {
    fontSize: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  metricCard: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  highlightIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
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
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  highlightValue: {
    fontSize: 15,
    fontWeight: '700',
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
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 8,
  },
  attractionCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  wishlistActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 28,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
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
