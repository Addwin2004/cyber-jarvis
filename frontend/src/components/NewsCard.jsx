import { motion } from 'framer-motion';
import { ShieldAlert, Shield, ShieldQuestion } from 'lucide-react';

export default function NewsCard({ item, onClick }) {
  const isCritical = item.threat_level === 'CRITICAL';
  const Icon = isCritical ? ShieldAlert : (item.threat_level === 'HIGH' ? Shield : ShieldQuestion);

  return (
    <motion.div 
      className="rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full overflow-hidden"
      onClick={() => onClick(item)}
      whileHover={{ y: -3 }}
    >
      <div className="flex flex-col space-y-2 p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground font-medium">
            {new Date(item.timestamp).toLocaleDateString()} • {item.source}
          </span>
          <Icon className={`h-5 w-5 ${isCritical ? 'text-destructive' : 'text-primary'}`} />
        </div>
        <h3 className="text-lg md:text-xl font-semibold leading-tight tracking-tight">
          {item.title}
        </h3>
      </div>
      
      <div className="p-6 pt-0 flex-1 flex flex-col">
        <p className="text-sm md:text-base text-muted-foreground line-clamp-3 mb-6 flex-1">
          {item.summary || item.description || "No abstract provided for this intelligence."}
        </p>
        <div className="flex items-center flex-wrap gap-2 mt-auto">
          <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors ${isCritical ? 'border-transparent bg-destructive text-destructive-foreground' : 'border-transparent bg-secondary text-secondary-foreground'}`}>
            {item.threat_level || 'INFO'}
          </span>
          {item.category && (
            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-border text-foreground">
              {item.category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
