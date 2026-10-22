import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { destinationsData, categories } from '../constants/destinationsData';
import { CategoryPill } from '../components/CategoryPill';
import { DestinationCard } from '../components/DestinationCard';
import { SmartMatcherModal } from '../components/SmartMatcherModal';

export const SearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMatcherModalOpen, setIsMatcherModalOpen] = useState(false);

  // Combined Search & Category Filtering
  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Smart Destination Matcher Modal */}
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textHeading }]}>
            Search & Explore
          </Text>
          <Text style={[styles.subtitle, { color: theme.textBody }]}>
            Discover beaches, hill retreats, heritage ruins, temples & wildlife
          </Text>
        </View>

        {/* Live Search Input Box */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={theme.primary}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by city, temple, beach, or state..."
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.textHeading }]}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearBtn}>
              <Ionicons
                name="close-circle"
                size={18}
                color={theme.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Smart Filter Shortcut */}
        <TouchableOpacity
          style={[
            styles.smartMatchBar,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={() => setIsMatcherModalOpen(true)}
        >
          <View style={styles.smartMatchLeft}>
            <View
              style={[
                styles.smartIconBox,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <Ionicons name="sparkles" size={16} color={theme.primary} />
            </View>
            <View>
              <Text
                style={[styles.smartMatchTitle, { color: theme.textHeading }]}
              >
                Smart Destination Matcher
              </Text>
              <Text style={[styles.smartMatchSub, { color: theme.textMuted }]}>
                Filter by budget, days & age group
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.primary} />
        </TouchableOpacity>

        {/* Category Filter Pills */}
        <View style={styles.categoryContainer}>
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
        </View>

        {/* Results Info */}
        <View style={styles.resultsInfoRow}>
          <Text style={[styles.resultsCount, { color: theme.textHeading }]}>
            {filteredDestinations.length}{' '}
            {filteredDestinations.length === 1 ? 'place' : 'places'} found
          </Text>
          {(searchQuery !== '' || selectedCategory !== 'All') && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <Text style={[styles.resetFiltersText, { color: theme.primary }]}>
                Reset Filters
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Results List */}
        {filteredDestinations.length > 0 ? (
          <View style={styles.resultsList}>
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
        ) : (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyIconBox,
                {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons
                name="compass-outline"
                size={44}
                color={theme.primary}
              />
            </View>
            <Text
              style={[styles.emptyTitle, { color: theme.textHeading }]}
            >
              No Destinations Found
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: theme.textMuted }]}
            >
              We couldn't find any destination matching "{searchQuery}". Try
              searching for Pondicherry, Tirupati, Manali, or Goa.
            </Text>
            <TouchableOpacity
              style={[
                styles.clearFiltersBtn,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.clearFiltersBtnText}>Show All Places</Text>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 2,
  },
  clearBtn: {
    padding: 4,
  },
  smartMatchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  smartMatchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  smartIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartMatchTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  smartMatchSub: {
    fontSize: 11,
    marginTop: 1,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryScroll: {
    paddingVertical: 4,
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '700',
  },
  resetFiltersText: {
    fontSize: 12,
    fontWeight: '700',
  },
  resultsList: {
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  clearFiltersBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  clearFiltersBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
