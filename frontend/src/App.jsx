import { useEffect, useState } from 'react';
import { fetchNews } from './lib/api';
import LiveTicker from './components/LiveTicker';
import IntelligenceGrid from './components/IntelligenceGrid';
import TerminalModal from './components/TerminalModal';
import LiveGraph from './components/LiveGraph';
import { Shield } from 'lucide-react';

function App() {
  const [news, setNews] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  const threatNews = news.filter(n => n.category === 'THREAT' || !n.category);
  const techNews = news.filter(n => n.category === 'TECH');
  const aiNews = news.filter(n => n.category === 'AI');

  return (
    <div className="min-h-screen crt flex flex-col bg-deep-space text-cyber-cyan text-sm">
      <header className="border-b border-cyber-cyan/20 p-4 flex justify-between items-center relative z-10 bg-deep-space">
        <div className="flex gap-3 items-center">
          <Shield size={32} className="text-cyber-cyan glow animate-pulse" />
          <h1 className="text-2xl font-bold tracking-[0.2em] text-cyber-cyan glow">AEGIS<span className="text-alert-orange glow-orange">-HUD</span></h1>
        </div>
        <div className="text-xs tracking-widest text-cyber-cyan/60 hidden md:block border border-cyber-cyan/20 px-2 py-1">
          OPERATOR: ADMIN // SYS.STATUS: NOMINAL
        </div>
      </header>

      <LiveTicker items={threatNews} />

      <main className="flex-1 overflow-auto relative z-10 p-2 md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03)_0%,transparent_100%)] pointer-events-none" />
        
        <LiveGraph />

        {news.length === 0 ? (
           <div className="text-cyber-cyan animate-pulse py-10 px-6 font-mono tracking-widest flex justify-center uppercase">&gt; SENSOR ARRAY ONLINE: WAITING FOR TELEMETRY...</div>
        ) : (
           <div className="mt-8">
              <IntelligenceGrid title="IMPORTANT CYBER THREAT NEWS" items={threatNews} onCardClick={setSelectedThreat} />
              <IntelligenceGrid title="NEW TECHNOLOGIES RELEASED" items={techNews} onCardClick={setSelectedThreat} />
              <IntelligenceGrid title="NEW AI INTELLIGENCE" items={aiNews} onCardClick={setSelectedThreat} />
           </div>
        )}
      </main>

      <TerminalModal 
        isOpen={!!selectedThreat} 
        onClose={() => setSelectedThreat(null)} 
        data={selectedThreat} 
      />
    </div>
  );
}

export default App;
