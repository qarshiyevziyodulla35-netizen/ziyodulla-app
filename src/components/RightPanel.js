import React, { useEffect, useRef, useState } from 'react';

const DAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
const EVENT_DAYS = [3, 8, 15, 22];
const TODAY = 25;

function MiniCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="mini-card">
      <div className="panel-title">Kalendar</div>
      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-day">{d}</div>)}
      </div>
      <div className="cal-grid">
        {[1, 2].map(i => <div key={i} className="cal-num" />)}
        {days.map(d => (
          <div
            key={d}
            className={`cal-num ${d === TODAY ? 'today' : EVENT_DAYS.includes(d) ? 'ev' : ''}`}
          >{d}</div>
        ))}
      </div>
    </div>
  );
}

function Weather() {
  return (
    <div className="mini-card">
      <div className="panel-title">Ob-havo · Samarqand</div>
      <div className="weather-temp">28°</div>
      <div className="weather-desc">Quyoshli</div>
      <div className="w-row">
        <div className="w-item">💧 18%</div>
        <div className="w-item">💨 6km/s</div>
      </div>
      <div className="w-fore">
        {[['Se', '31°'], ['Ch', '29°'], ['Pa', '27°'], ['Ju', '25°']].map(([d, t], i) => (
          <div key={d} className="w-day">
            <div className="w-dname">{d}</div>
            <div className="w-dtemp" style={{ color: i === 0 ? 'var(--gold)' : 'var(--txt2)' }}>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniGraph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 220;
    canvas.height = 144;
    const ctx = canvas.getContext('2d');
    const nodes = [
      { x: 108, y: 72, r: 8, label: 'Islom', col: '#3B82F6' },
      { x: 52, y: 38, r: 6, label: 'Namoz', col: '#2563EB' },
      { x: 168, y: 33, r: 5, label: 'Kitob', col: '#93C5FD' },
      { x: 58, y: 108, r: 5, label: 'Moliya', col: '#F0B429' },
      { x: 172, y: 102, r: 6, label: 'Vazifa', col: '#2563EB' },
      { x: 28, y: 72, r: 4, label: 'Duo', col: '#93C5FD' },
      { x: 198, y: 68, r: 4, label: 'Odat', col: '#C9960C' },
    ];
    const edges = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[3,5],[4,6],[1,2]];
    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.strokeStyle = 'rgba(59,130,246,0.2)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.col;
      ctx.fill();
      ctx.font = '9px sans-serif';
      ctx.fillStyle = '#5a6a85';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + n.r + 9);
    });
  }, []);

  return (
    <div>
      <div className="panel-title">Ikkinchi miya — graf</div>
      <div className="graph-area">
        <canvas ref={canvasRef} style={{ width: '100%', height: '144px' }} />
      </div>
    </div>
  );
}

function ClaudeChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Salom! Bugun qanday yordam bera olaman?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
   const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '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',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-allow-browser': 'true',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: "Sen Ziyodullaning shaxsiy AI yordamchisisan. O'zbek tilida qisqa javob ber.",
    messages: [{ role: 'user', content: userMsg }]
  })
});
const data = await response.json();
const text = data.content?.[0]?.text || 'Xatolik yuz berdi.';
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Ulanishda xatolik. API kalitni tekshiring.' }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="panel-title">Claude · Yordamchi</div>
      <div className="claude-chat">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
        ))}
        {loading && <div className="chat-msg ai">...</div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Savol bering..."
        />
        <button className="chat-send" onClick={send}>→</button>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="right-panel">
      <MiniGraph />
      <div style={{ display: 'flex', gap: '8px' }}>
        <MiniCalendar />
        <Weather />
      </div>
      <div>
        <div className="panel-title">Statistika</div>
        <div className="stat-row">
          <div className="stat-item"><div className="stat-num">142</div><div className="stat-label">Eslatmalar</div></div>
          <div className="stat-item"><div className="stat-num">38</div><div className="stat-label">Vazifalar</div></div>
          <div className="stat-item"><div className="stat-num gold">7🔥</div><div className="stat-label">Ketma-ket</div></div>
          <div className="stat-item"><div className="stat-num">94%</div><div className="stat-label">Faollik</div></div>
        </div>
      </div>
      <ClaudeChat />
    </div>
  );
}

export default RightPanel;