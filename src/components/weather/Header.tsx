import { Sun, Moon, CloudSun } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  isDark: boolean;
  onToggle: () => void;
}

const Header = ({ isDark, onToggle }: Props) => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between px-2 py-2 sm:px-4"
  >
    <div className="flex items-center gap-3">
      <CloudSun className="h-8 w-8 text-white" />
      <h1 className="text-2xl font-bold tracking-tight text-white">WeatherNow</h1>
    </div>
    <button
      onClick={onToggle}
      className="weather-panel rounded-2xl p-3 text-white transition-transform hover:scale-105"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  </motion.header>
);

export default Header;
