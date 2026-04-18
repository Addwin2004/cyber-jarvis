import { motion } from 'framer-motion';
import { ShieldAlert, Shield, ShieldQuestion } from 'lucide-react';

export default function NewsCard({ item, onClick }) {
  const isCritical = item.threat_level === 'CRITICAL';
  const Icon = isCritical ? ShieldAlert : (item.threat_level === 'HIGH' ? Shield : ShieldQuestion);

  return (
    <motion.div 
      className="card p-4 rounded-sm cursor-pointer relative overflow-hidden group h-full flex flex-col justify-between"
      onClick={() => onClick(item)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute top-0 right-0 p-2">
        <Icon size={24} className={isCritical ? 'text-alert-orange glow-orange animate-pulse' : 'text-cyber-cyan glow'} />
      </div>
      <div>
        <div className="text-xs text-cyber-cyan/70 mb-2 font-mono">{(new Date(item.timestamp)).toLocaleString()} | {item.source.toUpperCase()}</div>
        <h3 className={`text-lg font-bold pr-6 leading-tight ${isCritical ? 'text-alert-orange glow-orange' : 'text-cyber-cyan glow'} mb-4`}>
          {item.title}
        </h3>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className={`px-2 py-1 text-[10px] font-bold border tracking-widest ${isCritical ? 'border-alert-orange text-alert-orange' : 'border-cyber-cyan text-cyber-cyan'}`}>
          [{item.threat_level}]
        </span>
        <span className="text-xs text-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors tracking-widest font-bold">ANALYZE &gt;</span>
      </div>
    </motion.div>
  );
}
