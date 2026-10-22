import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useTrips } from '../context/TripsContext';

export const ProfileScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const {
    user,
    isLoggedIn,
    logout,
    setIsLoginModalVisible,
    setAuthMode,
    setNotificationMessage,
    updateUserProfile,
  } = useAuth();
  const { wishlist } = useWishlist();
  const {
    trips,
    upcomingTrips,
    completedTrips,
    addTrip,
    updateTripStatus,
    cycleTripStatus,
    deleteTrip,
  } = useTrips();

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [tripsTab, setTripsTab] = useState('upcoming'); // 'upcoming' or 'completed'

  // New Journey Modal State
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripDates, setNewTripDates] = useState('');
  const [newTripResort, setNewTripResort] = useState('');
  const [newTripStatus, setNewTripStatus] = useState('Planning');

  // Edit Profile Modal State
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Yashwanth Sai');
  const [editEmail, setEditEmail] = useState(user?.email || 'buruguyashwanth7@gmail.com');
  const [editPhone, setEditPhone] = useState(user?.phone || '+91 98765 43210');

  const handleOpenEditProfile = () => {
    setEditName(user?.name || 'Yashwanth Sai');
    setEditEmail(user?.email || 'buruguyashwanth7@gmail.com');
    setEditPhone(user?.phone || '+91 98765 43210');
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setNotificationMessage('Please enter a valid name.');
      return;
    }
    await updateUserProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });
    setIsEditProfileModalOpen(false);
  };

  const handleCreateTrip = () => {
    if (!newTripDestination.trim()) return;
    addTrip({
      destination: newTripDestination.trim(),
      dates: newTripDates.trim() || 'Nov 2026',
      resort: newTripResort.trim() || 'Resort & Spa',
      status: newTripStatus,
      location: 'India',
    });
    setNotificationMessage(`✈️ Trip to ${newTripDestination} added to your journeys!`);
    setNewTripDestination('');
    setNewTripDates('');
    setNewTripResort('');
    setIsAddTripModalOpen(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Modal: User Plans a New Journey */}
      <Modal
        visible={isAddTripModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAddTripModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.textHeading }]}>
                Plan a New Journey
              </Text>
              <TouchableOpacity
                onPress={() => setIsAddTripModalOpen(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={20} color={theme.textHeading} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Destination Name
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundLight,
                  borderColor: theme.cardBorder,
                  color: theme.textHeading,
                },
              ]}
              placeholder="e.g. Pondicherry French Boulevard"
              placeholderTextColor={theme.textMuted}
              value={newTripDestination}
              onChangeText={setNewTripDestination}
            />

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Travel Dates
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundLight,
                  borderColor: theme.cardBorder,
                  color: theme.textHeading,
                },
              ]}
              placeholder="e.g. 15 Dec – 20 Dec 2026"
              placeholderTextColor={theme.textMuted}
              value={newTripDates}
              onChangeText={setNewTripDates}
            />

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Hotel / Stay (Optional)
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundLight,
                  borderColor: theme.cardBorder,
                  color: theme.textHeading,
                },
              ]}
              placeholder="e.g. Heritage Beach Villa"
              placeholderTextColor={theme.textMuted}
              value={newTripResort}
              onChangeText={setNewTripResort}
            />

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Initial Status
            </Text>
            <View style={styles.statusOptionRow}>
              {['Planning', 'Confirmed', 'Completed'].map((st) => (
                <TouchableOpacity
                  key={st}
                  style={[
                    styles.statusPillBtn,
                    {
                      backgroundColor:
                        newTripStatus === st
                          ? theme.primary
                          : theme.backgroundLight,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                  onPress={() => setNewTripStatus(st)}
                >
                  <Text
                    style={[
                      styles.statusPillBtnText,
                      {
                        color:
                          newTripStatus === st ? '#FFFFFF' : theme.textBody,
                      },
                    ]}
                  >
                    {st}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.saveTripBtn, { backgroundColor: theme.primary }]}
              onPress={handleCreateTrip}
            >
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              <Text style={styles.saveTripBtnText}>Add to My Journeys</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal: Edit Profile & Account Details */}
      <Modal
        visible={isEditProfileModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsEditProfileModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.cardSurface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="person-circle-outline" size={24} color={theme.primary} />
                <Text style={[styles.modalTitle, { color: theme.textHeading, marginLeft: 8 }]}>
                  Edit Profile Details
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditProfileModalOpen(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={20} color={theme.textHeading} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Full Name
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundLight,
                  borderColor: theme.cardBorder,
                  color: theme.textHeading,
                },
              ]}
              placeholder="e.g. Yashwanth Sai"
              placeholderTextColor={theme.textMuted}
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Email Address
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundLight,
                  borderColor: theme.cardBorder,
                  color: theme.textHeading,
                },
              ]}
              placeholder="e.g. buruguyashwanth7@gmail.com"
              placeholderTextColor={theme.textMuted}
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.inputLabel, { color: theme.textHeading }]}>
              Phone Number
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundLight,
                  borderColor: theme.cardBorder,
                  color: theme.textHeading,
                },
              ]}
              placeholder="e.g. +91 98765 43210"
              placeholderTextColor={theme.textMuted}
              value={editPhone}
              onChangeText={setEditPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={[styles.saveTripBtn, { backgroundColor: theme.primary, marginTop: 18 }]}
              onPress={handleSaveProfile}
            >
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              <Text style={styles.saveTripBtnText}>Save Profile Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

          <View style={styles.userNameRow}>
            <Text style={[styles.userName, { color: theme.textHeading }]}>
              {user?.name || 'Yashwanth Sai'}
            </Text>
            <TouchableOpacity
              style={[styles.editIconCircle, { backgroundColor: theme.primaryLight }]}
              onPress={handleOpenEditProfile}
            >
              <Ionicons name="pencil" size={13} color={theme.primary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.userEmail, { color: theme.textMuted }]}>
            {user?.email || 'buruguyashwanth7@gmail.com'}
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
              {user?.memberTier || 'Gold Explorer'}
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
              onPress={handleOpenEditProfile}
            >
              <Ionicons name="create-outline" size={15} color={theme.primary} style={{ marginRight: 6 }} />
              <Text style={[styles.editProfileText, { color: theme.primary }]}>
                Edit Account Details
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Dynamic Traveler Stats Row */}
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
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {trips.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Total Trips
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
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {completedTrips.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>
              Completed
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

        {/* INTERACTIVE USER JOURNEYS SECTION */}
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
            <View>
              <Text style={[styles.sectionTitle, { color: theme.textHeading }]}>
                My Journeys
              </Text>
              <Text style={[styles.sectionSub, { color: theme.textMuted }]}>
                Tap status pill to toggle Planning ⇄ Confirmed ⇄ Completed
              </Text>
            </View>

            {/* User can add new trip directly */}
            <TouchableOpacity
              style={[
                styles.addNewTripBtn,
                { backgroundColor: theme.primaryLight },
              ]}
              onPress={() => setIsAddTripModalOpen(true)}
            >
              <Ionicons name="add" size={16} color={theme.primary} />
              <Text style={[styles.addNewTripText, { color: theme.primary }]}>
                Plan Trip
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sub-tab switcher */}
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
                Upcoming Trips ({upcomingTrips.length})
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
                Completed Trips ({completedTrips.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upcoming or Completed List */}
          {tripsTab === 'upcoming' ? (
            upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
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

                  {/* Interactive Status Pill */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.statusPillInteractive,
                      trip.status === 'Confirmed'
                        ? styles.statusConfirmed
                        : styles.statusPlanning,
                    ]}
                    onPress={() => cycleTripStatus(trip.id)}
                  >
                    <Text style={styles.statusChipText}>{trip.status}</Text>
                    <Ionicons name="repeat-outline" size={11} color="#FFFFFF" />
                  </TouchableOpacity>

                  {/* Delete Trip Action */}
                  <TouchableOpacity
                    style={styles.deleteTripBtn}
                    onPress={() => deleteTrip(trip.id)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#D32F2F" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyTripsBox}>
                <Ionicons name="airplane-outline" size={32} color={theme.textMuted} />
                <Text style={[styles.emptyTripsText, { color: theme.textMuted }]}>
                  No upcoming journeys yet. Tap "Plan Trip" above or explore destinations!
                </Text>
              </View>
            )
          ) : completedTrips.length > 0 ? (
            completedTrips.map((trip) => (
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
                    {trip.dates} • Completed
                  </Text>
                </View>

                {/* Interactive Status Pill */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.statusCompletedPill}
                  onPress={() => cycleTripStatus(trip.id)}
                >
                  <Text style={styles.statusChipText}>Completed</Text>
                  <Ionicons name="repeat-outline" size={11} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteTripBtn}
                  onPress={() => deleteTrip(trip.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#D32F2F" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyTripsBox}>
              <Ionicons name="checkmark-done-circle-outline" size={32} color={theme.textMuted} />
              <Text style={[styles.emptyTripsText, { color: theme.textMuted }]}>
                No completed trips recorded yet. Once you complete a trip, mark it here!
              </Text>
            </View>
          )}
        </View>

        {/* Application Settings Section */}
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

          {/* Working Dark Theme Toggle */}
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
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  editIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sectionSub: {
    fontSize: 11,
    marginTop: 2,
  },
  addNewTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  addNewTripText: {
    fontSize: 11,
    fontWeight: '700',
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
    gap: 8,
  },
  tripIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
  statusPillInteractive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  statusConfirmed: {
    backgroundColor: '#2E8540',
  },
  statusPlanning: {
    backgroundColor: '#E6923C',
  },
  statusCompletedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#673AB7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  deleteTripBtn: {
    padding: 6,
  },
  emptyTripsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  emptyTripsText: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(25, 12, 26, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  modalCloseBtn: {
    padding: 4,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    marginTop: 6,
  },
  modalInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    borderWidth: 1,
  },
  statusOptionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    marginBottom: 14,
  },
  statusPillBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statusPillBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  saveTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 18,
    gap: 8,
    marginTop: 6,
  },
  saveTripBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
