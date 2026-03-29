import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass-card p-6 max-w-md mx-auto text-center"
  >
    <AlertTriangle className="w-10 h-10 text-accent mx-auto mb-3" />
    <p className="text-foreground font-medium">{message}</p>
    <p className="text-sm text-muted-foreground mt-1">Try searching for another city.</p>
  </motion.div>
);

export default ErrorMessage;
