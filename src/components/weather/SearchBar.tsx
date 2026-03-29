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
      className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto px-4"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl glass-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
        <button
          type="button"
          onClick={onUseLocation}
          disabled={isLoading}
          className="px-4 py-3.5 rounded-xl glass-card hover:scale-105 transition-transform text-foreground disabled:opacity-50"
          title="Use my location"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
