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
    className="flex items-center justify-between px-6 py-4"
  >
    <div className="flex items-center gap-3">
      <CloudSun className="w-8 h-8 text-primary" />
      <h1 className="text-2xl font-bold text-foreground">WeatherNow</h1>
    </div>
    <button
      onClick={onToggle}
      className="p-3 rounded-xl glass-card hover:scale-105 transition-transform text-foreground"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  </motion.header>
);

export default Header;
