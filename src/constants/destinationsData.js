export const categories = [
  'All',
  'Beaches',
  'Mountains',
  'Heritage',
  'Adventure',
  'Religious & Spiritual',
  'Wildlife',
];

export const destinationsData = [
  // --- BEACHES ---
  {
    id: '1',
    latitude: 15.2993,
    longitude: 74.124,
    name: 'Goa',
    subtitle: 'Sun, Sand & Portuguese Charm',
    location: 'Goa, India',
    state: 'Goa',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '3.4k',
    bestTimeToVisit: 'November to February',
    budget: 'Moderate',
    approxBudget: '₹15,000 – ₹30,000',
    duration: 'Week (4-7 Days)',
    ageGroup: ['Young', 'Adults', 'Families'],
    pace: 'Moderate',
    shortDescription: 'Goa is known for its beautiful beaches, vibrant nightlife, and delicious coastal cuisine.',
    fullDescription: 'Nestled along the Konkan coast, Goa blends bohemian beach life with Portuguese heritage. From golden sands lined with coconut palms to centuries-old cathedrals and lively flea markets, Goa offers an unforgettable tropical escape.',
    featured: true,
    tagline: 'India’s Beach Paradise',
    attractions: [
      {
        id: 'a1',
        name: 'Baga Beach',
        tag: 'Water Sports & Cafes',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        description: 'Vibrant shoreline renowned for parasailing, beach shacks, and golden sunsets.'
      },
      {
        id: 'a2',
        name: 'Aguada Fort',
        tag: '17th Century Fortress',
        image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=600&q=80',
        description: 'Historic Portuguese fort and lighthouse overlooking the Arabian Sea.'
      },
      {
        id: 'a3',
        name: 'Dudhsagar Falls',
        tag: 'Four-Tier Waterfall',
        image: 'https://images.unsplash.com/photo-1586053226626-febc8817769e?auto=format&fit=crop&w=600&q=80',
        description: 'Spectacular multi-tiered cascade gushing through the lush Western Ghats.'
      }
    ]
  },
  {
    id: '17',
    latitude: 11.9416,
    longitude: 79.8083,
    name: 'Pondicherry',
    subtitle: 'French Riviera of the East',
    location: 'Puducherry, India',
    state: 'Puducherry',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '2.9k',
    bestTimeToVisit: 'October to March',
    budget: 'Budget',
    approxBudget: '₹8,000 – ₹16,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Young', 'Adults', 'Seniors', 'Families'],
    pace: 'Relaxed',
    shortDescription: 'Quaint coastal town with French colonial boulevards, rocky seaside promenade, and serene spiritual ashrams.',
    fullDescription: 'Pondicherry exudes European coastal charm. Tree-lined streets with mustard-colored colonial villas, bohemian bakeries, peaceful rocky promenade facing the Bay of Bengal, and the world-renowned international township of Auroville.',
    featured: true,
    tagline: 'Coastal Bohemian Serenity',
    attractions: [
      {
        id: 'a49',
        name: 'Promenade Beach',
        tag: 'Iconic Seafront Boulevard',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        description: 'Pedestrian seafront stretch lined with French heritage statues, sea breeze, and cafes.'
      },
      {
        id: 'a50',
        name: 'Paradise Beach',
        tag: 'Golden Ferry Beach',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
        description: 'Isolated virgin island beach accessible via picturesque Chunnambar backwater boat rides.'
      },
      {
        id: 'a51',
        name: 'Auroville & French Quarter',
        tag: 'Matrimandir & Heritage',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
        description: 'Experimental universal township featuring the golden metallic dome of Matrimandir.'
      }
    ]
  },
  {
    id: '5',
    latitude: 11.6234,
    longitude: 92.7265,
    name: 'Andaman & Nicobar',
    subtitle: 'Turquoise Waters & Coral Reefs',
    location: 'Bay of Bengal, India',
    state: 'Andaman & Nicobar',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '1.9k',
    bestTimeToVisit: 'October to May',
    budget: 'Luxury',
    approxBudget: '₹40,000 – ₹70,000',
    duration: 'Week (4-7 Days)',
    ageGroup: ['Young', 'Adults', 'Families'],
    pace: 'Moderate',
    shortDescription: 'Tropical archipelago boasting untouched coral reefs, white sand beaches, and deep marine biodiversity.',
    fullDescription: 'An idyllic island paradise in the Bay of Bengal. Known for Radhanagar Beach (frequently ranked among Asia’s finest), world-class scuba diving, bio-luminescence, mangrove creeks, and historic Cellular Jail.',
    featured: false,
    tagline: 'Untouched Island Wonders',
    attractions: [
      {
        id: 'a13',
        name: 'Radhanagar Beach',
        tag: 'Asia’s Best Beach',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
        description: 'Powder-white sand, sparkling turquoise waters, and lush tropical forest backdrop.'
      },
      {
        id: 'a14',
        name: 'Elephant Beach',
        tag: 'Snorkeling & Coral Reef',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        description: 'Premier snorkeling spot with vibrant marine life, sea walking, and clear lagoons.'
      },
      {
        id: 'a15',
        name: 'Cellular Jail',
        tag: 'Historic Memorial',
        image: 'https://images.unsplash.com/photo-1590076215667-873d31295245?auto=format&fit=crop&w=600&q=80',
        description: 'National memorial monument chronicling the history of India’s freedom fighters.'
      }
    ]
  },
  {
    id: '9',
    latitude: 14.5479,
    longitude: 74.3188,
    name: 'Gokarna',
    subtitle: 'Serene Beaches & Om Sacred Shores',
    location: 'Karnataka, India',
    state: 'Karnataka',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviews: '1.6k',
    bestTimeToVisit: 'October to March',
    budget: 'Budget',
    approxBudget: '₹7,000 – ₹14,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Young', 'Adults'],
    pace: 'Relaxed',
    shortDescription: 'Laid-back coastal temple town famous for Om Beach, pristine cliffside trekking, and tranquil vibes.',
    fullDescription: 'Gokarna offers a peaceful alternative to commercial coastlines. Its coastline forms the auspicious shape of the sacred Om symbol, complemented by rustic beach huts, cliffside cafes, and untouched golden shores.',
    featured: false,
    tagline: 'Soulful Coastal Escape',
    attractions: [
      {
        id: 'a25',
        name: 'Om Beach',
        tag: 'Iconic Om Shape',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        description: 'Naturally shaped like the spiritual Om symbol with dramatic rock formations.'
      },
      {
        id: 'a26',
        name: 'Kudle Beach',
        tag: 'Sunset & Shacks',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
        description: 'Sprawling crescent beach framed by verdant cliffs and bohemian evening cafes.'
      },
      {
        id: 'a27',
        name: 'Mahabaleshwar Temple',
        tag: '4th Century Dravidian',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
        description: 'Sacred classical stone temple enshrining the legendary Atmalinga of Shiva.'
      }
    ]
  },

  // --- MOUNTAINS ---
  {
    id: '2',
    latitude: 32.2432,
    longitude: 77.1892,
    name: 'Manali',
    subtitle: 'Snow Peaks & Whispering Pines',
    location: 'Himachal Pradesh, India',
    state: 'Himachal Pradesh',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviews: '2.8k',
    bestTimeToVisit: 'March to June & Dec to Feb',
    budget: 'Moderate',
    approxBudget: '₹14,000 – ₹28,000',
    duration: 'Week (4-7 Days)',
    ageGroup: ['Young', 'Adults', 'Families'],
    pace: 'Active',
    shortDescription: 'High altitude Himalayan resort town offering scenic mountain views, snowy valleys, and alpine charm.',
    fullDescription: 'Set beside the gushing Beas River, Manali is a gateway to the high Himalayas. Famous for snow-dusted pine valleys, wooden cottages, tranquil Buddhist monasteries, and adrenaline sports in the Solang Valley.',
    featured: true,
    tagline: 'Valley of the Gods',
    attractions: [
      {
        id: 'a4',
        name: 'Solang Valley',
        tag: 'Skiing & Paragliding',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        description: 'Action-packed valley with thrilling winter sports, zorbing, and cable cars.'
      },
      {
        id: 'a5',
        name: 'Rohtang Pass',
        tag: 'Glacier Panorama',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        description: 'High mountain pass connecting Kullu to the mystical Spiti and Lahaul valleys.'
      },
      {
        id: 'a6',
        name: 'Hadimba Temple',
        tag: 'Ancient Cedar Shrine',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80',
        description: 'Pagoda-style wooden temple built in 1553 surrounded by towering deodar trees.'
      }
    ]
  },
  {
    id: '6',
    latitude: 10.0889,
    longitude: 77.0595,
    name: 'Munnar',
    subtitle: 'Rolling Emerald Tea Gardens',
    location: 'Kerala, India',
    state: 'Kerala',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '2.1k',
    bestTimeToVisit: 'September to March',
    budget: 'Moderate',
    approxBudget: '₹12,000 – ₹25,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Adults', 'Seniors', 'Families'],
    pace: 'Relaxed',
    shortDescription: 'Serene hill station blanketed in undulating tea plantations, misty peaks, and cool climate.',
    fullDescription: 'Perched in the Western Ghats of Kerala, Munnar is a haven of peace and greenery. Lush velvet hills, colonial bungalows, aromatic spice plantations, and the endangered Nilgiri Tahr mountain goats await travelers.',
    featured: false,
    tagline: 'Tea Capital of South India',
    attractions: [
      {
        id: 'a16',
        name: 'Eravikulam National Park',
        tag: 'Nilgiri Tahr Sanctuary',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
        description: 'Protected mountain habitat home to rare wildlife and rolling purple Neelakurinji blooms.'
      },
      {
        id: 'a17',
        name: 'Mattupetty Dam',
        tag: 'Scenic Lake & Boating',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
        description: 'Storage concrete gravity dam with serene lake boat rides amidst verdant tea hills.'
      },
      {
        id: 'a18',
        name: 'Tata Tea Museum',
        tag: 'Tea Heritage Center',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
        description: 'Historic demonstration factory showcasing traditional tea processing and tastings.'
      }
    ]
  },
  {
    id: '11',
    latitude: 27.041,
    longitude: 88.2663,
    name: 'Darjeeling',
    subtitle: 'Queen of the Hills & Kanchenjunga',
    location: 'West Bengal, India',
    state: 'West Bengal',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '2.5k',
    bestTimeToVisit: 'October to December & April to June',
    budget: 'Budget',
    approxBudget: '₹10,000 – ₹20,000',
    duration: 'Week (4-7 Days)',
    ageGroup: ['Young', 'Adults', 'Seniors', 'Families'],
    pace: 'Moderate',
    shortDescription: 'World-famous tea gardens, vintage Himalayan Toy Train, and glorious views of Mount Kanchenjunga.',
    fullDescription: 'Nestled in the Eastern Himalayas, Darjeeling is world-renowned for its aromatic champagne tea, British colonial estates, colorful Tibetan monasteries, and the UNESCO World Heritage mountain railway.',
    featured: false,
    tagline: 'Queen of the Himalayas',
    attractions: [
      {
        id: 'a31',
        name: 'Tiger Hill Sunrise',
        tag: 'Kanchenjunga Vista',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        description: 'Breathtaking 360-degree dawn vantage point over snow peaks bathed in golden sunlight.'
      },
      {
        id: 'a32',
        name: 'Darjeeling Himalayan Railway',
        tag: 'UNESCO Toy Train',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        description: 'Historic narrow-gauge steam engine winding through misty alpine loops and Batasia Loop.'
      },
      {
        id: 'a33',
        name: 'Happy Valley Tea Estate',
        tag: '1854 Organic Estate',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
        description: 'One of the oldest high-altitude tea plantations producing prized muscatel teas.'
      }
    ]
  },

  // --- HERITAGE ---
  {
    id: '3',
    latitude: 26.9124,
    longitude: 75.7873,
    name: 'Jaipur',
    subtitle: 'The Royal Pink City',
    location: 'Rajasthan, India',
    state: 'Rajasthan',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '4.1k',
    bestTimeToVisit: 'October to March',
    budget: 'Moderate',
    approxBudget: '₹12,000 – ₹26,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Adults', 'Seniors', 'Families', 'Young'],
    pace: 'Moderate',
    shortDescription: 'Historic royal capital celebrated for pink sandstone palaces, imposing hilltop forts, and Rajput splendor.',
    fullDescription: 'Founded in 1727, Jaipur is part of the Golden Triangle. It enchants travelers with the honeycomb façade of Hawa Mahal, the hilltop fortress of Amber, grand courtyards, colorful textiles, and authentic Rajasthani hospitality.',
    featured: true,
    tagline: 'Splendor of Royalty',
    attractions: [
      {
        id: 'a7',
        name: 'Hawa Mahal',
        tag: 'Palace of Winds',
        image: 'https://images.unsplash.com/photo-1603288940300-4b82d3e91d58?auto=format&fit=crop&w=600&q=80',
        description: 'Iconic five-storey pink facade featuring 953 intricately carved stone jharokhas.'
      },
      {
        id: 'a8',
        name: 'Amber Fort',
        tag: 'Hilltop Citadel',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
        description: 'Majestic yellow-and-pink sandstone fort boasting the famous Sheesh Mahal mirror hall.'
      },
      {
        id: 'a9',
        name: 'City Palace',
        tag: 'Royal Residence',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
        description: 'Grand complex blending Rajput and Mughal architecture with stunning courtyards.'
      }
    ]
  },
  {
    id: '7',
    latitude: 15.335,
    longitude: 76.46,
    name: 'Hampi',
    subtitle: 'Timeless UNESCO Boulders & Temples',
    location: 'Karnataka, India',
    state: 'Karnataka',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b791?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '3.1k',
    bestTimeToVisit: 'October to February',
    budget: 'Budget',
    approxBudget: '₹8,000 – ₹15,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Young', 'Adults'],
    pace: 'Active',
    shortDescription: 'Ancient capital of the Vijayanagara Empire dotted with monumental carved stone temples and boulders.',
    fullDescription: 'A UNESCO World Heritage open-air museum where history whispers through thousands of monolithic granite ruins. The surreal landscape features coracle boat rides on the Tungabhadra river, the musical pillars of Vittala, and glorious sunsets.',
    featured: false,
    tagline: 'Forgotten Empire of Stone',
    attractions: [
      {
        id: 'a19',
        name: 'Virupaksha Temple',
        tag: '7th Century Sacred Shrine',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
        description: 'Active towering temple devoted to Lord Shiva standing tall since the 7th century.'
      },
      {
        id: 'a20',
        name: 'Stone Chariot',
        tag: 'Vijaya Vittala Landmark',
        image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80',
        description: 'Legendary stone shrine carved in the shape of a procession chariot with rotating wheels.'
      },
      {
        id: 'a21',
        name: 'Lotus Mahal',
        tag: 'Indo-Islamic Gem',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
        description: 'Graceful summer palace designed with lotus bud carved arches in the Zenana enclosure.'
      }
    ]
  },

  // --- RELIGIOUS & SPIRITUAL ---
  {
    id: '15',
    latitude: 25.3176,
    longitude: 82.9739,
    name: 'Varanasi',
    subtitle: 'The Spiritual Capital of Light',
    location: 'Uttar Pradesh, India',
    state: 'Uttar Pradesh',
    category: 'Religious & Spiritual',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '4.8k',
    bestTimeToVisit: 'October to March',
    budget: 'Budget',
    approxBudget: '₹7,000 – ₹15,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Seniors', 'Adults', 'Families', 'Young'],
    pace: 'Relaxed',
    shortDescription: 'One of the world’s oldest living cities, celebrated for sacred Ganga Aarti, ghats, and Kashi Vishwanath.',
    fullDescription: 'Varanasi (Kashi) is the soulful spiritual heart of India. Sitting on the crescent curve of the Holy Ganges, the ancient city illuminates with evening oil lamps, chanting priests during Maha Aarti, sunrise boat rituals, and sacred temples.',
    featured: true,
    tagline: 'City of Eternal Moksha',
    attractions: [
      {
        id: 'a43',
        name: 'Dashashwamedh Ghat Aarti',
        tag: 'Mesmerizing Fire Ritual',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
        description: 'Grand evening prayer ritual with synchronized brass lamps, incense, and conch shells.'
      },
      {
        id: 'a44',
        name: 'Kashi Vishwanath Temple',
        tag: 'Golden Temple of Shiva',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
        description: 'One of the 12 sacred Jyotirlingas featuring magnificent 800-kg gold leaf spires.'
      },
      {
        id: 'a45',
        name: 'Assi Ghat Sunrise Boat Cruise',
        tag: 'Sacred Dawn Rowing',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        description: 'Early morning traditional wooden boat journey past 84 stone ghats in morning mist.'
      }
    ]
  },
  {
    id: '18',
    latitude: 13.6288,
    longitude: 79.4192,
    name: 'Tirupati',
    subtitle: 'Sacred Abode of Lord Venkateswara',
    location: 'Andhra Pradesh, India',
    state: 'Andhra Pradesh',
    category: 'Religious & Spiritual',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '5.6k',
    bestTimeToVisit: 'September to March',
    budget: 'Budget',
    approxBudget: '₹6,000 – ₹14,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Seniors', 'Families', 'Adults'],
    pace: 'Relaxed',
    shortDescription: 'The world-famous sacred Tirumala hill temple dedicated to Lord Balaji, surrounded by holy waterfalls.',
    fullDescription: 'Perched high in the Seshachalam Hills, Tirupati is one of the most visited pilgrimage destinations on earth. Millions travel to seek blessings at the golden Ananda Nilayam tower of Sri Venkateswara Temple, taste authentic Tirupati Laddu Prasadam, and hike the sacred steps of Alipiri.',
    featured: true,
    tagline: 'Divine Hills of Kaliyuga',
    attractions: [
      {
        id: 'a52',
        name: 'Sri Venkateswara Temple',
        tag: 'Golden Ananda Nilayam',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
        description: 'Ancient Dravidian masterpiece atop the 7 sacred peaks of Tirumala.'
      },
      {
        id: 'a53',
        name: 'Kapila Theertham Falls',
        tag: 'Sacred Shiva Waterfalls',
        image: 'https://images.unsplash.com/photo-1586053226626-febc8817769e?auto=format&fit=crop&w=600&q=80',
        description: 'Holy waterfall cascade flowing directly into a sacred temple tank at foot of hills.'
      },
      {
        id: 'a54',
        name: 'Sri Padmavathi Ammavari Temple',
        tag: 'Tiruchanur Goddess Shrine',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
        description: 'Serene temple dedicated to Goddess Padmavathi, consort of Lord Venkateswara.'
      }
    ]
  },
  {
    id: '16',
    latitude: 31.634,
    longitude: 74.8723,
    name: 'Amritsar',
    subtitle: 'Golden Temple & Living Heritage',
    location: 'Punjab, India',
    state: 'Punjab',
    category: 'Religious & Spiritual',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '4.4k',
    bestTimeToVisit: 'October to March',
    budget: 'Budget',
    approxBudget: '₹8,000 – ₹16,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Seniors', 'Adults', 'Families', 'Young'],
    pace: 'Relaxed',
    shortDescription: 'Home to the magnificent gilded Harmandir Sahib (Golden Temple), holy nectar pool, and warm Punjabi culture.',
    fullDescription: 'Amritsar is the spiritual and cultural center of the Sikh community. The Golden Temple gleams in the center of the Amrit Sarovar lake, serving free meals to over 100,000 visitors every day through the world’s largest community kitchen (Langar).',
    featured: false,
    tagline: 'Gilded Sanctuary of Peace',
    attractions: [
      {
        id: 'a46',
        name: 'Sri Harmandir Sahib',
        tag: 'The Golden Temple',
        image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
        description: 'Pure gold-plated spiritual sanctum surrounded by the sacred pool of nectar.'
      },
      {
        id: 'a47',
        name: 'Wagah Border Ceremony',
        tag: 'Electrifying Beating Retreat',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
        description: 'High-energy military parade and flag-lowering ceremony at the Indo-Pak border.'
      },
      {
        id: 'a48',
        name: 'Jallianwala Bagh',
        tag: 'Historic Memorial Park',
        image: 'https://images.unsplash.com/photo-1590076215667-873d31295245?auto=format&fit=crop&w=600&q=80',
        description: 'Solemn national memorial preserving the historic Martyrs’ Well and bullet marks.'
      }
    ]
  },

  // --- ADVENTURE ---
  {
    id: '4',
    latitude: 30.0869,
    longitude: 78.2676,
    name: 'Rishikesh',
    subtitle: 'River Rapids & Himalayan Serenity',
    location: 'Uttarakhand, India',
    state: 'Uttarakhand',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '2.5k',
    bestTimeToVisit: 'September to November & March to May',
    budget: 'Budget',
    approxBudget: '₹7,000 – ₹15,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Young', 'Adults'],
    pace: 'Active',
    shortDescription: 'World capital of Yoga and premier adventure destination on the banks of the turquoise holy Ganges.',
    fullDescription: 'Tucked at the Himalayan foothills where the emerald Ganges flows through steep river valleys. Rishikesh is legendary for adrenaline-filled river rafting, suspension bridges, cliff jumping, peaceful ashrams, and magical evening Ganga Aarti.',
    featured: true,
    tagline: 'Adventure on the Ganges',
    attractions: [
      {
        id: 'a10',
        name: 'Ganga White Water Rafting',
        tag: 'Grade III & IV Rapids',
        image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80',
        description: 'World-class white water rafting navigating famous rapids like Roller Coaster.'
      },
      {
        id: 'a11',
        name: 'Lakshman Jhula',
        tag: 'Historic Suspension Bridge',
        image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
        description: 'Famous 450-foot iron suspension bridge spanning across the sacred river.'
      },
      {
        id: 'a12',
        name: 'Mohan Chatti Bungee',
        tag: 'India’s Highest Bungee',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80',
        description: 'Heart-pumping 83-meter plunge over a rocky river canyon with certified masters.'
      }
    ]
  },
  {
    id: '8',
    latitude: 34.1526,
    longitude: 77.5771,
    name: 'Leh-Ladakh',
    subtitle: 'The Land of High Passes',
    location: 'Ladakh, India',
    state: 'Ladakh',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '3.7k',
    bestTimeToVisit: 'May to September',
    budget: 'Luxury',
    approxBudget: '₹35,000 – ₹60,000',
    duration: 'Extended (8+ Days)',
    ageGroup: ['Young', 'Adults'],
    pace: 'Active',
    shortDescription: 'High-altitude desert encircled by jagged peaks, crystal blue alpine lakes, and dramatic passes.',
    fullDescription: 'An otherworldly high-altitude adventure destination offering the highest motorable roads on earth, crystal clear Pangong Tso lake reflecting changing azure hues, white sand dunes of Nubra, and centuries-old Tibetan Buddhist gompas.',
    featured: true,
    tagline: 'Roof of the World',
    attractions: [
      {
        id: 'a22',
        name: 'Pangong Tso Lake',
        tag: 'Color-Changing Salt Lake',
        image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80',
        description: 'Endorheic lake at 14,270 ft that shifts shades from cerulean blue to turquoise green.'
      },
      {
        id: 'a23',
        name: 'Khardung La Pass',
        tag: 'High-Altitude Pass (17,582 ft)',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        description: 'Iconic gateway to the Shyok and Nubra valleys, revered by bikers and road trippers.'
      },
      {
        id: 'a24',
        name: 'Nubra Valley',
        tag: 'Double-Humped Camels & Dunes',
        image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
        description: 'Cold desert valley famous for Bactrian camels, sand dunes, and Diskit Monastery.'
      }
    ]
  },

  // --- WILDLIFE ---
  {
    id: '14',
    latitude: 29.53,
    longitude: 78.7747,
    name: 'Jim Corbett National Park',
    subtitle: 'Kingdom of the Royal Bengal Tiger',
    location: 'Uttarakhand, India',
    state: 'Uttarakhand',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '3.1k',
    bestTimeToVisit: 'November to June',
    budget: 'Moderate',
    approxBudget: '₹14,000 – ₹28,000',
    duration: 'Weekend (2-3 Days)',
    ageGroup: ['Young', 'Adults', 'Families', 'Seniors'],
    pace: 'Moderate',
    shortDescription: 'India’s oldest national park renowned for thrilling tiger safaris, sal forests, and elephant herds.',
    fullDescription: 'Established in 1936, Jim Corbett is the birthplace of Project Tiger. Spanning riverside grasslands, dense sal forests, and foothills of the Himalayas, visitors encounter Royal Bengal tigers, wild Asian elephants, and over 600 species of birds.',
    featured: true,
    tagline: 'Wild Heart of Kumaon',
    attractions: [
      {
        id: 'a40',
        name: 'Dhikala Safari Zone',
        tag: 'Core Tiger Territory',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80',
        description: 'Vast riverine grassland offering unmatched sightings of Bengal tigers and wild tuskers.'
      },
      {
        id: 'a41',
        name: 'Corbett Waterfall',
        tag: '66-ft Forest Cascade',
        image: 'https://images.unsplash.com/photo-1586053226626-febc8817769e?auto=format&fit=crop&w=600&q=80',
        description: 'Scenic forest waterfall nestled amidst teak groves and refreshing natural pools.'
      },
      {
        id: 'a42',
        name: 'Ramganga River Watchtowers',
        tag: 'Gharial & Bird Watching',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
        description: 'Prime crocodile, gharial, and migratory water bird observation along the river.'
      }
    ]
  }
];
