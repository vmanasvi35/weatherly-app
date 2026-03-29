import { useMemo } from 'react';

interface Props {
  category: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | null;
  bgClass?: string;
}   

const WeatherBackground = ({ category, bgClass }: Props) => {
  console.log('WeatherBackground category:', category); // Debug log
  const gradientBg = useMemo(() => {
    switch (category) {
      case 'sunny': return 'from-sky-300 via-amber-200 to-orange-200 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900';
      case 'cloudy': return 'from-slate-300 via-gray-300 to-blue-200 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900';
      case 'rainy': return 'from-slate-400 via-blue-300 to-gray-400 dark:from-slate-900 dark:via-blue-950 dark:to-gray-900';
      case 'snowy': return 'from-blue-100 via-white to-slate-200 dark:from-slate-800 dark:via-blue-950 dark:to-slate-900';
      case 'stormy': return 'from-gray-500 via-slate-500 to-gray-600 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950';
      default: return 'from-sky-200 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900';
    }
  }, [category]);

  const finalBg = bgClass || `bg-gradient-to-br ${gradientBg}`;

  return (
    <div className={`fixed inset-0 ${finalBg} transition-all duration-1000 -z-10`}>
      {category === 'sunny' && (
        <>
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-yellow-300/40 sun-pulse blur-2xl" />
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-yellow-400/60 blur-xl" />
        </>
      )}
      {category === 'rainy' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-10 bg-blue-500/70 rounded-full rain-drop"
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
              className="absolute bg-white/40 dark:bg-white/5 rounded-full cloud-drift blur-xl"
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
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/90 shadow-lg rounded-full snow-fall"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${200 + i * 100}px`,
                height: `${80 + i * 30}px`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}
      {category === 'stormy' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-1 h-full bg-white/20 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
