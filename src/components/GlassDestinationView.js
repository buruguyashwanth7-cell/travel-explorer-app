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

export const GlassDestinationView = ({
  destination,
  placeTheme,
  weatherData,
  isWeatherLoading,
  favorited,
  toggleWishlist,
  handleAddToJourneys,
  handleOpenGoogleMaps,
  navigation,
  viewMode = 'glass',
  setViewMode,
}) => {
  return (
    <View style={styles.container}>
      {/* Full-bleed Immersive Background Photo */}
      <Image
        source={{ uri: destination.image }}
        style={styles.heroBackground}
        resizeMode="cover"
      />

      {/* Dark Vignette Overlay for High-Contrast Glass UI */}
      <View style={styles.darkVignette} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Floating Glass Navigation Bar with View Mode Switcher */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.glassCircleBtn, { borderColor: placeTheme.glassBorder }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Interface Mode Switcher Pill */}
          <View style={[styles.modeSwitcherPill, { borderColor: placeTheme.glassBorder }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.modeTab,
                viewMode === 'glass' && [
                  styles.modeTabActive,
                  { backgroundColor: placeTheme.secondaryAccent },
                ],
              ]}
              onPress={() => setViewMode && setViewMode('glass')}
            >
              <Ionicons
                name="sparkles"
                size={11}
                color={viewMode === 'glass' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
              />
              <Text
                style={[
                  styles.modeTabText,
                  viewMode === 'glass' && styles.modeTabTextActive,
                ]}
              >
                Glass HUD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.modeTab,
                viewMode === 'classic' && [
                  styles.modeTabActive,
                  { backgroundColor: placeTheme.primaryAccent },
                ],
              ]}
              onPress={() => setViewMode && setViewMode('classic')}
            >
              <Ionicons
                name="reader-outline"
                size={11}
                color={viewMode === 'classic' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
              />
              <Text
                style={[
                  styles.modeTabText,
                  viewMode === 'classic' && styles.modeTabTextActive,
                ]}
              >
                Classic
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.glassCircleBtn,
              { borderColor: placeTheme.glassBorder },
            ]}
            onPress={() => toggleWishlist(destination)}
          >
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={20}
              color={favorited ? '#FF4D6D' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        {/* Large Editorial Headline (Concept Beijing Style) */}
        <View style={styles.headlineSection}>
          <Text style={[styles.exploreKicker, { color: placeTheme.secondaryAccent }]}>
            EXPLORE
          </Text>
          <Text style={styles.heroTitle}>{destination.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={15} color={placeTheme.secondaryAccent} />
            <Text style={styles.locationText}>{destination.location}</Text>
          </View>
          <Text style={styles.heroSubtitle}>
            {destination.tagline || destination.subtitle}
          </Text>
        </View>

        {/* Floating Widgets Grid: Weather & Explore Map (Image 1 Right Column) */}
        <View style={styles.widgetsRow}>
          {/* Weather Frosted Card */}
          <View
            style={[
              styles.glassWidgetCard,
              {
                backgroundColor: placeTheme.glassBg,
                borderColor: placeTheme.glassBorder,
              },
            ]}
          >
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetLabel}>Weather</Text>
              <Ionicons
                name="arrow-forward"
                size={14}
                color={placeTheme.secondaryAccent}
              />
            </View>

            <View style={styles.weatherBody}>
              <Ionicons
                name={weatherData?.iconName || 'sunny'}
                size={32}
                color={placeTheme.secondaryAccent}
              />
              <View style={styles.weatherNumbers}>
                <Text style={styles.weatherTempText}>
                  {weatherData?.temperature || 24}°C
                </Text>
                <Text style={styles.weatherConditionText}>
                  {weatherData?.condition || 'Clear Sky'}
                </Text>
                <Text style={styles.weatherFeelsLike}>
                  Feels like {weatherData?.temperature || 24}°C
                </Text>
              </View>
            </View>
          </View>

          {/* Explore Map Frosted Card */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleOpenGoogleMaps}
            style={[
              styles.glassWidgetCard,
              {
                backgroundColor: placeTheme.glassBg,
                borderColor: placeTheme.glassBorder,
              },
            ]}
          >
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetLabel}>Explore Map</Text>
              <Ionicons
                name="arrow-forward"
                size={14}
                color={placeTheme.secondaryAccent}
              />
            </View>

            {/* Stylized Mini Map with glowing route */}
            <View style={styles.miniMapGraphic}>
              <View style={styles.mapGridLines} />
              {/* Route line */}
              <View style={styles.routePathContainer}>
                <View
                  style={[
                    styles.routeStartDot,
                    { backgroundColor: placeTheme.primaryAccent },
                  ]}
                />
                <View
                  style={[
                    styles.routeTrailLine,
                    { borderColor: placeTheme.secondaryAccent },
                  ]}
                />
                <View
                  style={[
                    styles.routeEndPin,
                    { backgroundColor: placeTheme.secondaryAccent },
                  ]}
                >
                  <Ionicons name="location" size={13} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.mapTouchHint}>Tap for Google Maps</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Top Experiences Frosted Card (Image 1 Left Main Card) */}
        <View
          style={[
            styles.experiencesGlassCard,
            {
              backgroundColor: placeTheme.glassBg,
              borderColor: placeTheme.glassBorder,
            },
          ]}
        >
          <View style={styles.experiencesHeader}>
            <Text style={styles.experiencesTitle}>Top Experiences</Text>
            <TouchableOpacity onPress={handleOpenGoogleMaps}>
              <Text
                style={[
                  styles.viewAllText,
                  { color: placeTheme.secondaryAccent },
                ]}
              >
                View all ({destination.attractions?.length || 3})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Attraction items */}
          {destination.attractions?.map((attraction, idx) => (
            <View
              key={attraction.id || idx}
              style={[
                styles.attractionItemRow,
                idx > 0 && styles.attractionItemBorder,
              ]}
            >
              <Image
                source={{ uri: attraction.image }}
                style={styles.attractionThumb}
                resizeMode="cover"
              />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName} numberOfLines={1}>
                  {attraction.name}
                </Text>
                <Text style={styles.attractionTag} numberOfLines={1}>
                  {attraction.tag}
                </Text>
                <View style={styles.attractionRatingRow}>
                  <Text style={styles.attractionRatingText}>
                    {destination.rating || 4.8}
                  </Text>
                  <Ionicons name="star" size={12} color="#FBBF24" />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Extra Bottom Padding for Floating Action Bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Floating Frosted Glass Action Dock (Replicating Image 1 Bottom Row) */}
      <View
        style={[
          styles.bottomGlassDock,
          {
            backgroundColor: placeTheme.glassBg,
            borderColor: placeTheme.glassBorder,
          },
        ]}
      >
        {/* Stays Pill */}
        <TouchableOpacity
          style={styles.dockStatBtn}
          activeOpacity={0.7}
          onPress={handleOpenGoogleMaps}
        >
          <Ionicons name="bed-outline" size={18} color="#FFFFFF" />
          <View>
            <Text style={styles.dockStatTitle}>Hotels</Text>
            <Text style={styles.dockStatSub}>{placeTheme.staysCount}</Text>
          </View>
        </TouchableOpacity>

        {/* Dining Pill */}
        <TouchableOpacity
          style={styles.dockStatBtn}
          activeOpacity={0.7}
          onPress={handleOpenGoogleMaps}
        >
          <Ionicons name="restaurant-outline" size={18} color="#FFFFFF" />
          <View>
            <Text style={styles.dockStatTitle}>Dining</Text>
            <Text style={styles.dockStatSub}>{placeTheme.diningCount}</Text>
          </View>
        </TouchableOpacity>

        {/* Glowing Themed "Plan Your Trip ➔" Button */}
        <TouchableOpacity
          style={[
            styles.glowingPlanBtn,
            {
              backgroundColor: placeTheme.secondaryAccent,
              shadowColor: placeTheme.glowColor,
            },
          ]}
          activeOpacity={0.85}
          onPress={() => handleAddToJourneys('Planning')}
        >
          <Text style={styles.glowingPlanBtnText}>Plan Trip</Text>
          <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Wishlist Quick Toggle */}
        <TouchableOpacity
          style={styles.dockStatBtn}
          activeOpacity={0.7}
          onPress={() => toggleWishlist(destination)}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={18}
            color={favorited ? '#FF4D6D' : '#FFFFFF'}
          />
          <View>
            <Text style={styles.dockStatTitle}>
              {favorited ? 'Saved' : 'Save'}
            </Text>
            <Text style={styles.dockStatSub}>
              {favorited ? 'In List' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  darkVignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 15, 26, 0.72)',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  glassCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { backdropFilter: 'blur(16px)' },
    }),
  },
  modeSwitcherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    gap: 3,
  },
  modeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  modeTabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  modeTabText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* Headline Section */
  headlineSection: {
    marginBottom: 20,
  },
  exploreKicker: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
    lineHeight: 44,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: '90%',
  },

  /* Widgets Row */
  widgetsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  glassWidgetCard: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    minHeight: 120,
    justifyContent: 'space-between',
    ...Platform.select({
      web: { backdropFilter: 'blur(20px)' },
    }),
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  widgetLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  weatherBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weatherNumbers: {
    flex: 1,
  },
  weatherTempText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  weatherConditionText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '500',
  },
  weatherFeelsLike: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 9,
    marginTop: 2,
  },

  /* Mini Map Graphic */
  miniMapGraphic: {
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGridLines: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  routePathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  routeStartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeTrailLine: {
    flex: 1,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    marginHorizontal: 4,
  },
  routeEndPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTouchHint: {
    position: 'absolute',
    bottom: 3,
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  /* Top Experiences Glass Card */
  experiencesGlassCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    ...Platform.select({
      web: { backdropFilter: 'blur(20px)' },
    }),
  },
  experiencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  experiencesTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
  },
  attractionItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  attractionItemBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  attractionThumb: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  attractionInfo: {
    flex: 1,
  },
  attractionName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  attractionTag: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 11,
    marginBottom: 4,
  },
  attractionRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attractionRatingText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '700',
  },

  /* Floating Bottom Glass Dock (Image 1 Bottom Row) */
  bottomGlassDock: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      web: { backdropFilter: 'blur(24px)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
      },
    }),
  },
  dockStatBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    gap: 2,
  },
  dockStatTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  dockStatSub: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 8,
    textAlign: 'center',
  },
  glowingPlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    gap: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  glowingPlanBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
