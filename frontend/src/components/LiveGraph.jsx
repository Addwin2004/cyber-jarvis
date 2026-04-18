import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LiveGraph() {
  const [data, setData] = useState(Array(30).fill(10));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push(Math.floor(Math.random() * 80) + 10);
        return newData;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-40 border border-cyber-cyan/30 bg-cyber-cyan/5 p-4 flex flex-col justify-end relative overflow-hidden mt-2 mb-2">
      <div className="absolute top-2 left-2 text-[10px] text-cyber-cyan font-bold tracking-widest uppercase">GLOBAL NETWORK TELEMETRY [LIVE EPS]</div>
      <div className="absolute top-2 right-2 text-[10px] text-alert-orange animate-pulse font-bold tracking-widest uppercase">RECORDING...</div>
      <div className="flex items-end gap-[2px] w-full h-full pt-6">
        {data.map((val, i) => (
          <motion.div
            key={i}
            className={`w-full flex-1 ${val > 75 ? 'bg-alert-orange shadow-[0_0_8px_#ff8c00]' : 'bg-cyber-cyan shadow-[0_0_8px_#00f2ff]'}`}
            initial={{ height: 0 }}
            animate={{ height: `${val}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>
    </div>
  );
}
