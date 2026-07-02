import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import { BrainPage, LibraryPage, CalendarPage, StatsPage, SettingsPage } from './pages/AllPages';
import HomePage from './pages/HomePage';

function App() {
  const [activePage, setActivePage] = useState('home');

  const pages = {
    home: <HomePage />,
    brain: <BrainPage />,
    library: <LibraryPage />,
    calendar: <CalendarPage />,
    stats: <StatsPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="center">{pages[activePage]}</main>
      <RightPanel />
    </div>
  );
}

export default App;