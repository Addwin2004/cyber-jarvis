import NewsCard from './NewsCard';

export default function IntelligenceGrid({ title, items, onCardClick }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mb-10 px-2 lg:px-6">
      <h2 className="text-xl md:text-2xl font-bold tracking-widest text-cyber-cyan glow mb-6 border-b border-cyber-cyan/30 pb-2 select-none uppercase">
        &gt; {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <NewsCard key={item.url || idx} item={item} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}
