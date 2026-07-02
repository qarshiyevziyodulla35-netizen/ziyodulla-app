import React from 'react';

const navItems = [
  { id: 'home', icon: '🏠', tip: 'Bosh sahifa' },
  { id: 'brain', icon: '🧠', tip: 'Ikkinchi miya' },
  { id: 'library', icon: '📚', tip: 'Kutubxona' },
  { id: 'calendar', icon: '📅', tip: 'Kalendar' },
  { id: 'stats', icon: '📊', tip: 'Statistika' },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="logo">Z</div>
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-icon ${activePage === item.id ? 'active' : ''}`}
          onClick={() => setActivePage(item.id)}
          aria-label={item.tip}
        >
          <span>{item.icon}</span>
          <span className="tip">{item.tip}</span>
        </button>
      ))}
      <div style={{ marginTop: 'auto' }} />
      <button
        className={`nav-icon ${activePage === 'settings' ? 'active' : ''}`}
        onClick={() => setActivePage('settings')}
        aria-label="Sozlamalar"
      >
        <span>⚙️</span>
        <span className="tip">Sozlamalar</span>
      </button>
    </div>
  );
}

export default Sidebar;