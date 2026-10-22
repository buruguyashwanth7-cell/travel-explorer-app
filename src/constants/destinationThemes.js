// Place-specific theme palettes, glass tints, and curated experience metadata
// Inspired by user-provided reference concepts (Image 1: Glass HUD & Image 2: Clay Studio)

export const destinationThemes = {
  // Goa - Tropical Ocean & Sunset Gold
  'Goa': {
    primaryAccent: '#0284C7', // Sky Azure
    secondaryAccent: '#F59E0B', // Sunset Amber
    glowColor: 'rgba(245, 158, 11, 0.45)',
    heroGradient: ['rgba(2, 44, 67, 0.4)', 'rgba(3, 105, 161, 0.85)'],
    glassBg: 'rgba(12, 38, 59, 0.65)',
    glassBorder: 'rgba(56, 189, 248, 0.35)',
    claySheetBg: '#F3F9FA',
    clayAccent: '#0369A1',
    clayHeaderBg: '#E0F2FE',
    staysCount: '340+ Stays',
    diningCount: '480+ Places',
    savedCount: '4.2k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Water Sports', subtitle: 'Parasailing & Jet Ski', icon: 'boat-outline', color: '#F59E0B', iconBg: '#FEF3C7' },
      { id: 'exp2', title: 'Forts & Sunset', subtitle: '17th c. Aguada & Chapora', icon: 'shield-checkmark-outline', color: '#0284C7', iconBg: '#E0F2FE' },
      { id: 'exp3', title: 'Beach Shacks', subtitle: 'Seafood & Sunset Vibes', icon: 'restaurant-outline', color: '#E11D48', iconBg: '#FFE4E6' },
    ],
  },

  // Pondicherry - French Colonial Pastel & Bougainvillea
  'Pondicherry': {
    primaryAccent: '#8B5CF6', // French Lavender
    secondaryAccent: '#EAB308', // Mustard Yellow
    glowColor: 'rgba(234, 179, 8, 0.45)',
    heroGradient: ['rgba(46, 16, 101, 0.4)', 'rgba(109, 40, 217, 0.85)'],
    glassBg: 'rgba(38, 20, 68, 0.65)',
    glassBorder: 'rgba(196, 181, 253, 0.35)',
    claySheetBg: '#FAF5FF',
    clayAccent: '#7C3AED',
    clayHeaderBg: '#EDE9FE',
    staysCount: '160+ Stays',
    diningCount: '210+ Cafes',
    savedCount: '3.1k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'French Cafes', subtitle: 'Croissants & Heritage Bakeries', icon: 'cafe-outline', color: '#EAB308', iconBg: '#FEF9C3' },
      { id: 'exp2', title: 'Promenade Walk', subtitle: 'Rock Beach Sunset Stroll', icon: 'footsteps-outline', color: '#8B5CF6', iconBg: '#EDE9FE' },
      { id: 'exp3', title: 'Auroville & Peace', subtitle: 'Matrimandir Golden Dome', icon: 'sparkles-outline', color: '#EC4899', iconBg: '#FCE7F3' },
    ],
  },

  // Manali - Alpine Snow & Icy Peaks
  'Manali': {
    primaryAccent: '#38BDF8', // Glacier Azure
    secondaryAccent: '#60A5FA', // Alpine Cobalt
    glowColor: 'rgba(56, 189, 248, 0.45)',
    heroGradient: ['rgba(15, 23, 42, 0.5)', 'rgba(30, 58, 138, 0.88)'],
    glassBg: 'rgba(15, 29, 58, 0.65)',
    glassBorder: 'rgba(147, 197, 253, 0.35)',
    claySheetBg: '#F0F9FF',
    clayAccent: '#0284C7',
    clayHeaderBg: '#E0F2FE',
    staysCount: '280+ Stays',
    diningCount: '190+ Cafes',
    savedCount: '5.8k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Solang Adventure', subtitle: 'Snow Slopes & Paragliding', icon: 'snow-outline', color: '#0284C7', iconBg: '#E0F2FE' },
      { id: 'exp2', title: 'Rohtang Pass', subtitle: 'High Glacier Crossing', icon: 'trail-sign-outline', color: '#4F46E5', iconBg: '#EEF2FF' },
      { id: 'exp3', title: 'Old Manali Cafes', subtitle: 'Pine Wood Lounges', icon: 'flame-outline', color: '#F97316', iconBg: '#FFEDD5' },
    ],
  },

  // Varanasi - Sacred Saffron & Ganga Diya Gold
  'Varanasi': {
    primaryAccent: '#EA580C', // Saffron Diya
    secondaryAccent: '#D97706', // Temple Gold
    glowColor: 'rgba(234, 88, 12, 0.45)',
    heroGradient: ['rgba(67, 20, 7, 0.5)', 'rgba(180, 83, 9, 0.88)'],
    glassBg: 'rgba(56, 18, 8, 0.7)',
    glassBorder: 'rgba(251, 146, 60, 0.35)',
    claySheetBg: '#FFFBEB',
    clayAccent: '#C2410C',
    clayHeaderBg: '#FEF3C7',
    staysCount: '190+ Stays',
    diningCount: '240+ Places',
    savedCount: '4.6k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Ganga Aarti', subtitle: 'Grand Evening Fire Ritual', icon: 'flame-outline', color: '#EA580C', iconBg: '#FFEDD5' },
      { id: 'exp2', title: 'Dawn Boat Ride', subtitle: 'Sunrise over Ancient Ghats', icon: 'boat-outline', color: '#D97706', iconBg: '#FEF3C7' },
      { id: 'exp3', title: 'Kashi Vishwanath', subtitle: 'Golden Spire Jyotirlinga', icon: 'sunny-outline', color: '#DC2626', iconBg: '#FEE2E2' },
    ],
  },

  // Tirupati - Balaji Temple Gold & Divine Maroon
  'Tirupati': {
    primaryAccent: '#CA8A04', // Sacred Balaji Gold
    secondaryAccent: '#991B1B', // Sacred Vermilion
    glowColor: 'rgba(202, 138, 4, 0.45)',
    heroGradient: ['rgba(69, 10, 10, 0.5)', 'rgba(161, 98, 7, 0.88)'],
    glassBg: 'rgba(54, 14, 14, 0.7)',
    glassBorder: 'rgba(253, 224, 71, 0.35)',
    claySheetBg: '#FFFDF5',
    clayAccent: '#854D0E',
    clayHeaderBg: '#FEF9C3',
    staysCount: '150+ Stays',
    diningCount: '180+ Places',
    savedCount: '3.9k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Temple Darshan', subtitle: 'Sri Venkateswara Swamy', icon: 'sparkles-outline', color: '#CA8A04', iconBg: '#FEF9C3' },
      { id: 'exp2', title: 'Sacred Waterfalls', subtitle: 'Kapila Theertham Holy Dip', icon: 'water-outline', color: '#0284C7', iconBg: '#E0F2FE' },
      { id: 'exp3', title: 'Seven Hills Path', subtitle: 'Srivari Mettu Trek Path', icon: 'footsteps-outline', color: '#991B1B', iconBg: '#FEE2E2' },
    ],
  },

  // Amritsar - Golden Temple Glow & Royal Indigo
  'Amritsar': {
    primaryAccent: '#F59E0B', // Golden Splendor
    secondaryAccent: '#4338CA', // Indigo Night
    glowColor: 'rgba(245, 158, 11, 0.45)',
    heroGradient: ['rgba(30, 27, 75, 0.5)', 'rgba(217, 119, 6, 0.88)'],
    glassBg: 'rgba(28, 25, 65, 0.7)',
    glassBorder: 'rgba(252, 211, 77, 0.35)',
    claySheetBg: '#FFFBEB',
    clayAccent: '#D97706',
    clayHeaderBg: '#FEF3C7',
    staysCount: '175+ Stays',
    diningCount: '290+ Dhabas',
    savedCount: '4.1k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Golden Temple', subtitle: 'Harmandir Sahib & Amrit Pool', icon: 'star-outline', color: '#F59E0B', iconBg: '#FEF3C7' },
      { id: 'exp2', title: 'Wagah Border', subtitle: 'High-Spirited Beating Retreat', icon: 'flag-outline', color: '#4338CA', iconBg: '#EEF2FF' },
      { id: 'exp3', title: 'Kulcha & Lassi', subtitle: 'Legendary Amritsari Gastronomy', icon: 'restaurant-outline', color: '#DC2626', iconBg: '#FEE2E2' },
    ],
  },

  // Jaipur - Royal Terracotta & Amber Palaces
  'Jaipur': {
    primaryAccent: '#E11D48', // Royal Pink City
    secondaryAccent: '#D97706', // Rajasthani Gold
    glowColor: 'rgba(225, 29, 72, 0.45)',
    heroGradient: ['rgba(76, 5, 25, 0.5)', 'rgba(194, 65, 12, 0.88)'],
    glassBg: 'rgba(58, 10, 24, 0.7)',
    glassBorder: 'rgba(253, 164, 175, 0.35)',
    claySheetBg: '#FFF1F2',
    clayAccent: '#BE123C',
    clayHeaderBg: '#FFE4E6',
    staysCount: '310+ Havelis',
    diningCount: '350+ Places',
    savedCount: '6.2k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Amber Fort', subtitle: 'Majestic Hilltop Fortress', icon: 'shield-outline', color: '#D97706', iconBg: '#FEF3C7' },
      { id: 'exp2', title: 'Hawa Mahal', subtitle: 'Palace of 953 Windows', icon: 'business-outline', color: '#E11D48', iconBg: '#FFE4E6' },
      { id: 'exp3', title: 'Johari Bazaar', subtitle: 'Gemstones, Textiles & Crafts', icon: 'bag-handle-outline', color: '#9333EA', iconBg: '#F3E8FF' },
    ],
  },

  // Rishikesh - Emerald Ganges Rapids & Yoga Serenity
  'Rishikesh': {
    primaryAccent: '#0D9488', // Emerald Rapids
    secondaryAccent: '#F97316', // Sunset Tangerine
    glowColor: 'rgba(13, 148, 136, 0.45)',
    heroGradient: ['rgba(6, 44, 40, 0.5)', 'rgba(13, 148, 136, 0.88)'],
    glassBg: 'rgba(8, 38, 35, 0.7)',
    glassBorder: 'rgba(94, 234, 212, 0.35)',
    claySheetBg: '#F0FDFA',
    clayAccent: '#0F766E',
    clayHeaderBg: '#CCFBF1',
    staysCount: '180+ Camps',
    diningCount: '160+ Cafes',
    savedCount: '4.8k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Ganges Rafting', subtitle: 'Grade III & IV White Water', icon: 'boat-outline', color: '#0D9488', iconBg: '#CCFBF1' },
      { id: 'exp2', title: 'Bungee Jump', subtitle: '83m India’s Highest Plunge', icon: 'airplane-outline', color: '#F97316', iconBg: '#FFEDD5' },
      { id: 'exp3', title: 'Ganga Aarti', subtitle: 'Triveni Ghat Evening Peace', icon: 'flame-outline', color: '#EAB308', iconBg: '#FEF9C3' },
    ],
  },

  // Leh-Ladakh - High-Altitude Turquoise & Cold Desert
  'Leh-Ladakh': {
    primaryAccent: '#0284C7', // Pangong Cyan
    secondaryAccent: '#EA580C', // Tibetan Red
    glowColor: 'rgba(2, 132, 199, 0.45)',
    heroGradient: ['rgba(12, 28, 48, 0.5)', 'rgba(2, 132, 199, 0.88)'],
    glassBg: 'rgba(11, 26, 44, 0.7)',
    glassBorder: 'rgba(125, 211, 252, 0.35)',
    claySheetBg: '#F0F9FF',
    clayAccent: '#0369A1',
    clayHeaderBg: '#E0F2FE',
    staysCount: '120+ Stays',
    diningCount: '95+ Cafes',
    savedCount: '7.1k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Pangong Lake', subtitle: 'Color-Shifting 14,000ft Waters', icon: 'water-outline', color: '#0284C7', iconBg: '#E0F2FE' },
      { id: 'exp2', title: 'Khardung La Pass', subtitle: 'World’s Highest Motorable Pass', icon: 'bicycle-outline', color: '#EA580C', iconBg: '#FFEDD5' },
      { id: 'exp3', title: 'Nubra Dunes', subtitle: 'Double-Humped Camel Safari', icon: 'trail-sign-outline', color: '#CA8A04', iconBg: '#FEF9C3' },
    ],
  },

  // Munnar - Emerald Tea Hills & Misty Waterfalls
  'Munnar': {
    primaryAccent: '#059669', // Emerald Tea
    secondaryAccent: '#10B981', // Mint Fog
    glowColor: 'rgba(5, 150, 105, 0.45)',
    heroGradient: ['rgba(6, 44, 30, 0.5)', 'rgba(5, 150, 105, 0.88)'],
    glassBg: 'rgba(8, 38, 25, 0.7)',
    glassBorder: 'rgba(110, 231, 183, 0.35)',
    claySheetBg: '#ECFDF5',
    clayAccent: '#047857',
    clayHeaderBg: '#D1FAE5',
    staysCount: '190+ Resorts',
    diningCount: '140+ Cafes',
    savedCount: '4.5k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Tea Plantations', subtitle: 'Rolling Green Hill Walks', icon: 'leaf-outline', color: '#059669', iconBg: '#D1FAE5' },
      { id: 'exp2', title: 'Eravikulam Park', subtitle: 'Endangered Nilgiri Tahr', icon: 'paw-outline', color: '#D97706', iconBg: '#FEF3C7' },
      { id: 'exp3', title: 'Mattupetty Lake', subtitle: 'Speedboating & Dam View', icon: 'boat-outline', color: '#0284C7', iconBg: '#E0F2FE' },
    ],
  },

  // Jim Corbett - Dense Sal Forests & Tiger Territory
  'Jim Corbett National Park': {
    primaryAccent: '#15803D', // Deep Forest Green
    secondaryAccent: '#D97706', // Tiger Ochre
    glowColor: 'rgba(217, 119, 6, 0.45)',
    heroGradient: ['rgba(20, 40, 18, 0.5)', 'rgba(21, 128, 61, 0.88)'],
    glassBg: 'rgba(16, 32, 14, 0.7)',
    glassBorder: 'rgba(134, 239, 172, 0.35)',
    claySheetBg: '#F0FDF4',
    clayAccent: '#166534',
    clayHeaderBg: '#DCFCE7',
    staysCount: '110+ Lodges',
    diningCount: '75+ Resorts',
    savedCount: '3.6k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Tiger Safari', subtitle: 'Dhikala & Bijrani Zone Jeeps', icon: 'paw-outline', color: '#D97706', iconBg: '#FEF3C7' },
      { id: 'exp2', title: 'Corbett Falls', subtitle: '66-ft Jungle Cascade', icon: 'water-outline', color: '#0284C7', iconBg: '#E0F2FE' },
      { id: 'exp3', title: 'Ramganga Watch', subtitle: 'Gharials & Wild Elephants', icon: 'eye-outline', color: '#15803D', iconBg: '#DCFCE7' },
    ],
  },

  // Andaman & Nicobar - Deep Coral & Turquoise Islands
  'Andaman & Nicobar': {
    primaryAccent: '#0891B2', // Deep Cyan
    secondaryAccent: '#F43F5E', // Coral Rose
    glowColor: 'rgba(8, 145, 178, 0.45)',
    heroGradient: ['rgba(8, 47, 73, 0.5)', 'rgba(8, 145, 178, 0.88)'],
    glassBg: 'rgba(10, 36, 56, 0.7)',
    glassBorder: 'rgba(103, 232, 249, 0.35)',
    claySheetBg: '#F0FDFA',
    clayAccent: '#0E7490',
    clayHeaderBg: '#CFFAFE',
    staysCount: '135+ Resorts',
    diningCount: '110+ Seafood',
    savedCount: '5.2k Saved',
    curatedExperiences: [
      { id: 'exp1', title: 'Radhanagar Beach', subtitle: 'Asia’s Cleanest Shoreline', icon: 'sunny-outline', color: '#F43F5E', iconBg: '#FFE4E6' },
      { id: 'exp2', title: 'Scuba & Snorkel', subtitle: 'Elephant Beach Coral Reefs', icon: 'water-outline', color: '#0891B2', iconBg: '#CFFAFE' },
      { id: 'exp3', title: 'Cellular Jail', subtitle: 'Historic Light & Sound Saga', icon: 'shield-outline', color: '#475569', iconBg: '#F1F5F9' },
    ],
  },
};

