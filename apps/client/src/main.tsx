import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Home } from './pages/Home';
import { PlayerProfile } from './features/player/PlayerProfile';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:gameName/:tagLine" element={<PlayerProfile />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
);