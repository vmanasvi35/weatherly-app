import { Droplets, Wind, Eye, Thermometer, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WeatherData } from '@/lib/weather-api';

interface Props {
  data: WeatherData;
}

const StatItem = ({ icon: Icon, label, value }: { icon: typeof Droplets; label: string; value: string }) => (
  <div className="weather-stat">
    <Icon className="h-5 w-5 shrink-0 text-white/90" />
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  </div>
);

const CurrentWeatherCard = ({ data }: Props) => {
  const { location, current, forecast } = data;
  const today = forecast.forecastday[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="weather-panel mx-auto w-full max-w-3xl p-6 sm:p-8"
    >
      <div className="mb-6 text-center">
        <h2 className="city">{location.name}</h2>
        <p className="text-sm text-white/70">{location.region}, {location.country}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/55">{location.localtime}</p>
      </div>

      <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="h-24 w-24 drop-shadow-[0_10px_22px_rgba(255,255,255,0.2)]"
        />
        <div>
          <p className="temp">{Math.round(current.temp_c)}°</p>
          <p className="text-base font-medium text-white/80">{current.condition.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-[24px] bg-white/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:grid-cols-2 lg:grid-cols-3">
        <StatItem icon={Thermometer} label="Feels Like" value={`${Math.round(current.feelslike_c)}°C`} />
        <StatItem icon={Droplets} label="Humidity" value={`${current.humidity}%`} />
        <StatItem icon={Wind} label="Wind" value={`${current.wind_kph} km/h`} />
        <StatItem icon={Eye} label="Visibility" value={`${current.vis_km} km`} />
        <StatItem icon={Sunrise} label="Sunrise" value={today?.astro.sunrise || '—'} />
        <StatItem icon={Sunset} label="Sunset" value={today?.astro.sunset || '—'} />
      </div>
    </motion.div>
  );
};

export default CurrentWeatherCard;
