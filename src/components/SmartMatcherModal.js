import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { destinationsData, categories } from '../constants/destinationsData';

export const SmartMatcherModal = ({ visible, onClose, onSelectDestination }) => {
  const { theme } = useTheme();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedTraveler, setSelectedTraveler] = useState('All');
  const [isCalculated, setIsCalculated] = useState(false);

  const budgetOptions = [
    { label: 'All Budgets', value: 'All' },
    { label: 'Budget (₹5k - ₹15k)', value: 'Budget' },
    { label: 'Moderate (₹15k - ₹35k)', value: 'Moderate' },
    { label: 'Luxury (₹35k+)', value: 'Luxury' },
  ];

  const durationOptions = [
    { label: 'Any Duration', value: 'All' },
    { label: 'Weekend (2-3 Days)', value: 'Weekend (2-3 Days)' },
    { label: 'Week (4-7 Days)', value: 'Week (4-7 Days)' },
    { label: 'Extended (8+ Days)', value: 'Extended (8+ Days)' },
  ];

  const travelerOptions = [
    { label: 'All Groups', value: 'All' },
    { label: 'Young / Solo', value: 'Young' },
    { label: 'Adults / Couples', value: 'Adults' },
    { label: 'Families with Kids', value: 'Families' },
    { label: 'Seniors / Elders', value: 'Seniors' },
  ];

  // Smart Matching Algorithm
  const matchedResults = useMemo(() => {
    return destinationsData
      .map((item) => {
        let score = 50; // base score
        let matchReasons = [];

        // Category match
        if (selectedCategory === 'All' || item.category === selectedCategory) {
          score += 20;
          if (selectedCategory !== 'All') {
            matchReasons.push(`Matches your ${item.category} preference`);
          }
        }

        // Budget match
        if (selectedBudget === 'All' || item.budget === selectedBudget) {
          score += 15;
          if (selectedBudget !== 'All') {
            matchReasons.push(`Fits your ${item.budget} budget (${item.approxBudget})`);
          }
        }

        // Duration match
        if (selectedDuration === 'All' || item.duration === selectedDuration) {
          score += 15;
          if (selectedDuration !== 'All') {
            matchReasons.push(`Ideal for a ${item.duration}`);
          }
        }

        // Traveler / Age group match
        if (
          selectedTraveler === 'All' ||
          (item.ageGroup && item.ageGroup.includes(selectedTraveler))
        ) {
          score += 15;
          if (selectedTraveler !== 'All') {
            matchReasons.push(
              `Highly rated and comfortable for ${selectedTraveler}`
            );
          }
        }

        const matchPercent = Math.min(score, 99);
        return {
          ...item,
          matchPercent,
          matchReasons:
            matchReasons.length > 0
              ? matchReasons
              : ['Great general recommendation for your profile'],
        };
      })
      .filter((item) => {
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        return true;
      })
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedCategory, selectedBudget, selectedDuration, selectedTraveler]);

  const handleReset = () => {
    setSelectedCategory('All');
    setSelectedBudget('All');
    setSelectedDuration('All');
    setSelectedTraveler('All');
    setIsCalculated(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View
                style={[
                  styles.sparkleBadge,
                  { backgroundColor: theme.primaryLight },
                ]}
              >
                <Ionicons name="sparkles" size={14} color={theme.primary} />
                <Text style={[styles.sparkleText, { color: theme.primary }]}>
                  AI SMART MATCHER
                </Text>
              </View>
              <Text style={[styles.title, { color: theme.textHeading }]}>
                Find Your Ideal Trip
              </Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={22} color={theme.textHeading} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}
          >
            {!isCalculated ? (
              <View>
                <Text style={[styles.instruction, { color: theme.textBody }]}>
                  Choose your preferences, budget, and travel companions to
                  discover the best-suited destinations across India.
                </Text>

                {/* 1. Travel Type */}
                <Text style={[styles.filterGroupTitle, { color: theme.textHeading }]}>
                  1. Travel Category
                </Text>
                <View style={styles.chipsWrap}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.chip,
                        {
                          backgroundColor:
                            selectedCategory === cat
                              ? theme.primary
                              : theme.backgroundLight,
                          borderColor: theme.cardBorder,
                        },
                      ]}
                      onPress={() => setSelectedCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color:
                              selectedCategory === cat
                                ? '#FFFFFF'
                                : theme.textBody,
                          },
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 2. Budget */}
                <Text style={[styles.filterGroupTitle, { color: theme.textHeading }]}>
                  2. Budget Range per Person
                </Text>
                <View style={styles.chipsWrap}>
                  {budgetOptions.map((b) => (
                    <TouchableOpacity
                      key={b.value}
                      style={[
                        styles.chip,
                        {
                          backgroundColor:
                            selectedBudget === b.value
                              ? theme.primary
                              : theme.backgroundLight,
                          borderColor: theme.cardBorder,
                        },
                      ]}
                      onPress={() => setSelectedBudget(b.value)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color:
                              selectedBudget === b.value
                                ? '#FFFFFF'
                                : theme.textBody,
                          },
                        ]}
                      >
                        {b.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 3. Duration */}
                <Text style={[styles.filterGroupTitle, { color: theme.textHeading }]}>
                  3. Trip Duration
                </Text>
                <View style={styles.chipsWrap}>
                  {durationOptions.map((d) => (
                    <TouchableOpacity
                      key={d.value}
                      style={[
                        styles.chip,
                        {
                          backgroundColor:
                            selectedDuration === d.value
                              ? theme.primary
                              : theme.backgroundLight,
                          borderColor: theme.cardBorder,
                        },
                      ]}
                      onPress={() => setSelectedDuration(d.value)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color:
                              selectedDuration === d.value
                                ? '#FFFFFF'
                                : theme.textBody,
                          },
                        ]}
                      >
                        {d.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 4. Age Group / Companions */}
                <Text style={[styles.filterGroupTitle, { color: theme.textHeading }]}>
                  4. Travelers & Age Group
                </Text>
                <View style={styles.chipsWrap}>
                  {travelerOptions.map((t) => (
                    <TouchableOpacity
                      key={t.value}
                      style={[
                        styles.chip,
                        {
                          backgroundColor:
                            selectedTraveler === t.value
                              ? theme.primary
                              : theme.backgroundLight,
                          borderColor: theme.cardBorder,
                        },
                      ]}
                      onPress={() => setSelectedTraveler(t.value)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color:
                              selectedTraveler === t.value
                                ? '#FFFFFF'
                                : theme.textBody,
                          },
                        ]}
                      >
                        {t.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Action Match Button */}
                <TouchableOpacity
                  style={[styles.matchActionBtn, { backgroundColor: theme.primary }]}
                  onPress={() => setIsCalculated(true)}
                >
                  <Ionicons name="sparkles" size={18} color="#FFFFFF" />
                  <Text style={styles.matchActionText}>Find Matching Destinations</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {/* Results Header */}
                <View style={styles.resultsHeaderRow}>
                  <Text style={[styles.resultsTitle, { color: theme.textHeading }]}>
                    Top Matches For You ({matchedResults.length})
                  </Text>
                  <TouchableOpacity onPress={handleReset}>
                    <Text style={[styles.resetText, { color: theme.primary }]}>
                      Edit Filters
                    </Text>
                  </TouchableOpacity>
                </View>

                {matchedResults.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    style={[
                      styles.resultCard,
                      {
                        backgroundColor: theme.backgroundLight,
                        borderColor: theme.cardBorder,
                      },
                    ]}
                    onPress={() => {
                      onClose();
                      onSelectDestination(item);
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.resultImage}
                      resizeMode="cover"
                    />

                    {/* Match Score Badge */}
                    <View
                      style={[
                        styles.matchBadge,
                        { backgroundColor: theme.primary },
                      ]}
                    >
                      <Ionicons name="flame" size={12} color="#FFFFFF" />
                      <Text style={styles.matchBadgeText}>
                        {item.matchPercent}% Match
                      </Text>
                    </View>

                    <View style={styles.resultContent}>
                      <View style={styles.resultTopRow}>
                        <Text
                          style={[styles.resultName, { color: theme.textHeading }]}
                        >
                          {item.name}
                        </Text>
                        <View style={styles.resultCategoryChip}>
                          <Text style={styles.resultCategoryText}>
                            {item.category}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.resultMetaRow}>
                        <Ionicons
                          name="location-sharp"
                          size={12}
                          color={theme.primary}
                        />
                        <Text
                          style={[styles.resultLocation, { color: theme.textMuted }]}
                        >
                          {item.location}
                        </Text>
                      </View>

                      {/* Why it matches */}
                      <View style={styles.reasonsBox}>
                        {item.matchReasons.map((reason, idx) => (
                          <View key={idx} style={styles.reasonRow}>
                            <Ionicons
                              name="checkmark-circle"
                              size={12}
                              color="#2E8540"
                            />
                            <Text
                              style={[styles.reasonText, { color: theme.textBody }]}
                            >
                              {reason}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <View style={styles.resultFooter}>
                        <Text style={[styles.budgetText, { color: theme.primary }]}>
                          Est: {item.approxBudget}
                        </Text>
                        <View
                          style={[
                            styles.viewDetailsBtn,
                            { backgroundColor: theme.primary },
                          ]}
                        >
                          <Text style={styles.viewDetailsText}>View Plan</Text>
                          <Ionicons
                            name="arrow-forward"
                            size={12}
                            color="#FFFFFF"
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(25, 12, 26, 0.65)',
    justifyContent: 'flex-end',
    zIndex: 999999,
  },
  container: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    maxHeight: '90%',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  sparkleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  sparkleText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 16,
  },
  scrollBody: {
    paddingBottom: 20,
  },
  instruction: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  filterGroupTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 22,
    gap: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  matchActionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  resultsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  resetText: {
    fontSize: 13,
    fontWeight: '700',
  },
  resultCard: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
    position: 'relative',
  },
  resultImage: {
    width: '100%',
    height: 140,
  },
  matchBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  resultContent: {
    padding: 14,
  },
  resultTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultName: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  resultCategoryChip: {
    backgroundColor: '#FDF1F3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  resultCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A2846',
  },
  resultMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  resultLocation: {
    fontSize: 12,
  },
  reasonsBox: {
    gap: 4,
    marginBottom: 12,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reasonText: {
    fontSize: 11,
    flex: 1,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  budgetText: {
    fontSize: 12,
    fontWeight: '700',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
