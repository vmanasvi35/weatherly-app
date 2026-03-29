import { useState, useCallback, useEffect } from 'react';
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

const Index = () => {
  const { isDark, toggle } = useDarkMode();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [pastDay, setPastDay] = useState<ForecastDay | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPastLoading, setIsPastLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weatherCategory = weatherData
    ? getWeatherCategory(weatherData.current.condition.code)
    : null;

  const loadWeather = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setPastDay(null);
    try {
      const data = await fetchWeather(query);
      setWeatherData(data);

      // Fetch yesterday's weather
      setIsPastLoading(true);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];
      try {
        const historyData = await fetchHistory(query, dateStr);
        setPastDay(historyData.forecast.forecastday[0] || null);
      } catch {
        setPastDay(null);
      }
      setIsPastLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  // Load default city on mount
  useEffect(() => {
    loadWeather('London');
  }, [loadWeather]);

  return (
    <div className="min-h-screen relative">
      <WeatherBackground category={weatherCategory} />
      <div className="relative z-10 max-w-4xl mx-auto pb-12">
        <Header isDark={isDark} onToggle={toggle} />

        <div className="mt-4 mb-8">
          <SearchBar onSearch={loadWeather} onUseLocation={handleUseLocation} isLoading={isLoading} />
        </div>

        <AnimatePresence mode="wait">
          {isLoading && <LoadingSpinner key="loading" />}
          {error && !isLoading && <ErrorMessage key="error" message={error} />}
          {weatherData && !isLoading && !error && (
            <div key="content" className="flex flex-col gap-6 px-4">
              <CurrentWeatherCard data={weatherData} />
              <ForecastSection days={weatherData.forecast.forecastday} />
              <PastWeatherSection day={pastDay} isLoading={isPastLoading} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
