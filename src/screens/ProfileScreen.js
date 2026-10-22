import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export const ProfileScreen = ({ navigation }) => {
  const { user, isLoggedIn, logout, setIsLoginModalVisible } = useAuth();
  const { wishlist } = useWishlist();

  // Settings State toggles like in normal applications
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Account</Text>
          <Text style={styles.subtitle}>Manage your profile, trips & settings</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              }}
              style={styles.avatarImage}
            />
            <View style={styles.badgeCheck}>
              <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.userName}>{user?.name || 'Explorer Guest'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'Sign in with your email to sync trips'}
          </Text>

          <View style={styles.tierPill}>
            <Ionicons name="diamond-outline" size={13} color={colors.primary} />
            <Text style={styles.tierText}>
              {user?.memberTier || 'Standard Explorer'}
            </Text>
          </View>

          {!isLoggedIn ? (
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => setIsLoginModalVisible(true)}
            >
              <Ionicons name="mail" size={16} color="#FFFFFF" />
              <Text style={styles.loginBtnText}>Sign In with Email OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={() => setIsLoginModalVisible(true)}
            >
              <Text style={styles.editProfileText}>Switch / Edit Account</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Traveler Stats Row */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statBox}
            onPress={() => navigation.navigate('TripsTab')}
          >
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => navigation.navigate('WishlistTab')}
          >
            <Text style={styles.statNumber}>{wishlist.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </TouchableOpacity>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>States</Text>
          </View>
        </View>

        {/* Trips Quick Summary Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Journeys</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TripsTab')}>
              <Text style={styles.sectionAction}>View All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.tripSummaryItem}
            onPress={() => navigation.navigate('TripsTab')}
          >
            <View style={styles.tripIconBox}>
              <Ionicons name="airplane" size={18} color={colors.primary} />
            </View>
            <View style={styles.tripInfo}>
              <Text style={styles.tripName}>Goa Coastal Escape</Text>
              <Text style={styles.tripDates}>15 Nov – 20 Nov 2026 • 2 Guests</Text>
            </View>
            <View style={styles.statusChipConfirmed}>
              <Text style={styles.statusChipText}>Confirmed</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tripSummaryItem}
            onPress={() => navigation.navigate('TripsTab')}
          >
            <View style={styles.tripIconBox}>
              <Ionicons name="checkmark-done" size={18} color="#2E8540" />
            </View>
            <View style={styles.tripInfo}>
              <Text style={styles.tripName}>Manali Alpine Winter Trek</Text>
              <Text style={styles.tripDates}>Completed Jan 2026 • 5.0 ★</Text>
            </View>
            <View style={styles.statusChipCompleted}>
              <Text style={styles.statusChipText}>Completed</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Application Settings Section (Standard Mobile App Settings) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Application Settings</Text>

          {/* Notifications Toggle */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D9C5CB', true: colors.primary }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Location Services Toggle */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
              <Text style={styles.settingLabel}>Location Recommendations</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#D9C5CB', true: colors.primary }}
              thumbColor={locationEnabled ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Dark Mode Toggle */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={20} color={colors.primary} />
              <Text style={styles.settingLabel}>Dark Theme Preview</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#D9C5CB', true: colors.primary }}
              thumbColor={darkModeEnabled ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Currency Preference */}
          <TouchableOpacity style={styles.settingClickRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="cash-outline" size={20} color={colors.primary} />
              <Text style={styles.settingLabel}>Default Currency</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>INR (₹)</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          {/* Language Preference */}
          <TouchableOpacity style={styles.settingClickRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="language-outline" size={20} color={colors.primary} />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>English (India)</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support & Legal Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Support & About</Text>

          <TouchableOpacity style={styles.settingClickRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-buoy-outline" size={20} color={colors.primary} />
              <Text style={styles.settingLabel}>Help & 24/7 Travel Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingClickRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-outline" size={20} color={colors.primary} />
              <Text style={styles.settingLabel}>Privacy Policy & Terms</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.settingClickRow}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.settingLabel}>App Version</Text>
            </View>
            <Text style={styles.settingValue}>v2.4.0 (Production)</Text>
          </View>
        </View>

        {/* Logout / Sign In Button */}
        {isLoggedIn && (
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
            <Text style={styles.logoutButtonText}>Log Out from Device</Text>
          </TouchableOpacity>
        )}
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
    borderRadius: 28,
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: '#F2D7DD',
  },
  badgeCheck: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  userEmail: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 10,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCEEF1',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0D5DC',
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    gap: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  editProfileBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FAF0F2',
  },
  editProfileText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 10,
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
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F2DCE2',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textHeading,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 8,
  },
  sectionAction: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  tripSummaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F7E7EB',
  },
  tripIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FAF0F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textHeading,
  },
  tripDates: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  statusChipConfirmed: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusChipCompleted: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9ECEF',
  },
  settingClickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9ECEF',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textHeading,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingValue: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEDED',
    paddingVertical: 14,
    borderRadius: 20,
    gap: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F8D7DA',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D32F2F',
  },
});
