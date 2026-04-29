import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

const mockData = [
  { url: 'https://thehackernews.com/2026/04/critical-zero-day.html', title: 'Critical Zero-Day in Microsoft Exchange [MOCK]', source: 'The Hacker News', timestamp: new Date().toISOString(), threat_level: 'CRITICAL', category: 'THREAT', summary: 'This is mock data because the backend connection failed. Ensure your VITE_API_URL is set in Vercel.', image: null },
  { url: 'https://www.bleepingcomputer.com/', title: 'New Ransomware Gang Targets Schools [MOCK]', source: 'BleepingComputer', timestamp: new Date().toISOString(), threat_level: 'HIGH', category: 'THREAT', summary: 'This is mock data because the backend connection failed. Please deploy the backend.', image: null },
  { url: 'https://techcrunch.com/', title: 'Quantum Encryption Breakthrough [MOCK]', source: 'TechCrunch', timestamp: new Date().toISOString(), threat_level: 'ELEVATED', category: 'TECH', summary: 'Mock data fallback activated. Check your backend server.', image: null },
  { url: 'https://www.artificialintelligence-news.com/', title: 'Mythos Changed the Math on Vulnerability Discovery [MOCK]', source: 'AI News', timestamp: new Date().toISOString(), threat_level: 'CRITICAL', category: 'AI', summary: 'AI models are being trained on malware data. Mock data fallback active.', image: null }
];

export const fetchNews = async () => {
  try {
    const res = await api.get('/api/news');
    if (res.data && res.data.length > 0) {
        return res.data;
    }
    return mockData;
  } catch (err) {
    console.error("API error, falling back to mock news. Did you set VITE_API_URL?", err);
    return mockData;
  }
};

export const fetchCves = async () => {
  try {
    const res = await api.get('/api/cves');
    return res.data;
  } catch (err) {
    return [];
  }
};
