import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useTrips } from '../context/TripsContext';
import { useAuth } from '../context/AuthContext';
import { AttractionCard } from '../components/AttractionCard';
import { fetchLiveWeather } from '../services/weatherService';
import { getDestinationTheme } from '../constants/destinationThemes';
import { GlassDestinationView } from '../components/GlassDestinationView';
import { ClayDestinationView } from '../components/ClayDestinationView';

export const DetailsScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const { theme } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addTrip, trips } = useTrips();
  const { setNotificationMessage } = useAuth();

  const favorited = isInWishlist(destination.id);

  // Place-specific dynamic theme (Concept Beijing & Cairo interfaces)
  const placeTheme = getDestinationTheme(destination);
  const [viewMode, setViewMode] = useState('glass'); // 'glass' | 'clay' | 'classic'

  // Live Weather State (Extension Challenge #2)
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  // Check if destination is already in journeys
  const existingTrip = trips.find(
    (t) => t.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  useEffect(() => {
    let isMounted = true;
    const loadWeather = async () => {
      setIsWeatherLoading(true);
      const data = await fetchLiveWeather(
        destination.latitude || 15.2993,
        destination.longitude || 74.124,
        destination.category
      );
      if (isMounted) {
        setWeatherData(data);
        setIsWeatherLoading(false);
      }
    };
    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [destination]);

  // Google Maps Integration (Extension Challenge #3)
  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${destination.name}, ${destination.location}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch((err) =>
      console.warn('Failed to open Google Maps:', err)
    );
  };

  // Add to My Journeys feature
  const handleAddToJourneys = (status = 'Planning') => {
    addTrip({
      destination: `${destination.name} Vacation`,
      location: destination.location,
      dates: destination.bestTimeToVisit.split('&')[0].trim() + ' 2026',
      status: status,
      resort: 'Recommended Luxury Resort',
    });
    setNotificationMessage(
      `🎉 ${destination.name} added to your journeys as ${status}!`
    );
  };

  // 1. Futuristic Glass HUD Interface (Concept Beijing Style - Image 1)
  if (viewMode === 'glass') {
    return (
      <GlassDestinationView
        destination={destination}
        placeTheme={placeTheme}
        weatherData={weatherData}
        isWeatherLoading={isWeatherLoading}
        favorited={favorited}
        toggleWishlist={toggleWishlist}
        handleAddToJourneys={handleAddToJourneys}
        handleOpenGoogleMaps={handleOpenGoogleMaps}
        navigation={navigation}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    );
  }

  // 2. Claymorphic Experience Studio (Cairo Style - Image 2)
  if (viewMode === 'clay') {
    return (
      <ClayDestinationView
        destination={destination}
        placeTheme={placeTheme}
        weatherData={weatherData}
        isWeatherLoading={isWeatherLoading}
        favorited={favorited}
        toggleWishlist={toggleWishlist}
        handleAddToJourneys={handleAddToJourneys}
        handleOpenGoogleMaps={handleOpenGoogleMaps}
        navigation={navigation}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    );
  }

  // 3. Classic Detailed Overview (with top switcher)
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

          {/* Floating Top Controls with Mode Switcher */}
          <View style={styles.floatingTopBar}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.circleButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#2F1B2F" />
            </TouchableOpacity>

            <View style={styles.classicSwitcherPill}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.classicTab,
                  viewMode === 'glass' && { backgroundColor: placeTheme.secondaryAccent },
                ]}
                onPress={() => setViewMode('glass')}
              >
                <Ionicons
                  name="sparkles"
                  size={11}
                  color={viewMode === 'glass' ? '#FFFFFF' : '#475569'}
                />
                <Text
                  style={[
                    styles.classicTabText,
                    viewMode === 'glass' && styles.classicTabTextActive,
                  ]}
                >
                  Glass HUD
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.classicTab,
                  viewMode === 'clay' && { backgroundColor: placeTheme.clayAccent },
                ]}
                onPress={() => setViewMode('clay')}
              >
                <Ionicons
                  name="cube"
                  size={11}
                  color={viewMode === 'clay' ? '#FFFFFF' : '#475569'}
                />
                <Text
                  style={[
                    styles.classicTabText,
                    viewMode === 'clay' && styles.classicTabTextActive,
                  ]}
                >
                  Clay
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.classicTab,
                  viewMode === 'classic' && { backgroundColor: theme.primary },
                ]}
                onPress={() => setViewMode('classic')}
              >
                <Ionicons
                  name="reader-outline"
                  size={11}
                  color={viewMode === 'classic' ? '#FFFFFF' : '#475569'}
                />
                <Text
                  style={[
                    styles.classicTabText,
                    viewMode === 'classic' && styles.classicTabTextActive,
                  ]}
                >
                  Classic
                </Text>
              </TouchableOpacity>
            </View>

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

          {/* LIVE WEATHER INTEGRATION (Extension Challenge #2) */}
          <View
            style={[
              styles.weatherCard,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.weatherHeaderRow}>
              <View
                style={[
                  styles.liveIndicatorPill,
                  { backgroundColor: theme.primaryLight },
                ]}
              >
                <View
                  style={[
                    styles.pulsingDot,
                    { backgroundColor: theme.primary },
                  ]}
                />
                <Text
                  style={[styles.liveIndicatorText, { color: theme.primary }]}
                >
                  LIVE WEATHER (OPEN-METEO)
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setIsWeatherLoading(true);
                  fetchLiveWeather(
                    destination.latitude,
                    destination.longitude,
                    destination.category
                  ).then((d) => {
                    setWeatherData(d);
                    setIsWeatherLoading(false);
                  });
                }}
              >
                <Ionicons name="refresh" size={16} color={theme.primary} />
              </TouchableOpacity>
            </View>

            {isWeatherLoading ? (
              <View style={styles.weatherLoadingBox}>
                <ActivityIndicator size="small" color={theme.primary} />
                <Text
                  style={[styles.weatherLoadingText, { color: theme.textMuted }]}
                >
                  Fetching live regional climate...
                </Text>
              </View>
            ) : (
              <View style={styles.weatherContentRow}>
                <View style={styles.weatherTempSection}>
                  <Ionicons
                    name={weatherData?.iconName || 'partly-sunny'}
                    size={36}
                    color={theme.primary}
                  />
                  <Text
                    style={[
                      styles.temperatureText,
                      { color: theme.textHeading },
                    ]}
                  >
                    {weatherData?.temperature}°C
                  </Text>
                </View>

                <View style={styles.weatherDetailsSection}>
                  <Text
                    style={[
                      styles.weatherConditionText,
                      { color: theme.textHeading },
                    ]}
                  >
                    {weatherData?.condition}
                  </Text>
                  <Text
                    style={[styles.weatherSubMetrics, { color: theme.textMuted }]}
                  >
                    Humidity: {weatherData?.humidity}% • Wind: {weatherData?.windSpeed} km/h
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* GOOGLE MAPS INTEGRATION (Extension Challenge #3) */}
          <TouchableOpacity
            style={[
              styles.mapsIntegrationBtn,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={handleOpenGoogleMaps}
            activeOpacity={0.88}
          >
            <View style={styles.mapsBtnLeft}>
              <View
                style={[
                  styles.mapsIconCircle,
                  { backgroundColor: '#E8F0FE' },
                ]}
              >
                <Ionicons name="map" size={18} color="#1A73E8" />
              </View>
              <View>
                <Text
                  style={[styles.mapsBtnTitle, { color: theme.textHeading }]}
                >
                  View on Google Maps
                </Text>
                <Text
                  style={[styles.mapsBtnSub, { color: theme.textMuted }]}
                >
                  Explore real satellite location, driving directions & navigation
                </Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={18} color="#1A73E8" />
          </TouchableOpacity>

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

      {/* Sticky Bottom Actions: Plan Trip + Save to Wishlist */}
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
            styles.planTripBtn,
            {
              backgroundColor: existingTrip ? '#2E8540' : theme.primary,
            },
          ]}
          onPress={() =>
            existingTrip
              ? setNotificationMessage(
                  `Already in your journeys as ${existingTrip.status}!`
                )
              : handleAddToJourneys('Planning')
          }
        >
          <Ionicons
            name={existingTrip ? 'checkmark-circle' : 'airplane'}
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.actionBtnText}>
            {existingTrip ? `In Journeys (${existingTrip.status})` : 'Plan This Journey'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.saveBtnCircle,
            {
              backgroundColor: favorited ? theme.secondary : theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={() => toggleWishlist(destination)}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={20}
            color={favorited ? theme.heart : theme.textHeading}
          />
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
  classicSwitcherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    gap: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classicTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  classicTabText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  classicTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
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
  weatherCard: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  weatherHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveIndicatorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 6,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveIndicatorText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  weatherLoadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  weatherLoadingText: {
    fontSize: 12,
  },
  weatherContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherTempSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  temperatureText: {
    fontSize: 28,
    fontWeight: '800',
  },
  weatherDetailsSection: {
    alignItems: 'flex-end',
  },
  weatherConditionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  weatherSubMetrics: {
    fontSize: 11,
    marginTop: 2,
  },
  mapsIntegrationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  mapsBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  mapsIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapsBtnTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  mapsBtnSub: {
    fontSize: 11,
    marginTop: 1,
    maxWidth: 240,
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
    flexDirection: 'row',
    gap: 12,
  },
  planTripBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 28,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
