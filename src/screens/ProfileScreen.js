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
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export const ProfileScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout, setIsLoginModalVisible, setAuthMode } = useAuth();
  const { wishlist } = useWishlist();

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [tripsTab, setTripsTab] = useState('upcoming'); // 'upcoming' or 'completed'

  const userTrips = {
    upcoming: [
      {
        id: 't1',
        destination: 'Goa Coastal Escape',
        dates: '15 Nov – 20 Nov 2026',
        status: 'Confirmed',
        resort: 'Taj Exotica Resort & Spa',
      },
      {
        id: 't2',
        destination: 'Pondicherry French Boulevard Tour',
        dates: '12 Dec – 15 Dec 2026',
        status: 'Planning',
        resort: 'Villa Shanti Heritage Hotel',
      },
    ],
    completed: [
      {
        id: 't3',
        destination: 'Manali Alpine Winter Trek',
        dates: 'Jan 2026',
        rating: '5.0 ★',
      },
      {
        id: 't4',
        destination: 'Jaipur Royal Forts Tour',
        dates: 'Oct 2025',
        rating: '5.0 ★',
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textHeading }]}>
            Traveler Profile
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Your personalized trips, wishlist & preferences
          </Text>
        </View>

        {/* User Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              }}
              style={[styles.avatarImage, { borderColor: theme.cardBorder }]}
            />
            <View style={[styles.badgeCheck, { backgroundColor: theme.primary }]}>
              <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
            </View>
          </View>

          <Text style={[styles.userName, { color: theme.textHeading }]}>
            {user?.name || 'Explorer Guest'}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textMuted }]}>
            {user?.email || 'Sign in to sync your trips & wishlist'}
          </Text>

          <View
            style={[
              styles.tierPill,
              {
                backgroundColor: theme.primaryLight,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Ionicons name="diamond-outline" size={13} color={theme.primary} />
            <Text style={[styles.tierText, { color: theme.primary }]}>
              {user?.memberTier || 'Standard Explorer'}
            </Text>
          </View>

          {!isLoggedIn ? (
            <View style={styles.authBtnRow}>
              <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: theme.primary }]}
                onPress={() => {
                  setAuthMode('login');
                  setIsLoginModalVisible(true);
                }}
              >
                <Ionicons name="log-in-outline" size={16} color="#FFFFFF" />
                <Text style={styles.loginBtnText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.registerBtn,
                  {
                    backgroundColor: theme.backgroundLight,
                    borderColor: theme.cardBorder,
                  },
                ]}
                onPress={() => {
                  setAuthMode('signup');
                  setIsLoginModalVisible(true);
                }}
              >
                <Text style={[styles.registerBtnText, { color: theme.primary }]}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.editProfileBtn,
                { backgroundColor: theme.backgroundLight },
              ]}
              onPress={() => {
                setAuthMode('signup');
                setIsLoginModalVisible(true);
              }}
            >
              <Text style={[styles.editProfileText, { color: theme.primary }]}>
                Edit Account Details
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.primary }]}>4</Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Trips
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.statBox,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={() => navigation.navigate('WishlistTab')}
          >
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {wishlist.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Wishlist
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.primary }]}>14</Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Reviews
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.primary }]}>8</Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              States
            </Text>
          </View>
        </View>

        {/* My Trips Section (Requested: "profile should look like about their trips,whishlits,completed trips") */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
              My Journeys
            </Text>
          </View>

          {/* Sub-tab pills */}
          <View
            style={[
              styles.tripsToggleBar,
              { backgroundColor: theme.backgroundLight },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tripsToggleBtn,
                tripsTab === 'upcoming' && {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={() => setTripsTab('upcoming')}
            >
              <Text
                style={[
                  styles.tripsToggleText,
                  {
                    color:
                      tripsTab === 'upcoming' ? '#FFFFFF' : theme.textBody,
                  },
                ]}
              >
                Upcoming Trips (2)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tripsToggleBtn,
                tripsTab === 'completed' && {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={() => setTripsTab('completed')}
            >
              <Text
                style={[
                  styles.tripsToggleText,
                  {
                    color:
                      tripsTab === 'completed' ? '#FFFFFF' : theme.textBody,
                  },
                ]}
              >
                Completed Trips (2)
              </Text>
            </TouchableOpacity>
          </View>

          {tripsTab === 'upcoming' ? (
            <View>
              {userTrips.upcoming.map((trip) => (
                <View
                  key={trip.id}
                  style={[
                    styles.tripItem,
                    { borderBottomColor: theme.cardBorder },
                  ]}
                >
                  <View
                    style={[
                      styles.tripIconBox,
                      { backgroundColor: theme.primaryLight },
                    ]}
                  >
                    <Ionicons name="airplane" size={18} color={theme.primary} />
                  </View>
                  <View style={styles.tripInfo}>
                    <Text
                      style={[styles.tripName, { color: theme.textHeading }]}
                    >
                      {trip.destination}
                    </Text>
                    <Text
                      style={[styles.tripDates, { color: theme.textMuted }]}
                    >
                      {trip.dates} • {trip.resort}
                    </Text>
                  </View>
                  <View style={styles.statusChipConfirmed}>
                    <Text style={styles.statusChipText}>{trip.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View>
              {userTrips.completed.map((trip) => (
                <View
                  key={trip.id}
                  style={[
                    styles.tripItem,
                    { borderBottomColor: theme.cardBorder },
                  ]}
                >
                  <View
                    style={[
                      styles.tripIconBox,
                      { backgroundColor: '#E8F5E9' },
                    ]}
                  >
                    <Ionicons name="checkmark-done" size={18} color="#2E8540" />
                  </View>
                  <View style={styles.tripInfo}>
                    <Text
                      style={[styles.tripName, { color: theme.textHeading }]}
                    >
                      {trip.destination}
                    </Text>
                    <Text
                      style={[styles.tripDates, { color: theme.textMuted }]}
                    >
                      {trip.dates} • Rated {trip.rating}
                    </Text>
                  </View>
                  <View style={styles.statusChipCompleted}>
                    <Text style={styles.statusChipTextCompleted}>Completed</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Application Settings Section (Standard mobile settings) */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
            Application Settings
          </Text>

          {/* FIXED DARK THEME BUTTON: Connects directly to toggleTheme() */}
          <View
            style={[styles.settingRow, { borderBottomColor: theme.cardBorder }]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name={isDarkMode ? 'moon' : 'sunny-outline'}
                size={20}
                color={theme.primary}
              />
              <View>
                <Text
                  style={[styles.settingLabel, { color: theme.textHeading }]}
                >
                  Dark Theme Mode
                </Text>
                <Text style={[styles.settingSub, { color: theme.textMuted }]}>
                  {isDarkMode ? 'Dark obsidian plum' : 'Soft blush pastel'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D9C5CB', true: theme.primary }}
              thumbColor={isDarkMode ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Notifications Toggle */}
          <View
            style={[styles.settingRow, { borderBottomColor: theme.cardBorder }]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={theme.primary}
              />
              <Text style={[styles.settingLabel, { color: theme.textHeading }]}>
                Trip Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D9C5CB', true: theme.primary }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Location Toggle */}
          <View
            style={[styles.settingRow, { borderBottomColor: theme.cardBorder }]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="location-outline"
                size={20}
                color={theme.primary}
              />
              <Text style={[styles.settingLabel, { color: theme.textHeading }]}>
                Location Services
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#D9C5CB', true: theme.primary }}
              thumbColor={locationEnabled ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Currency Preference */}
          <TouchableOpacity
            style={[
              styles.settingClickRow,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="cash-outline" size={20} color={theme.primary} />
              <Text style={[styles.settingLabel, { color: theme.textHeading }]}>
                Default Currency
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: theme.textMuted }]}>
                INR (₹)
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={theme.textMuted}
              />
            </View>
          </TouchableOpacity>

          {/* Language Preference */}
          <TouchableOpacity
            style={[
              styles.settingClickRow,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="language-outline"
                size={20}
                color={theme.primary}
              />
              <Text style={[styles.settingLabel, { color: theme.textHeading }]}>
                Language
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: theme.textMuted }]}>
                English (India)
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={theme.textMuted}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support & Legal Section */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.cardSurface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
            Support & Legal
          </Text>

          <TouchableOpacity
            style={[
              styles.settingClickRow,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="help-buoy-outline"
                size={20}
                color={theme.primary}
              />
              <Text style={[styles.settingLabel, { color: theme.textHeading }]}>
                24/7 Travel Assistance
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingClickRow,
              { borderBottomColor: theme.cardBorder },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="shield-outline"
                size={20}
                color={theme.primary}
              />
              <Text style={[styles.settingLabel, { color: theme.textHeading }]}>
                Privacy Policy & Terms
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        {isLoggedIn && (
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
            <Text style={styles.logoutButtonText}>Log Out from Account</Text>
          </TouchableOpacity>
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
  },
  profileCard: {
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
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
  },
  badgeCheck: {
    position: 'absolute',
    bottom: 2,
    right: 2,
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
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 10,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 6,
    marginBottom: 14,
    borderWidth: 1,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
  },
  authBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    gap: 6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  registerBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
  },
  registerBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  editProfileBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  editProfileText: {
    fontSize: 12,
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
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  sectionCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
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
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  tripsToggleBar: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 3,
    marginBottom: 12,
  },
  tripsToggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 14,
  },
  tripsToggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tripIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  },
  tripDates: {
    fontSize: 11,
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
    color: '#2E8540',
  },
  statusChipTextCompleted: {
    fontSize: 10,
    fontWeight: '700',
    color: '#673AB7',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingClickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  settingSub: {
    fontSize: 10,
    marginTop: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingValue: {
    fontSize: 12,
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
