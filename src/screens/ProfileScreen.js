import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Traveler Profile</Text>
          <Text style={styles.subtitle}>GDGC VNRVJIET Assignment Submission</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={36} color={colors.primary} />
          </View>
          <Text style={styles.profileName}>Travel Explorer Volunteer</Text>
          <Text style={styles.profileRole}>App Development Domain</Text>
          <View style={styles.statusPill}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>React Native Candidate</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Destinations</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Attractions</Text>
          </View>
        </View>

        {/* Assignment Verification Status Card */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeading}>Assignment Stages Completed</Text>

          <View style={styles.checkItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2E8540" />
            <View style={styles.checkContent}>
              <Text style={styles.checkTitle}>Stage 1: Destination Discovery</Text>
              <Text style={styles.checkDesc}>
                Real Indian destinations across Beaches, Mountains, Heritage, & Adventure.
              </Text>
            </View>
          </View>

          <View style={styles.checkItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2E8540" />
            <View style={styles.checkContent}>
              <Text style={styles.checkTitle}>Stage 2: Navigation & Details</Text>
              <Text style={styles.checkDesc}>
                Descriptions, best time to visit, and 2–3 popular attractions with real photos.
              </Text>
            </View>
          </View>

          <View style={styles.checkItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2E8540" />
            <View style={styles.checkContent}>
              <Text style={styles.checkTitle}>Stage 3: Search & Filtering</Text>
              <Text style={styles.checkDesc}>
                Live search by destination & state, multi-category pills, combined filters.
              </Text>
            </View>
          </View>

          <View style={styles.checkItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2E8540" />
            <View style={styles.checkContent}>
              <Text style={styles.checkTitle}>Stage 4: Travel Wishlist</Text>
              <Text style={styles.checkDesc}>
                Add/remove functionality, dedicated screen, persistent AsyncStorage.
              </Text>
            </View>
          </View>
        </View>

        {/* About App Card */}
        <View style={styles.aboutCard}>
          <Ionicons name="sparkles" size={20} color={colors.primary} />
          <View style={styles.aboutContent}>
            <Text style={styles.aboutTitle}>Soft Pastel Claymorphism</Text>
            <Text style={styles.aboutDesc}>
              Designed with custom claymorphic shadows, warm blush palette, and responsive mobile container.
            </Text>
          </View>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F1DAE0',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FCEEF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F2D7DD',
  },
  profileName: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  profileRole: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E4E8',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E8540',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F2DBE1',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F2DCE2',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textHeading,
    marginBottom: 14,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  checkContent: {
    flex: 1,
  },
  checkTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textHeading,
  },
  checkDesc: {
    fontSize: 11,
    color: colors.textBody,
    marginTop: 2,
    lineHeight: 16,
  },
  aboutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF0F2',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0D5DC',
    gap: 12,
  },
  aboutContent: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  aboutDesc: {
    fontSize: 11,
    color: colors.textBody,
    marginTop: 2,
    lineHeight: 16,
  },
});
