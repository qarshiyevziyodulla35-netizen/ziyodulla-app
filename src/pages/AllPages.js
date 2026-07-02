import React, { useEffect, useRef } from 'react';

export function BrainPage() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    const nodes = [
      { x: 200, y: 150, r: 14, label: 'Islom', col: '#3B82F6' },
      { x: 100, y: 80, r: 10, label: 'Namoz', col: '#2563EB' },
      { x: 310, y: 70, r: 9, label: 'Kitob', col: '#93C5FD' },
      { x: 90, y: 220, r: 9, label: 'Moliya', col: '#F0B429' },
      { x: 320, y: 210, r: 10, label: 'Vazifa', col: '#2563EB' },
      { x: 50, y: 150, r: 7, label: 'Duo', col: '#93C5FD' },
      { x: 360, y: 140, r: 7, label: 'Odat', col: '#C9960C' },
      { x: 200, y: 260, r: 8, label: 'Kundalik', col: '#3B82F6' },
    ];
    const edges = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[3,5],[4,6],[0,7],[3,7],[4,7]];
    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.strokeStyle = 'rgba(59,130,246,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.col;
      ctx.fill();
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#5a6a85';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + n.r + 13);
    });
  }, []);
  return (
    <div>
      <div className="page-title">Ikkinchi miya</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: 300, borderRadius: 8 }} />
      </div>
      <div className="section-label">So'nggi eslatmalar</div>
      {[
        { icon: '📝', name: 'Sabr haqida fikr', sub: 'Islom · 2 soat oldin' },
        { icon: '💡', name: "Investitsiya g'oyasi", sub: 'Moliya · kecha' },
        { icon: '📖', name: 'Atomic Habits xulosa', sub: 'Kutubxona · 3 kun oldin' },
        { icon: '🔗', name: "Odatlar va moliya bog'liqligi", sub: "Avto-bog'liqlik · Claude", ai: true },
      ].map((item, i) => (
        <div key={i} className="list-item">
          <div className="item-icon">{item.icon}</div>
          <div className="item-info">
            <div className="item-name">{item.name}</div>
            <div className="item-sub">{item.sub}</div>
          </div>
          {item.ai
            ? <div className="item-right" style={{ color: 'var(--gold)' }}>AI</div>
            : <div className="item-right">→</div>}
        </div>
      ))}
    </div>
  );
}

