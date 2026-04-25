import { motion } from 'framer-motion';
import type { ForecastDay } from '@/lib/weather-api';

interface Props {
  day: ForecastDay | null;
  isLoading: boolean;
}

const PastWeatherSection = ({ day, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <h3 className="section-title mb-3">Yesterday</h3>
        <div className="weather-panel animate-pulse p-6">
          <div className="mb-3 h-4 w-1/3 rounded bg-white/20" />
          <div className="h-8 w-1/4 rounded bg-white/20" />
        </div>
      </div>
    );
  }

  if (!day) return null;

  const date = new Date(day.date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="mx-auto w-full max-w-3xl"
    >
      <h3 className="section-title mb-3">Yesterday</h3>
      <div className="weather-panel flex items-center gap-5 p-6">
        <img
          src={`https:${day.day.condition.icon}`}
          alt={day.day.condition.text}
          className="w-16 h-16"
        />
        <div className="flex-1">
          <p className="text-sm text-white/65">{dateStr}</p>
          <p className="text-sm text-white/75">{day.day.condition.text}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="font-bold text-white">{Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°</span>
            <span className="text-white/65">Humidity {day.day.avghumidity}%</span>
            <span className="text-white/65">Wind {Math.round(day.day.maxwind_kph)} km/h</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PastWeatherSection;
