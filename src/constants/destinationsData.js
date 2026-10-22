export const categories = [
  'All',
  'Beaches',
  'Mountains',
  'Heritage',
  'Adventure'
];

export const destinationsData = [
  {
    id: '1',
    name: 'Goa',
    subtitle: 'Sun, Sand & Portuguese Charm',
    location: 'Goa, India',
    state: 'Goa',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '3.4k',
    bestTimeToVisit: 'November to February',
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
    id: '2',
    name: 'Manali',
    subtitle: 'Snow Peaks & Whispering Pines',
    location: 'Himachal Pradesh, India',
    state: 'Himachal Pradesh',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviews: '2.8k',
    bestTimeToVisit: 'March to June & Dec to Feb',
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
    id: '3',
    name: 'Jaipur',
    subtitle: 'The Royal Pink City',
    location: 'Rajasthan, India',
    state: 'Rajasthan',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '4.1k',
    bestTimeToVisit: 'October to March',
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
    id: '4',
    name: 'Rishikesh',
    subtitle: 'River Rapids & Himalayan Serenity',
    location: 'Uttarakhand, India',
    state: 'Uttarakhand',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '2.5k',
    bestTimeToVisit: 'September to November & March to May',
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
    id: '5',
    name: 'Andaman & Nicobar',
    subtitle: 'Turquoise Waters & Coral Reefs',
    location: 'Andaman & Nicobar Islands',
    state: 'Andaman & Nicobar',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '1.9k',
    bestTimeToVisit: 'October to May',
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
    id: '6',
    name: 'Munnar',
    subtitle: 'Rolling Emerald Tea Gardens',
    location: 'Kerala, India',
    state: 'Kerala',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: '2.1k',
    bestTimeToVisit: 'September to March',
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
    id: '7',
    name: 'Hampi',
    subtitle: 'Timeless UNESCO Boulders & Temples',
    location: 'Karnataka, India',
    state: 'Karnataka',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b791?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '3.1k',
    bestTimeToVisit: 'October to February',
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
  {
    id: '8',
    name: 'Leh-Ladakh',
    subtitle: 'The Land of High Passes',
    location: 'Ladakh, India',
    state: 'Ladakh',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: '3.7k',
    bestTimeToVisit: 'May to September',
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
  }
];
