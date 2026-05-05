# 🛡️ Cyber-Jarvis
**Autonomous Cybersecurity Intelligence Hub**

Cyber-Jarvis is a full-stack, automated telemetry dashboard designed for cybersecurity analysts and enthusiasts. The system operates entirely autonomously, scraping high-signal intelligence feeds and rendering them in a high-performance, sci-fi terminal interface. 

### 🚀 Features
* **Autonomous Crawler Engine:** Powered by GitHub Actions, the backend routinely scrapes The Hacker News, BleepingComputer, TechCrunch, and the CIRCL CVE database every 6 hours.
* **Smart Categorization:** Automatically filters intelligence into Threat Intelligence, Tech Advancements, and AI Security.
* **Persistent Storage:** Data is cleaned and stored in a remote **Supabase (PostgreSQL)** database.
* **Sci-Fi UI/UX:** A highly dynamic frontend built with **React, Tailwind CSS, and Framer Motion**, featuring animated data graphs, CRT glow effects, and a terminal-themed analysis modal.

### 🛠️ Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, Framer Motion (Deployed on Vercel)
* **Backend:** Python, FastAPI, Feedparser (Deployed on Render)
* **Database & DevOps:** Supabase (Postgres), GitHub Actions CI/CD
