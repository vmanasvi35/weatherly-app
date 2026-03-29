const API_KEY = import.meta.env.VITE_API_KEY || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  condition: WeatherCondition;
  uv: number;
  vis_km: number;
  pressure_mb: number;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: WeatherCondition;
    daily_chance_of_rain: number;
    avghumidity: number;
    maxwind_kph: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
  };
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export async function fetchWeather(query: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('API key not configured. Please set VITE_API_KEY.');
  }
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=4&aqi=no`
  );
  if (!res.ok) {
    if (res.status === 400) throw new Error('City not found');
    throw new Error('Failed to fetch weather data');
  }
  return res.json();
}

export async function fetchHistory(query: string, date: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('API key not configured. Please set VITE_API_KEY.');
  }
  const res = await fetch(
    `${BASE_URL}/history.json?key=${API_KEY}&q=${encodeURIComponent(query)}&dt=${date}`
  );
  if (!res.ok) throw new Error('Failed to fetch history data');
  return res.json();
}

export function getWeatherCategory(code: number): 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' {
  if ([1000].includes(code)) return 'sunny';
  if ([1003, 1006, 1009, 1030, 1135, 1147].includes(code)) return 'cloudy';
  if ([1063, 1066, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) return 'rainy';
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(code)) return 'snowy';
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 'stormy';
  return 'cloudy';
}
