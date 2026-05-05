import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Link as LinkIcon, ShieldAlert } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-card border border-border shadow-xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="border-b border-border px-6 py-4 flex justify-between items-center bg-muted/30">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pr-4">Intelligence Report</h2>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors">
               <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto">
            <h1 className="text-xl sm:text-2xl font-bold mb-6 tracking-tight text-foreground">{data.title}</h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-6 border-b border-border text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <span className="font-medium text-foreground">{data.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(data.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                Severity: <span className={data.threat_level === 'CRITICAL' ? 'text-destructive font-bold' : 'text-primary font-medium'}>{data.threat_level}</span>
              </div>
            </div>
            
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-base">
                {data.summary || data.description || "No detailed summary available for this entry."}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border mt-auto">
              <button 
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-10 px-4 py-2 text-muted-foreground"
              >
                Close
              </button>
              <a 
                href={data.url} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 gap-2 shadow-sm"
              >
                Read Original Article <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