export function LibraryPage() {
  const books = [
    { icon: '📘', name: 'Atomic Habits', author: 'James Clear', progress: 100, done: true },
    { icon: '📗', name: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', progress: 65 },
    { icon: '📙', name: 'Sahih al-Buxoriy', author: 'Imom al-Buxoriy', progress: 30 },
    { icon: '📕', name: 'Deep Work', author: 'Cal Newport', progress: 0 },
  ];
  return (
    <div>
      <div className="page-title">Kutubxona</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        <button className="tag">Hammasi</button>
        <button className="tag muted">O'qilmoqda</button>
        <button className="tag muted">Tugallangan</button>
        <button className="tag muted">Ro'yxatda</button>
      </div>
      {books.map((b, i) => (
        <div key={i} className="list-item">
          <div className="item-icon">{b.icon}</div>
          <div className="item-info">
            <div className="item-name">{b.name}</div>
            <div className="item-sub">{b.author}</div>
            <div className="book-progress">
              <div className="book-prog-fill" style={{ width: `${b.progress}%`, background: b.done ? 'var(--gold2)' : 'var(--blue2)' }} />
            </div>
          </div>
          <div className="item-right" style={{ color: b.done ? 'var(--gold)' : b.progress === 0 ? 'var(--txt3)' : 'var(--blue)' }}>
            {b.done ? 'Tugallangan' : b.progress === 0 ? "Ro'yxatda" : `${b.progress}%`}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalendarPage() {
  const DAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  const events = [3, 8, 15, 22, 25];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div>
      <div className="page-title">Kalendar</div>
      <div className="card">
        <div style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 500, marginBottom: 10 }}>May 2025</div>
        <div className="cal-grid">
          {DAYS.map(d => <div key={d} className="cal-day">{d}</div>)}
        </div>
        <div className="cal-grid">
          {[1, 2].map(i => <div key={i} className="cal-num" />)}
          {days.map(d => (
            <div key={d} className={`cal-num ${d === 25 ? 'today' : events.includes(d) ? 'ev' : ''}`}>{d}</div>
          ))}
        </div>
      </div>
      <div className="section-label">Bugungi rejalar</div>
      {[
        { time: '04:30', name: 'Bomdod namozi' },
        { time: '09:00', name: "Haftalik ko'rib chiqish" },
        { time: '21:00', name: "Kitob o'qish — 30 daqiqa" },
      ].map((e, i) => (
        <div key={i} className="list-item">
          <div className="item-icon" style={{ color: 'var(--blue)' }}>🕐</div>
          <div className="item-info">
            <div className="item-name">{e.name}</div>
            <div className="item-sub">{e.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsPage() {
  const weeklyRef = useRef(null);
  const donutRef = useRef(null);
  const monthlyRef = useRef(null);
  useEffect(() => {
    const wc = weeklyRef.current;
    if (wc) {
      wc.width = wc.offsetWidth || 200;
      wc.height = 90;
      const ctx = wc.getContext('2d');
      const data = [4, 6, 5, 8, 7, 5, 3];
      const days = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
      const W = wc.width, H = 90;
      const bw = Math.floor((W - 20) / 8);
      const mx = Math.max(...data);
      data.forEach((v, i) => {
        const x = i * (bw + 4) + 6;
        const bh = Math.round((v / mx) * (H - 22));
        const y = H - bh - 14;
        ctx.fillStyle = i === 4 ? '#F0B429' : '#3B82F6';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, bw, bh, 3) : ctx.rect(x, y, bw, bh);
        ctx.fill();
        ctx.font = '8px sans-serif';
        ctx.fillStyle = '#8fa0b8';
        ctx.textAlign = 'center';
        ctx.fillText(days[i], x + bw / 2, H - 2);
        ctx.fillText(v, x + bw / 2, y - 2);
      });
    }
    const dc = donutRef.current;
    if (dc) {
      dc.width = 70; dc.height = 70;
      const ctx = dc.getContext('2d');
      const segs = [{ v: 40, c: '#3B82F6' }, { v: 25, c: '#F0B429' }, { v: 23, c: '#93C5FD' }, { v: 12, c: '#a0b4d0' }];
      let a = -Math.PI / 2;
      segs.forEach(s => {
        const ea = a + (s.v / 100) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(35, 35); ctx.arc(35, 35, 30, a, ea);
        ctx.fillStyle = s.c; ctx.fill(); a = ea;
      });
      ctx.beginPath(); ctx.arc(35, 35, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#f0f4ff'; ctx.fill();
    }
    const mc = monthlyRef.current;
    if (mc) {
      mc.width = mc.offsetWidth || 300; mc.height = 70;
      const ctx = mc.getContext('2d');
      const W = mc.width, H = 70;
      const data = Array.from({ length: 25 }, (_, i) => 60 + Math.round(Math.sin(i * 0.4) * 15 + Math.random() * 10));
      ctx.beginPath();
      ctx.moveTo(0, H - (data[0] / 100) * H);
      data.forEach((v, i) => { ctx.lineTo(Math.round(i * (W / 24)), H - Math.round((v / 100) * H)); });
      ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.lineTo(W, H); ctx.lineTo(0, H);
      ctx.fillStyle = 'rgba(59,130,246,0.08)'; ctx.fill();
    }
  }, []);
  return (
    <div>
      <div className="page-title">Statistika</div>
      <div className="stat-charts-grid">
        <div className="chart-card">
          <div className="chart-title">Eslatmalar</div>
          <div className="chart-num">142 <span>+12 bu hafta</span></div>
          {[['Islom', 40, 57, '#3B82F6'], ['Moliya', 25, 36, '#F0B429'], ['Kutubxona', 30, 32, '#93C5FD'], ['Vazifalar', 12, 17, '#a0b4d0']].map(([l, w, v, c]) => (
            <div key={l} className="bar-row">
              <div className="bar-label" style={{ fontSize: 9 }}>{l.slice(0, 3)}</div>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${w}%`, background: c }} /></div>
              <div className="bar-val">{v}</div>
            </div>
          ))}
        </div>
        <div className="chart-card">
          <div className="chart-title">Haftalik faollik</div>
          <div className="chart-num">38 <span>vazifa</span></div>
          <canvas ref={weeklyRef} style={{ width: '100%' }} />
        </div>
        <div className="chart-card">
          <div className="chart-title">Bo'limlar ulushi</div>
          <div className="chart-num">4 <span>bo'lim</span></div>
          <div className="donut-wrap">
            <canvas ref={donutRef} width={70} height={70} />
            <div className="donut-legend">
              {[['#3B82F6', 'Islom 40%'], ['#F0B429', 'Moliya 25%'], ['#93C5FD', 'Kutubxona 23%'], ['#a0b4d0', 'Vazifalar 12%']].map(([c, l]) => (
                <div key={l} className="legend-item"><div className="legend-dot" style={{ background: c }} />{l}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-title">Ketma-ket kunlar</div>
          <div className="chart-num">7 <span>kun 🔥</span></div>
          <div className="streak-wrap">
            {Array.from({ length: 21 }, (_, i) => (
              <div key={i} className={`streak-day ${i >= 14 && i < 20 ? 'done' : i === 20 ? 'today' : ''}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Bu oylik faollik</div>
        <div className="chart-num">94% <span>+3% o'tgan oyga nisbatan</span></div>
        <canvas ref={monthlyRef} style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export function SettingsPage() {
  const items = [
    { icon: '👤', name: 'Profil', sub: "Ism, avatar, ma'lumotlar" },
    { icon: '🧠', name: 'Claude sinxronlash', sub: 'API kalit, model tanlash', right: 'Ulangan', gold: true },
    { icon: '🔔', name: 'Bildirishnomalar', sub: 'Namoz vaqtlari, eslatmalar' },
    { icon: '🎨', name: 'Tema', sub: 'Oq-moviy · Oltin aksent', right: 'Aktiv', blue: true },
    { icon: '💾', name: "Ma'lumotlar", sub: 'Obsidian import, zaxira' },
  ];
  return (
    <div>
      <div className="page-title">Sozlamalar</div>
      {items.map((item, i) => (
        <div key={i} className="settings-item">
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <div className="item-info">
            <div className="item-name">{item.name}</div>
            <div className="item-sub">{item.sub}</div>
          </div>
          {item.right
            ? <span style={{ fontSize: 11, color: item.gold ? 'var(--gold)' : 'var(--blue)' }}>{item.right}</span>
            : <span style={{ color: 'var(--txt3)', fontSize: 14 }}>›</span>}
        </div>
      ))}
    </div>
  );
}