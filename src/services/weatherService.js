// Open-Meteo Free Public Weather API Service (No API Key Required)
const weatherCodeMap = {
  0: { label: 'Clear Sky', icon: 'sunny-outline' },
  1: { label: 'Mainly Clear', icon: 'partly-sunny-outline' },
  2: { label: 'Partly Cloudy', icon: 'partly-sunny-outline' },
  3: { label: 'Overcast', icon: 'cloud-outline' },
  45: { label: 'Foggy', icon: 'cloud-outline' },
  48: { label: 'Depositing Rime Fog', icon: 'cloud-outline' },
  51: { label: 'Light Drizzle', icon: 'rainy-outline' },
  53: { label: 'Moderate Drizzle', icon: 'rainy-outline' },
  55: { label: 'Dense Drizzle', icon: 'rainy-outline' },
  61: { label: 'Slight Rain', icon: 'rainy-outline' },
  63: { label: 'Moderate Rain', icon: 'rainy-outline' },
  65: { label: 'Heavy Rain', icon: 'thunderstorm-outline' },
  71: { label: 'Slight Snow', icon: 'snow-outline' },
  73: { label: 'Moderate Snow', icon: 'snow-outline' },
  75: { label: 'Heavy Snow', icon: 'snow-outline' },
  80: { label: 'Passing Showers', icon: 'rainy-outline' },
  81: { label: 'Moderate Showers', icon: 'rainy-outline' },
  82: { label: 'Violent Showers', icon: 'thunderstorm-outline' },
  95: { label: 'Thunderstorm', icon: 'thunderstorm-outline' },
};

export const fetchLiveWeather = async (latitude, longitude, fallbackCategory = 'Beaches') => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    const current = data.current;

    const code = current.weather_code ?? 0;
    const weatherInfo = weatherCodeMap[code] || {
      label: 'Pleasant',
      icon: 'partly-sunny-outline',
    };

    return {
      success: true,
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      condition: weatherInfo.label,
      iconName: weatherInfo.icon,
      isLive: true,
    };
  } catch (error) {
    console.warn('Weather API failed, using regional climate estimation:', error);

    // Realistic regional fallback based on category
    let temp = 28;
    let condition = 'Warm & Breezy';
    let icon = 'sunny-outline';

    if (fallbackCategory === 'Mountains') {
      temp = 14;
      condition = 'Cool Mountain Mist';
      icon = 'cloud-outline';
    } else if (fallbackCategory === 'Adventure' && latitude > 30) {
      temp = 8;
      condition = 'Crisp Alpine Wind';
      icon = 'snow-outline';
    } else if (fallbackCategory === 'Beaches') {
      temp = 30;
      condition = 'Sunny Coastal Breeze';
      icon = 'sunny-outline';
    } else if (fallbackCategory === 'Religious & Spiritual') {
      temp = 26;
      condition = 'Clear & Pleasant';
      icon = 'sunny-outline';
    }

    return {
      success: true,
      temperature: temp,
      humidity: 55,
      windSpeed: 12,
      condition,
      iconName: icon,
      isLive: false,
    };
  }
};
