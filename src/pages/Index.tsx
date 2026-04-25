import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDarkMode } from '@/hooks/useDarkMode';
import { fetchWeather, fetchHistory, getWeatherCategory } from '@/lib/weather-api';
import type { WeatherData, ForecastDay } from '@/lib/weather-api';
import Header from '@/components/weather/Header';
import SearchBar from '@/components/weather/SearchBar';
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard';
import ForecastSection from '@/components/weather/ForecastSection';
import PastWeatherSection from '@/components/weather/PastWeatherSection';
import WeatherBackground from '@/components/weather/WeatherBackground';
import LoadingSpinner from '@/components/weather/LoadingSpinner';
import ErrorMessage from '@/components/weather/ErrorMessage';

interface CachedWeatherResult {
  weatherData: WeatherData;
  pastDay: ForecastDay | null;
}

declare global {
  interface Window {
    currentWeatherContext?: {
      weatherData: WeatherData | null;
      pastDay: ForecastDay | null;
      error: string | null;
      updatedAt: string | null;
    };
  }
}

const Index = () => {
  const { isDark, toggle } = useDarkMode();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [pastDay, setPastDay] = useState<ForecastDay | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPastLoading, setIsPastLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchCacheRef = useRef<Record<string, CachedWeatherResult>>({});
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const weatherCategory = weatherData
    ? getWeatherCategory(weatherData.current.condition.code)
    : null;
  const isNight = weatherData ? weatherData.current.is_day === 0 : false;

  const executeWeatherSearch = useCallback(async (query: string) => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;

    const cacheKey = normalizedQuery.toLowerCase();
    const cachedResult = searchCacheRef.current[cacheKey];

    if (cachedResult) {
      setError(null);
      setWeatherData(cachedResult.weatherData);
      setPastDay(cachedResult.pastDay);
      setIsLoading(false);
      setIsPastLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPastDay(null);

    try {
      const data = await fetchWeather(normalizedQuery);
      setWeatherData(data);

      setIsPastLoading(true);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];
      let yesterdayForecast: ForecastDay | null = null;

      try {
        const historyData = await fetchHistory(normalizedQuery, dateStr);
        yesterdayForecast = historyData.forecast.forecastday[0] || null;
        setPastDay(yesterdayForecast);
      } catch {
        setPastDay(null);
      } finally {
        setIsPastLoading(false);
      }

      searchCacheRef.current[cacheKey] = {
        weatherData: data,
        pastDay: yesterdayForecast,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setWeatherData(null);
      setIsPastLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadWeather = useCallback((query: string) => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      executeWeatherSearch(normalizedQuery);
    }, 500);
  }, [executeWeatherSearch]);

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
      },
      () => {
        setError('Location access denied. Please search manually.');
      }
    );
  }, [loadWeather]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.currentWeatherContext = {
      weatherData,
      pastDay,
      error,
      updatedAt: weatherData ? new Date().toISOString() : null,
    };
  }, [weatherData, pastDay, error]);

  return (
    <div className="min-h-screen relative">
      <WeatherBackground category={weatherCategory} isNight={isNight} />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="weather-card weather-shell">
          <Header isDark={isDark} onToggle={toggle} />

          <div className="mt-4 mb-8">
            <SearchBar onSearch={loadWeather} onUseLocation={handleUseLocation} isLoading={isLoading} />
          </div>

          <AnimatePresence mode="wait">
            {isLoading && <LoadingSpinner key="loading" />}
            {error && !isLoading && <ErrorMessage key="error" message={error} />}
            {weatherData && !isLoading && !error && (
              <div key="content" className="flex flex-col gap-6 px-2 pb-2 sm:px-4">
                <CurrentWeatherCard data={weatherData} />
                <ForecastSection days={weatherData.forecast.forecastday} />
                <PastWeatherSection day={pastDay} isLoading={isPastLoading} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
