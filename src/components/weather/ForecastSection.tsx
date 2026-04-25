import { motion } from 'framer-motion';
import type { ForecastDay } from '@/lib/weather-api';

interface Props {
  days: ForecastDay[];
}

const ForecastSection = ({ days }: Props) => {
  // Skip first day (today), show next 3
  const futureDays = days.slice(1);
  if (futureDays.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mx-auto w-full max-w-3xl"
    >
      <h3 className="section-title mb-3">3-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {futureDays.map((day) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div key={day.date} className="weather-panel p-5 text-center">
              <p className="text-sm font-semibold text-white">{dayName}</p>
              <p className="text-xs text-white/60">{dateStr}</p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="w-14 h-14 mx-auto my-2"
              />
              <p className="mb-2 text-xs text-white/70">{day.day.condition.text}</p>
              <div className="flex justify-center gap-2 text-sm">
                <span className="font-bold text-white">{Math.round(day.day.maxtemp_c)}°</span>
                <span className="text-white/65">{Math.round(day.day.mintemp_c)}°</span>
              </div>
              <p className="mt-2 text-xs text-white/80">Rain {day.day.daily_chance_of_rain}%</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ForecastSection;
