import React, { useState } from 'react';
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

const userTrips = {
  upcoming: [
    {
      id: 't1',
      destination: 'Goa Coastal Escape',
      location: 'Goa, India',
      dates: '15 Nov – 20 Nov 2026',
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      guests: '2 Travelers',
      hotel: 'Taj Exotica Resort & Spa',
      bookingId: 'EXP-89210',
    },
    {
      id: 't2',
      destination: 'Jim Corbett Tiger Safari',
      location: 'Uttarakhand, India',
      dates: '05 Dec – 09 Dec 2026',
      status: 'Planning',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      guests: '4 Travelers',
      hotel: 'Dhikala Wilderness Lodge',
      bookingId: 'EXP-91402',
    },
  ],
  completed: [
    {
      id: 't3',
      destination: 'Manali Alpine Winter Trek',
      location: 'Himachal Pradesh, India',
      dates: '10 Jan – 16 Jan 2026',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      highlights: 'Solang Valley skiing & Rohtang Pass',
    },
    {
      id: 't4',
      destination: 'Jaipur Royal Forts Tour',
      location: 'Rajasthan, India',
      dates: '22 Oct – 26 Oct 2025',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      highlights: 'Hawa Mahal, Amber Fort, and Chokhi Dhani',
    },
  ],
};

export const TripsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const trips = activeTab === 'upcoming' ? userTrips.upcoming : userTrips.completed;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Travel Journeys</Text>
          <Text style={styles.subtitle}>
            Manage your booked vacations and cherish past travel memories
          </Text>
        </View>

        {/* Tab Pills */}
        <View style={styles.tabPillContainer}>
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === 'upcoming' && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Ionicons
              name="airplane-outline"
              size={15}
              color={activeTab === 'upcoming' ? '#FFFFFF' : colors.textHeading}
            />
            <Text
              style={[
                styles.tabPillText,
                activeTab === 'upcoming' && styles.tabPillTextActive,
              ]}
            >
              Upcoming ({userTrips.upcoming.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === 'completed' && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab('completed')}
          >
            <Ionicons
              name="checkmark-done-circle-outline"
              size={15}
              color={activeTab === 'completed' ? '#FFFFFF' : colors.textHeading}
            />
            <Text
              style={[
                styles.tabPillText,
                activeTab === 'completed' && styles.tabPillTextActive,
              ]}
            >
              Completed ({userTrips.completed.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trips List */}
        <View style={styles.listContainer}>
          {trips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <Image
                source={{ uri: trip.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />

              {/* Status Badge Overlay */}
              <View
                style={[
                  styles.statusBadge,
                  trip.status === 'Confirmed'
                    ? styles.statusConfirmed
                    : trip.status === 'Planning'
                    ? styles.statusPlanning
                    : styles.statusCompleted,
                ]}
              >
                <Text style={styles.statusText}>{trip.status}</Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.tripTitle}>{trip.destination}</Text>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={13}
                    color={colors.primary}
                  />
                  <Text style={styles.metaText}>{trip.dates}</Text>
                </View>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={colors.primary}
                  />
                  <Text style={styles.metaText}>{trip.location}</Text>
                </View>

                {activeTab === 'upcoming' ? (
                  <View style={styles.bookingDetailsRow}>
                    <View style={styles.bookingChip}>
                      <Ionicons name="people-outline" size={12} color={colors.textBody} />
                      <Text style={styles.chipText}>{trip.guests}</Text>
                    </View>
                    <View style={styles.bookingChip}>
                      <Ionicons name="ticket-outline" size={12} color={colors.textBody} />
                      <Text style={styles.chipText}>{trip.bookingId}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.highlightsBox}>
                    <Text style={styles.highlightsLabel}>Trip Highlights:</Text>
                    <Text style={styles.highlightsText}>{trip.highlights}</Text>
                  </View>
                )}
              </View>
            </View>
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
    paddingTop: 16,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 16,
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
  tabPillContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0D5DC',
  },
  tabPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  tabPillActive: {
    backgroundColor: colors.primary,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textHeading,
  },
  tabPillTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 18,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F2D7DC',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusConfirmed: {
    backgroundColor: 'rgba(46, 133, 64, 0.9)',
  },
  statusPlanning: {
    backgroundColor: 'rgba(230, 146, 60, 0.9)',
  },
  statusCompleted: {
    backgroundColor: 'rgba(77, 54, 79, 0.9)',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cardContent: {
    padding: 16,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.textBody,
    fontWeight: '500',
  },
  bookingDetailsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F7E7EB',
  },
  bookingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF0F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textBody,
  },
  highlightsBox: {
    backgroundColor: '#FAF0F2',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  highlightsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  highlightsText: {
    fontSize: 12,
    color: colors.textBody,
    marginTop: 2,
  },
});
