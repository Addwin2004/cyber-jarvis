import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

const mockData = [
  { url: '1', title: 'Critical Zero-Day in Microsoft Exchange', source: 'The Hacker News', timestamp: '2026-04-18T10:00', threat_level: 'CRITICAL', image: null },
  { url: '2', title: 'New Ransomware Gang Targets Schools', source: 'BleepingComputer', timestamp: '2026-04-18T09:00', threat_level: 'HIGH', image: null },
  { url: '3', title: 'NIST Framework Expansion Guidance', source: 'SANS ISC', timestamp: '2026-04-18T08:00', threat_level: 'ELEVATED', image: null }
];

export const fetchNews = async () => {
  try {
    const res = await api.get('/api/news');
    return res.data?.length ? res.data : mockData;
  } catch (err) {
    console.error("API error, falling back to mock news", err);
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
