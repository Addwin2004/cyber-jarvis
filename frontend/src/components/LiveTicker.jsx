import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function LiveTicker({ items }) {
  const alerts = items.filter(i => i.threat_level === 'CRITICAL').map(i => i.title);
  if (alerts.length === 0) alerts.push("SYSTEM NORMAL", "NO CRITICAL THREATS DETECTED", "SCANNING PERIMETER...");

  return (
    <div className="w-full bg-deep-space border-b border-cyber-cyan/30 py-2 flex items-center overflow-hidden h-12 relative z-10">
      <div className="px-4 flex items-center text-alert-orange gap-2 whitespace-nowrap z-20 bg-deep-space relative min-w-[200px] border-r border-cyber-cyan/30">
        <AlertCircle size={18} className="animate-pulse" />
        <span className="font-bold tracking-widest text-sm glow-orange">GLOBAL THREAT LEVEL:</span>
      </div>
      <div className="flex-1 relative overflow-hidden flex pl-4">
        <motion.div
          className="flex whitespace-nowrap gap-10 text-alert-orange"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...alerts, ...alerts, ...alerts, ...alerts].map((text, i) => (
             <span key={i} className="text-sm tracking-wide">&gt;&gt;&gt; {text.toUpperCase()}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
