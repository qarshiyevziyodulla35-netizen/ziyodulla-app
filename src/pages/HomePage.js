import React, { useState } from 'react';

const SECTIONS = {
  islam: { name: 'Islom', icon: '☪️', count: 5, badge: 'Yangi', subs: ['Namoz vaqtlari', "Qur'on o'qish", "Hadislar to'plami", 'Duo va zikrilar', 'Islomiy kitoblar'] },
  moliya: { name: 'Moliya', icon: '💰', count: 12, subs: ['Oylik byudjet', 'Investitsiyalar', 'Xarajatlar hisobi', 'Maqsadlar', 'Qarzlar'] },
  kutubxona: { name: 'Kutubxona', icon: '📚', count: 23, subs: ["O'qilayotgan kitoblar", "O'qib bo'linganlar", "O'qish ro'yxati", 'Xulosalar', 'Iqtiboslar'] },
  vazifalar: { name: 'Kundalik vazifalar', icon: '✅', count: 8, subs: ['Ertalabki vazifalar', 'Ish vazifalari', 'Shaxsiy maqsadlar', "Haftalik ko'rib chiqish", 'Odatlar'] },
};

function HomePage() {
  const [openSec, setOpenSec] = useState(null);

  const today = new Date().toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div>
      <div className="greet-card">
        <div>
          <h2>Salom, Ziyodulla! 🤲</h2>
          <p>{today} — Barakali kun bo'lsin</p>
        </div>
        <div className="sticker">🌟</div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--txt2)', marginBottom: 8 }}>
          <span>Bugungi vazifalar</span>
          <span style={{ color: 'var(--gold)', fontWeight: 500 }}>68%</span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: '68%' }} /></div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--txt2)' }}><span style={{ color: 'var(--blue2)' }}>17</span> bajarildi</span>
          <span style={{ fontSize: 11, color: 'var(--txt2)' }}><span style={{ color: 'var(--txt3)' }}>8</span> qoldi</span>
        </div>
      </div>

      <div className="section-label">Bo'limlar</div>
      <div className="sections-grid">
        {Object.entries(SECTIONS).map(([key, sec]) => (
          <div
            key={key}
            className={`sec-card ${openSec === key ? 'active' : ''}`}
            onClick={() => setOpenSec(openSec === key ? null : key)}
          >
            <div className="sec-icon">{sec.icon}</div>
            <div className="sec-name">{sec.name}</div>
            <div className="sec-sub">{sec.count} ta eslatma</div>
            {sec.badge && <div className="sec-badge">{sec.badge}</div>}
          </div>
        ))}
      </div>

      {openSec && (
        <div className="modal-area">
          <div className="modal-header">
            <span>{SECTIONS[openSec].icon} {SECTIONS[openSec].name}</span>
            <button className="modal-close" onClick={() => setOpenSec(null)}>✕</button>
          </div>
          <div className="subsec-list">
            {SECTIONS[openSec].subs.map(sub => (
              <div key={sub} className="subsec-item">
                <div className="subsec-dot" />
                <span className="subsec-name">{sub}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--txt3)' }}>›</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;