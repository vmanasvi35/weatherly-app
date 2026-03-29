import { Droplets, Wind, Eye, Thermometer, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WeatherData } from '@/lib/weather-api';

interface Props {
  data: WeatherData;
}

const StatItem = ({ icon: Icon, label, value }: { icon: typeof Droplets; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3">
    <Icon className="w-5 h-5 text-primary shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
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
      className="glass-card-elevated p-8 max-w-xl mx-auto w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">{location.name}</h2>
        <p className="text-sm text-muted-foreground">{location.region}, {location.country}</p>
        <p className="text-xs text-muted-foreground mt-1">{location.localtime}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="w-20 h-20"
        />
        <div>
          <p className="text-6xl font-bold text-foreground">{Math.round(current.temp_c)}°</p>
          <p className="text-sm text-muted-foreground">{current.condition.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 rounded-xl bg-secondary/50 p-2">
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
