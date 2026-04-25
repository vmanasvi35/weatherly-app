import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onUseLocation, isLoading }: Props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search city..."
          className="weather-input w-full rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="flex items-center gap-2 rounded-2xl bg-white/18 px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all hover:bg-white/24 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
        <button
          type="button"
          onClick={onUseLocation}
          disabled={isLoading}
          className="weather-panel rounded-2xl px-4 py-3.5 text-white transition-transform hover:scale-105 disabled:opacity-50"
          title="Use my location"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