// Default fallback theme if destination doesn't have custom override
const defaultDestinationTheme = {
  primaryAccent: '#8A2B42', // Signature Burgundy
  secondaryAccent: '#E11D48',
  glowColor: 'rgba(138, 43, 66, 0.45)',
  heroGradient: ['rgba(35, 12, 20, 0.5)', 'rgba(138, 43, 66, 0.88)'],
  glassBg: 'rgba(38, 14, 23, 0.7)',
  glassBorder: 'rgba(251, 207, 232, 0.35)',
  claySheetBg: '#FDF2F4',
  clayAccent: '#8A2B42',
  clayHeaderBg: '#FCE7EB',
  staysCount: '150+ Stays',
  diningCount: '180+ Places',
  savedCount: '3.5k Saved',
  curatedExperiences: [
    { id: 'exp1', title: 'Historic Wonders', subtitle: 'Architectural Landmarks', icon: 'business-outline', color: '#8A2B42', iconBg: '#FCE7EB' },
    { id: 'exp2', title: 'Nature Trails', subtitle: 'Scenic Panoramas & Walks', icon: 'leaf-outline', color: '#059669', iconBg: '#D1FAE5' },
    { id: 'exp3', title: 'Local Culture', subtitle: 'Authentic Food & Bazaars', icon: 'restaurant-outline', color: '#D97706', iconBg: '#FEF3C7' },
  ],
};

export const getDestinationTheme = (destination) => {
  if (!destination || !destination.name) return defaultDestinationTheme;
  const destNameLower = destination.name.toLowerCase();
  const match = Object.keys(destinationThemes).find(
    (key) => destNameLower.includes(key.toLowerCase()) || key.toLowerCase().includes(destNameLower)
  );
  return match ? destinationThemes[match] : defaultDestinationTheme;
};
