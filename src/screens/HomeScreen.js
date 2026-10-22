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
import { colors } from '../constants/colors';
import { destinationsData, categories } from '../constants/destinationsData';
import { CategoryPill } from '../components/CategoryPill';
import { DestinationCard } from '../components/DestinationCard';
import { LocationPrompt } from '../components/LocationPrompt';
import { useAuth } from '../context/AuthContext';

export const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLocation, setUserLocation] = useState('Hyderabad, India');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const { user, setIsLoginModalVisible } = useAuth();

  const filteredDestinations =
    selectedCategory === 'All'
      ? destinationsData
      : destinationsData.filter((item) => item.category === selectedCategory);

  const featuredDestinations = destinationsData.filter((item) => item.featured);

  return (
    <View style={styles.container}>
      {/* Location Access Permission Prompt */}
      <LocationPrompt
        visible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onPermissionGranted={(loc) => setUserLocation(loc)}
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
              style={styles.locationSelector}
              onPress={() => setIsLocationModalOpen(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="location-sharp" size={14} color={colors.primary} />
              <Text style={styles.locationCityText}>{userLocation}</Text>
              <Ionicons name="chevron-down" size={13} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.mainHeading}>Incredible India</Text>
          </View>

          {/* User Profile / Sign In Quick Button */}
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => {
              if (user) {
                navigation.navigate('ProfileTab');
              } else {
                setIsLoginModalVisible(true);
              }
            }}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarMini} />
            ) : (
              <Ionicons name="person" size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Live Search Shortcut */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.searchBar}
          onPress={() => navigation.navigate('SearchTab')}
        >
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.primary}
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholder}>
            Search beaches, mountain retreats, temples & safari...
          </Text>
          <View style={styles.filterChip}>
            <Ionicons name="options-outline" size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Hero Wonder Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroCardContent}>
            <View style={styles.heroTagBadge}>
              <Text style={styles.heroTagText}>CURATED WONDER</Text>
            </View>
            <Text style={styles.heroTitle}>Discover Jaipur</Text>
            <Text style={styles.heroSubtitle}>
              Pink sandstone palaces, royal hilltop forts and living Rajput splendor.
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.heroButton}
              onPress={() => {
                const jaipur = destinationsData.find((d) => d.name === 'Jaipur');
                if (jaipur) navigation.navigate('Details', { destination: jaipur });
              }}
            >
              <Text style={styles.heroButtonText}>Explore Wonder</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Explore Categories Horizontal Filter */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
            <Text style={styles.sectionAction}>View All ({categories.length})</Text>
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
              <Text style={styles.sectionTitle}>Featured Getaways</Text>
              <Text style={styles.sectionBadge}>
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
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All'
              ? 'All Travel Destinations'
              : `${selectedCategory} Getaways`}
          </Text>
          <Text style={styles.sectionBadge}>
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
    backgroundColor: colors.background,
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
    backgroundColor: '#FDEEF1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 5,
    borderWidth: 1,
    borderColor: '#F1D8DF',
    marginBottom: 4,
  },
  locationCityText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textHeading,
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F1DCE0',
    shadowColor: colors.shadowColor,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0DCE0',
    shadowColor: colors.shadowColor,
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
    color: colors.textMuted,
    fontWeight: '500',
  },
  filterChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FCEEF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBanner: {
    backgroundColor: '#FAF0F2',
    borderRadius: 28,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#F1D7DE',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  heroCardContent: {
    flexDirection: 'column',
  },
  heroTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3D8DE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  heroTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textBody,
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignSelf: 'flex-start',
    gap: 8,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
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
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionBadge: {
    fontSize: 12,
    color: colors.textMuted,
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
