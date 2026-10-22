import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripsContext = createContext();
const TRIPS_STORAGE_KEY = '@travel_explorer_user_trips_v2';

const initialDemoTrips = [
  {
    id: 't1',
    destination: 'Goa Coastal Escape',
    location: 'Goa, India',
    dates: '15 Nov – 20 Nov 2026',
    status: 'Confirmed', // 'Planning' | 'Confirmed' | 'Completed'
    resort: 'Taj Exotica Resort & Spa',
    guests: '2 Travelers',
  },
  {
    id: 't2',
    destination: 'Pondicherry French Boulevard Tour',
    location: 'Puducherry, India',
    dates: '12 Dec – 15 Dec 2026',
    status: 'Planning',
    resort: 'Villa Shanti Heritage Hotel',
    guests: '1 Traveler',
  },
  {
    id: 't3',
    destination: 'Manali Alpine Winter Trek',
    location: 'Himachal Pradesh, India',
    dates: '10 Jan – 16 Jan 2026',
    status: 'Completed',
    resort: 'Himalayan Pine Resort',
    rating: '5.0 ★',
    guests: '3 Travelers',
  },
];

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const stored = await AsyncStorage.getItem(TRIPS_STORAGE_KEY);
        if (stored) {
          setTrips(JSON.parse(stored));
        } else {
          setTrips(initialDemoTrips);
        }
      } catch (e) {
        console.warn('Failed to load trips from storage:', e);
        setTrips(initialDemoTrips);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTrips();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const saveTrips = async () => {
      try {
        await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
      } catch (e) {
        console.warn('Failed to save trips to storage:', e);
      }
    };
    saveTrips();
  }, [trips, isLoaded]);

  const addTrip = (newTrip) => {
    const tripWithId = {
      id: 't_' + Date.now(),
      status: 'Planning',
      guests: '2 Travelers',
      ...newTrip,
    };
    setTrips((prev) => [tripWithId, ...prev]);
    return tripWithId;
  };

  const updateTripStatus = (tripId, newStatus) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: newStatus } : t))
    );
  };

  const cycleTripStatus = (tripId) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        let nextStatus = 'Planning';
        if (t.status === 'Planning') nextStatus = 'Confirmed';
        else if (t.status === 'Confirmed') nextStatus = 'Completed';
        else if (t.status === 'Completed') nextStatus = 'Planning';
        return { ...t, status: nextStatus };
      })
    );
  };

  const deleteTrip = (tripId) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const upcomingTrips = trips.filter((t) => t.status !== 'Completed');
  const completedTrips = trips.filter((t) => t.status === 'Completed');

  return (
    <TripsContext.Provider
      value={{
        trips,
        upcomingTrips,
        completedTrips,
        addTrip,
        updateTripStatus,
        cycleTripStatus,
        deleteTrip,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};
