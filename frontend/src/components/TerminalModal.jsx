import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-4xl bg-deep-space border border-cyber-cyan shadow-[0_0_30px_rgba(0,242,255,0.15)] rounded-sm overflow-hidden flex flex-col"
        >
          <div className="bg-cyber-cyan/10 border-b border-cyber-cyan/30 px-4 py-3 flex justify-between items-center">
            <div className="flex gap-2 items-center text-cyber-cyan">
              <Terminal size={18} />
              <span className="text-sm tracking-widest font-bold">THREAT_ANALYSIS_MODAL_v2.0</span>
            </div>
            <button onClick={onClose} className="text-cyber-cyan hover:text-alert-orange transition-colors">
               <X size={24} />
            </button>
          </div>
          <div className="p-8 font-mono text-sm leading-relaxed max-h-[80vh] overflow-y-auto">
             <div className="text-alert-orange mb-6 animate-pulse tracking-widest text-lg glow-orange">&gt; INITIATING DEEP SCAN ON THREAT PROFILE...</div>
            <p className="mb-4 text-xl"><strong>TITLE:</strong> <span className="text-cyber-cyan glow">{data.title}</span></p>
            <p className="mb-4"><strong>SOURCE:</strong> {data.source}</p>
            <p className="mb-4"><strong>TIMESTAMP:</strong> {new Date(data.timestamp).toLocaleString()}</p>
            <p className="mb-4"><strong>SEVERITY:</strong> <span className={data.threat_level === 'CRITICAL' ? 'text-alert-orange text-lg font-bold' : 'text-cyber-cyan'}>{data.threat_level}</span></p>
            <div className="mt-8 p-6 border border-cyber-cyan/20 bg-cyber-cyan/5 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-cyan"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-cyan"></div>
              <div className="text-cyber-cyan mb-4 font-bold tracking-widest">&gt; AI_SUMMARY_GENERATION / CONTENT ANALYSIS:</div>
              <p className="opacity-80 text-base leading-relaxed break-words whitespace-pre-wrap">
                {data.summary || "No specific telemetry gathered for this event yet. Engaging deeper scan parameters..."}
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <a href={data.url} target="_blank" rel="noreferrer" className="px-6 py-3 border border-cyber-cyan text-cyber-cyan font-bold hover:bg-cyber-cyan hover:text-deep-space transition-colors uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(0,242,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,255,0.6)]">
                Access Source Database
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
