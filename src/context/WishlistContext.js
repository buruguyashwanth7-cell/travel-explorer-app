import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext();

const STORAGE_KEY = '@travel_explorer_wishlist_v1';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from AsyncStorage on mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const parsed = JSON.parse(jsonValue);
          if (Array.isArray(parsed)) {
            setWishlist(parsed);
          }
        } else {
          // Pre-populate with 1 destination (Goa) for immediate rich preview
          // or start empty as requested
          setWishlist([]);
        }
      } catch (e) {
        console.warn('Failed to load wishlist from storage:', e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadWishlist();
  }, []);

  // Save wishlist to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    const saveWishlist = async () => {
      try {
        const jsonValue = JSON.stringify(wishlist);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        console.warn('Failed to save wishlist to storage:', e);
      }
    };

    saveWishlist();
  }, [wishlist, isLoaded]);

  const addToWishlist = (destination) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === destination.id)) {
        return prev;
      }
      return [...prev, destination];
    });
  };

  const removeFromWishlist = (destinationId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== destinationId));
  };

  const toggleWishlist = (destination) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === destination.id);
      if (exists) {
        return prev.filter((item) => item.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };

  const isInWishlist = (destinationId) => {
    return wishlist.some((item) => item.id === destinationId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        isLoaded
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
