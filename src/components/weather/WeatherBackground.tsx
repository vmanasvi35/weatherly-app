interface Props {
  category: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | null;
  isNight: boolean;
}

const WeatherBackground = ({ category, isNight }: Props) => {
  const themeClass = isNight
    ? 'night'
    : category === 'rainy'
      ? 'rainy'
      : category === 'snowy'
        ? 'cold'
        : category === 'cloudy'
          ? 'cloudy'
          : category === 'stormy'
            ? 'stormy'
            : 'sunny';

  return (
    <div className={`weather-scene fixed inset-0 -z-10 ${themeClass}`}>
      {!isNight && category === 'sunny' && (
        <>
          <div className="sun-glow absolute right-8 top-8 h-64 w-64 rounded-full blur-3xl" />
          <div className="absolute right-20 top-20 h-28 w-28 rounded-full bg-white/30 blur-xl" />
        </>
      )}
      {isNight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff22,transparent_34%)]" />
          <div className="absolute right-16 top-14 h-28 w-28 rounded-full bg-white/12 blur-2xl" />
        </>
      )}
      {(category === 'rainy' || category === 'stormy') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="raindrop absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.45 + Math.random() * 0.3}s`,
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
              className="cloud-drift absolute rounded-full bg-white/20 blur-xl"
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
              className="snow-fall absolute rounded-full bg-white/90 shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}
      {category === 'stormy' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-full w-px animate-pulse bg-white/25" />
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
