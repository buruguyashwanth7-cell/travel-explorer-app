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

export const ClayDestinationView = ({
  destination,
  placeTheme,
  weatherData,
  isWeatherLoading,
  favorited,
  toggleWishlist,
  handleAddToJourneys,
  handleOpenGoogleMaps,
  navigation,
  viewMode = 'clay',
  setViewMode,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: placeTheme.claySheetBg }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Claymorphic Header Row (Image 2 Right Screen) with View Mode Switcher */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.clayCircleBtn, { backgroundColor: '#FFFFFF' }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color={placeTheme.clayAccent} />
          </TouchableOpacity>

          {/* Interface Mode Switcher Pill */}
          <View style={styles.modeSwitcherPill}>
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
                color={viewMode === 'glass' ? '#FFFFFF' : '#64748B'}
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
                viewMode === 'clay' && [
                  styles.modeTabActive,
                  { backgroundColor: placeTheme.clayAccent },
                ],
              ]}
              onPress={() => setViewMode && setViewMode('clay')}
            >
              <Ionicons
                name="cube"
                size={11}
                color={viewMode === 'clay' ? '#FFFFFF' : '#64748B'}
              />
              <Text
                style={[
                  styles.modeTabText,
                  viewMode === 'clay' && styles.modeTabTextActive,
                ]}
              >
                Clay
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
                color={viewMode === 'classic' ? '#FFFFFF' : '#64748B'}
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
            style={[styles.clayCircleBtn, { backgroundColor: '#FFFFFF' }]}
            onPress={() => toggleWishlist(destination)}
          >
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={20}
              color={favorited ? '#E11D48' : placeTheme.clayAccent}
            />
          </TouchableOpacity>
        </View>

        {/* Editorial Title Section */}
        <View style={styles.titleSection}>
          <Text style={[styles.exploreSerifTitle, { color: placeTheme.clayAccent }]}>
            Explore {destination.name}
          </Text>
          <Text style={styles.exploreSerifSub}>
            Where history & beauty meet every moment.
          </Text>
        </View>

        {/* Scenic Destination Hero Image Card */}
        <View style={styles.heroCardContainer}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlayPill}>
            <Ionicons name="location-sharp" size={13} color="#FFFFFF" />
            <Text style={styles.heroLocationText}>{destination.location}</Text>
          </View>
        </View>

        {/* Claymorphic Bottom Sheet Card (Image 2: "Your Experience") */}
        <View style={[styles.claySheetCard, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[styles.claySheetTitle, { color: placeTheme.clayAccent }]}>
            Your {destination.name} Experience
          </Text>
          <Text style={styles.claySheetSub}>
            Curated wonders, vibrant culture & timeless memories.
          </Text>

          {/* 3 Claymorphic Experience Square Tiles (Image 2 Bottom Grid) */}
          <View style={styles.clayTilesRow}>
            {placeTheme.curatedExperiences.map((exp, index) => (
              <TouchableOpacity
                key={exp.id || index}
                style={[
                  styles.clayTileBox,
                  { backgroundColor: exp.iconBg, borderColor: exp.color + '40' },
                ]}
                activeOpacity={0.85}
                onPress={() => handleAddToJourneys(exp.title)}
              >
                <View
                  style={[
                    styles.clayTileIconCircle,
                    { backgroundColor: '#FFFFFF' },
                  ]}
                >
                  <Ionicons name={exp.icon} size={22} color={exp.color} />
                </View>
                <Text
                  style={[styles.clayTileTitle, { color: exp.color }]}
                  numberOfLines={1}
                >
                  {exp.title}
                </Text>
                <Text style={styles.clayTileSub} numberOfLines={1}>
                  {exp.subtitle.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Wide Claymorphic "✨ Start Exploring" Button + More Options */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.startExploringBtn,
                { backgroundColor: placeTheme.clayAccent },
              ]}
              activeOpacity={0.88}
              onPress={handleOpenGoogleMaps}
            >
              <Ionicons name="sparkles" size={18} color="#FFFFFF" />
              <Text style={styles.startExploringBtnText}>Start Exploring</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.moreOptionsCircleBtn,
                { backgroundColor: placeTheme.clayHeaderBg },
              ]}
              activeOpacity={0.8}
              onPress={() => handleAddToJourneys('Planning')}
            >
              <Ionicons
                name="calendar-outline"
                size={18}
                color={placeTheme.clayAccent}
              />
            </TouchableOpacity>
          </View>

          {/* Embedded Live Climate & Quick Metrics */}
          <View
            style={[
              styles.metricsBox,
              { backgroundColor: placeTheme.claySheetBg },
            ]}
          >
            <View style={styles.metricItem}>
              <Ionicons
                name={weatherData?.iconName || 'partly-sunny'}
                size={20}
                color={placeTheme.clayAccent}
              />
              <View>
                <Text style={[styles.metricVal, { color: placeTheme.clayAccent }]}>
                  {weatherData?.temperature || 26}°C
                </Text>
                <Text style={styles.metricLbl}>
                  {weatherData?.condition || 'Fair Climate'}
                </Text>
              </View>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Ionicons
                name="star"
                size={18}
                color="#F59E0B"
              />
              <View>
                <Text style={[styles.metricVal, { color: placeTheme.clayAccent }]}>
                  {destination.rating || 4.8} ★
                </Text>
                <Text style={styles.metricLbl}>
                  {destination.reviews || '2.8k'} Reviews
                </Text>
              </View>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Ionicons
                name="wallet-outline"
                size={18}
                color={placeTheme.clayAccent}
              />
              <View>
                <Text style={[styles.metricVal, { color: placeTheme.clayAccent }]}>
                  {destination.budget}
                </Text>
                <Text style={styles.metricLbl}>Est. Cost</Text>
              </View>
            </View>
          </View>

          {/* Place Description */}
          <Text style={styles.aboutHeader}>About This Destination</Text>
          <Text style={styles.aboutBodyText}>
            {destination.fullDescription || destination.shortDescription}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clayCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08), inset 0px 2px 2px rgba(255, 255, 255, 0.8)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  modeSwitcherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    gap: 3,
    ...Platform.select({
      web: {
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 3,
      },
    }),
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
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.12)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  modeTabText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* Title Section */
  titleSection: {
    marginBottom: 16,
  },
  exploreSerifTitle: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
    letterSpacing: -0.5,
  },
  exploreSerifSub: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 4,
  },

  /* Hero Card Container */
  heroCardContainer: {
    height: 220,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.12)',
      },
      default: {
        elevation: 6,
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlayPill: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    gap: 4,
  },
  heroLocationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  /* Clay Sheet Card (Image 2 style) */
  claySheetCard: {
    borderRadius: 28,
    padding: 18,
    ...Platform.select({
      web: {
        boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.08)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 6,
      },
    }),
  },
  claySheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
  },
  claySheetSub: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 18,
  },

  /* Clay Tiles Grid (Image 2: 3 square tiles) */
  clayTilesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  clayTileBox: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.06), inset 0px 3px 4px rgba(255, 255, 255, 0.8)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
  clayTileIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...Platform.select({
      web: {
        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  clayTileTitle: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  clayTileSub: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },

  /* Action Row */
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  startExploringBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 22,
    gap: 8,
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.16)',
      },
      default: {
        elevation: 5,
      },
    }),
  },
  startExploringBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  moreOptionsCircleBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.06)',
      },
    }),
  },

  /* Metrics Box */
  metricsBox: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricVal: {
    fontSize: 12,
    fontWeight: '800',
  },
  metricLbl: {
    fontSize: 9,
    color: '#64748B',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },

  /* About section */
  aboutHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  aboutBodyText: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 20,
  },
});
