import { useEffect, useState } from 'react';
import { fetchNews, fetchCves } from './lib/api';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import TerminalModal from './components/TerminalModal';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  const [news, setNews] = useState([]);
  const [cves, setCves] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    fetchNews().then(setNews);
    fetchCves().then(setCves);
  }, []);

  const getFilteredItems = () => {
    if (activeCategory === 'ALL') return news;
    if (activeCategory === 'CVE') return cves.map(c => ({
      title: c.cve_id,
      summary: c.description,
      source: 'CIRCL',
      timestamp: c.timestamp,
      threat_level: c.base_score >= 9 ? 'CRITICAL' : 'HIGH',
      category: 'CVE',
      url: `https://nvd.nist.gov/vuln/detail/${c.cve_id}`
    }));
    return news.filter(n => n.category === activeCategory);
  };

  const displayedItems = getFilteredItems();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <main className="flex-1 container mx-auto p-4 md:p-8">
          <div className="mb-8 mt-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Intelligence Dashboard</h1>
            <p className="text-muted-foreground text-lg">Aggregated alerts and insights from across the threat landscape.</p>
          </div>

          {displayedItems.length === 0 ? (
            <div className="flex h-[50vh] items-center justify-center rounded-2xl border border-dashed border-border bg-card/50">
              <p className="text-muted-foreground flex items-center gap-3 text-lg font-medium">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
                Synchronizing data...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
              {displayedItems.map((item, idx) => (
                <div key={item.url || item.cve_id || idx} className={`${idx === 0 && displayedItems.length > 3 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                  <NewsCard item={item} onClick={setSelectedItem} />
                </div>
              ))}
            </div>
          )}
        </main>

        <TerminalModal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          data={selectedItem} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
