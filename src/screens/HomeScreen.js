import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { destinationsData, categories } from '../constants/destinationsData';
import { CategoryPill } from '../components/CategoryPill';
import { DestinationCard } from '../components/DestinationCard';
import { LocationPrompt } from '../components/LocationPrompt';
import { SmartMatcherModal } from '../components/SmartMatcherModal';

export const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user, setIsLoginModalVisible, setAuthMode } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLocation, setUserLocation] = useState('Hyderabad, India');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMatcherModalOpen, setIsMatcherModalOpen] = useState(false);

  const filteredDestinations =
    selectedCategory === 'All'
      ? destinationsData
      : destinationsData.filter((item) => item.category === selectedCategory);

  const featuredDestinations = destinationsData.filter((item) => item.featured);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Location Access Permission Prompt */}
      <LocationPrompt
        visible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onPermissionGranted={(loc) => setUserLocation(loc)}
      />

      {/* Smart Destination Matcher Modal (Extension Enhancement) */}
      <SmartMatcherModal
        visible={isMatcherModalOpen}
        onClose={() => setIsMatcherModalOpen(false)}
        onSelectDestination={(dest) =>
          navigation.navigate('Details', { destination: dest })
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top App Header with Location & Profile Avatar */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            {/* Location Selector Chip */}
            <TouchableOpacity
              style={[
                styles.locationSelector,
                {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.cardBorder,
                },
              ]}
              onPress={() => setIsLocationModalOpen(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="location-sharp" size={14} color={theme.primary} />
              <Text style={[styles.locationCityText, { color: theme.primary }]}>
                {userLocation}
              </Text>
              <Ionicons name="chevron-down" size={13} color={theme.primary} />
            </TouchableOpacity>

            <Text style={[styles.mainHeading, { color: theme.textHeading }]}>
              Incredible India
            </Text>
          </View>

          {/* User Profile / Sign In Quick Button */}
          <TouchableOpacity
            style={[
              styles.avatarButton,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={() => {
              if (user) {
                navigation.navigate('ProfileTab');
              } else {
                setAuthMode('login');
                setIsLoginModalVisible(true);
              }
            }}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarMini} />
            ) : (
              <Ionicons name="person" size={20} color={theme.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Live Search Shortcut */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={() => navigation.navigate('SearchTab')}
        >
          <Ionicons
            name="search-outline"
            size={18}
            color={theme.primary}
            style={styles.searchIcon}
          />
          <Text style={[styles.searchPlaceholder, { color: theme.textMuted }]}>
            Search beaches, mountain retreats, temples & safari...
          </Text>
          <View
            style={[styles.filterChip, { backgroundColor: theme.primaryLight }]}
          >
            <Ionicons name="options-outline" size={16} color={theme.primary} />
          </View>
        </TouchableOpacity>

        {/* Smart Destination Matcher Highlight Banner */}
        <TouchableOpacity
          activeOpacity={0.92}
          style={[
            styles.matcherBanner,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={() => setIsMatcherModalOpen(true)}
        >
          <View style={styles.matcherContent}>
            <View
              style={[
                styles.matcherBadge,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <Ionicons name="sparkles" size={12} color={theme.primary} />
              <Text style={[styles.matcherBadgeText, { color: theme.primary }]}>
                RECOMMENDED ENHANCEMENT
              </Text>
            </View>

            <Text style={[styles.matcherTitle, { color: theme.textHeading }]}>
              Smart Destination Matcher
            </Text>
            <Text style={[styles.matcherSubtitle, { color: theme.textBody }]}>
              Filter by budget, trip duration, and companions (seniors, young adults, or families) for personalized recommendations!
            </Text>

            <View
              style={[
                styles.matcherActionPill,
                { backgroundColor: theme.primary },
              ]}
            >
              <Ionicons name="options" size={15} color="#FFFFFF" />
              <Text style={styles.matcherActionPillText}>
                Match My Trip Preferences
              </Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Explore Categories Horizontal Filter */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
            Explore Categories
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
            <Text style={[styles.sectionAction, { color: theme.primary }]}>
              View All ({categories.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <CategoryPill
              key={category}
              title={category}
              isSelected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Featured Destinations Carousel */}
        {selectedCategory === 'All' && (
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
                Featured Getaways
              </Text>
              <Text style={[styles.sectionBadge, { color: theme.textMuted }]}>
                {featuredDestinations.length} hand-picked
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {featuredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  horizontal={true}
                  onPress={() =>
                    navigation.navigate('Details', { destination })
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Destinations Discovery List */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
            {selectedCategory === 'All'
              ? 'All Travel Destinations'
              : `${selectedCategory} Getaways`}
          </Text>
          <Text style={[styles.sectionBadge, { color: theme.textMuted }]}>
            {filteredDestinations.length} destinations
          </Text>
        </View>

        <View style={styles.destinationsList}>
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              horizontal={false}
              onPress={() =>
                navigation.navigate('Details', { destination })
              }
            />
          ))}
        </View>
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
    paddingTop: 12,
    paddingBottom: 110,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 6,
  },
  headerLeft: {
    flex: 1,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 5,
    borderWidth: 1,
    marginBottom: 4,
  },
  locationCityText: {
    fontSize: 11,
    fontWeight: '700',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  avatarMini: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  filterChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matcherBanner: {
    borderRadius: 26,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  matcherContent: {
    flexDirection: 'column',
  },
  matcherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 8,
  },
  matcherBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  matcherTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  matcherSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  matcherActionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 20,
    gap: 8,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  matcherActionPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryScroll: {
    paddingBottom: 16,
  },
  featuredSection: {
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingBottom: 14,
  },
  destinationsList: {
    marginTop: 4,
  },
});
