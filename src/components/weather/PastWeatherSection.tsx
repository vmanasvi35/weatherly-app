import { motion } from 'framer-motion';
import type { ForecastDay } from '@/lib/weather-api';

interface Props {
  day: ForecastDay | null;
  isLoading: boolean;
}

const PastWeatherSection = ({ day, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto w-full px-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Yesterday</h3>
        <div className="glass-card p-6 animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-3" />
          <div className="h-8 bg-muted rounded w-1/4" />
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
      className="max-w-xl mx-auto w-full px-4"
    >
      <h3 className="text-lg font-semibold text-foreground mb-3">Yesterday</h3>
      <div className="glass-card p-6 flex items-center gap-5">
        <img
          src={`https:${day.day.condition.icon}`}
          alt={day.day.condition.text}
          className="w-16 h-16"
        />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{dateStr}</p>
          <p className="text-sm text-muted-foreground">{day.day.condition.text}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-foreground font-bold">{Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°</span>
            <span className="text-muted-foreground">💧 {day.day.avghumidity}%</span>
            <span className="text-muted-foreground">💨 {Math.round(day.day.maxwind_kph)} km/h</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PastWeatherSection;
