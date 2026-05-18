import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PlayerProfile } from './features/player/PlayerProfile';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:gameName/:tagLine" element={<PlayerProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);