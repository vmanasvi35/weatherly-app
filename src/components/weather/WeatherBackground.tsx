import { useMemo } from 'react';

interface Props {
  category: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | null;
}

const WeatherBackground = ({ category }: Props) => {
  const bgClass = useMemo(() => {
    switch (category) {
      case 'sunny': return 'from-sky-300 via-amber-200 to-orange-200 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900';
      case 'cloudy': return 'from-slate-300 via-gray-300 to-blue-200 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900';
      case 'rainy': return 'from-slate-400 via-blue-300 to-gray-400 dark:from-slate-900 dark:via-blue-950 dark:to-gray-900';
      case 'snowy': return 'from-blue-100 via-white to-slate-200 dark:from-slate-800 dark:via-blue-950 dark:to-slate-900';
      case 'stormy': return 'from-gray-500 via-slate-500 to-gray-600 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950';
      default: return 'from-sky-200 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900';
    }
  }, [category]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${bgClass} transition-all duration-1000 -z-10`}>
      {category === 'sunny' && (
        <div className="absolute top-16 right-16 w-48 h-48 rounded-full bg-amber-300/30 dark:bg-amber-500/10 sun-pulse blur-3xl" />
      )}
      {category === 'rainy' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-6 bg-blue-400/30 dark:bg-blue-300/20 rounded-full rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.8 + Math.random() * 0.6}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
      {category === 'cloudy' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute bg-white/20 dark:bg-white/5 rounded-full cloud-drift blur-xl"
              style={{
                width: `${150 + i * 80}px`,
                height: `${60 + i * 20}px`,
                top: `${10 + i * 15}%`,
                animationDuration: `${20 + i * 10}s`,
                animationDelay: `${i * 5}s`,
              }}
            />
          ))}
        </div>
      )}
      {category === 'snowy' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/60 rounded-full snow-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
