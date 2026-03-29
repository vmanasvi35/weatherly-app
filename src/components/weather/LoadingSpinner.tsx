import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-20 gap-4"
  >
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
    <p className="text-muted-foreground text-sm">Fetching weather data...</p>
  </motion.div>
);

export default LoadingSpinner;
