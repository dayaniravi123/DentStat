// /concepts/central-tendency.js
// Central tendency demo (DentalStats)

// ---------- helpers ----------
function parseNumbers(text){
  return text
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter(n => !Number.isNaN(n));
}

function mean(arr){
  return arr.reduce((s, x) => s + x, 0) / arr.length;
}

function median(arr){
  const s = arr.slice().sort((a, b) => a - b);
  const m = Math.floor((s.length - 1) / 2);
  if (s.length % 2) return s[m];
  return (s[m] + s[m + 1]) / 2;
}

function mode(arr){
  const freq = {};
  let max = 0;
  let mo = null;
  for (const v of arr){
    const k = String(v);
    freq[k] = (freq[k] || 0) + 1;
    if (freq[k] > max){
      max = freq[k];
      mo = v;
    }
  }
  return mo;
}

// Quartiles via simple interpolation (good enough for demo UX)
function quartiles(arr){
  const s = arr.slice().sort((a, b) => a - b);
  const q1Pos = (s.length + 1) / 4;
  const q3Pos = 3 * (s.length + 1) / 4;

  function interp(p){
    const idx = p - 1;
    if (Number.isInteger(idx)) return s[idx];
    const lo = Math.floor(idx), hi = Math.ceil(idx);
    if (s[lo] == null) return s[0];
    if (s[hi] == null) return s[s.length - 1];
    return (s[lo] + s[hi]) / 2;
  }

  return { q1: interp(q1Pos), q2: median(s), q3: interp(q3Pos) };
}

// ---------- chart state ----------
let histChart = null;

// ---------- canvas DPI helper ----------
function ensureCanvasHiDPI(canvas){
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // Guard: if canvas not yet visible/measurable
  const cssW = Math.max(1, rect.width || canvas.clientWidth || 600);
  const cssH = Math.max(1, rect.height || canvas.clientHeight || 200);

  const w = Math.max(1, Math.floor(cssW * dpr));
  const h = Math.max(1, Math.floor(cssH * dpr));

  if (canvas.width !== w || canvas.height !== h){
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    // draw in CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}

// ---------- histogram ----------
function makeHistogram(arr, bins = 10){
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const width = (max - min) / bins || 1;

  const counts = new Array(bins).fill(0);
  const labels = new Array(bins).fill(0).map((_, i) => (min + i * width).toFixed(2));

  for (const v of arr){
    const idx = Math.min(bins - 1, Math.floor((v - min) / width));
    counts[idx] += 1;
  }

  return { labels, counts, min, max };
}

function renderHistogram(arr){
  const canvas = document.getElementById('ctHistogram');
  if (!canvas) return;

  ensureCanvasHiDPI(canvas);
  const ctx = canvas.getContext('2d');

  const bins = Math.min(12, Math.max(4, Math.floor(Math.sqrt(arr.length))));
  const hist = makeHistogram(arr, bins);

  if (histChart) histChart.destroy();

  const mu = mean(arr);
  const md = median(arr);
  const mo = mode(arr);

  histChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hist.labels,
      datasets: [{
        label: 'Frequency',
        data: hist.counts,
        backgroundColor: 'rgba(15,118,110,0.8)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Value' } },
        y: { title: { display: true, text: 'Count' }, beginAtZero: true }
      },
      plugins: {
        legend: { display: false },

        // Overlay mean/median/mode markers after the chart draws
        afterDraw: (chart) => {
          const { chartArea, scales } = chart;
          const xScale = scales.x;
          const cctx = chart.ctx;

          // map numeric value to pixel along x axis using true min/max
          const minV = hist.min;
          const maxV = hist.max;
          const mapX = (v) => {
            const pct = (v - minV) / (maxV - minV || 1);
            return xScale.left + pct * (xScale.right - xScale.left);
          };

          const yTop = chartArea.top;
          const yBot = chartArea.bottom;
          const yMid = (yTop + yBot) / 2;

          cctx.save();

          // median line (teal)
          cctx.strokeStyle = '#0f766e';
          cctx.lineWidth = 2;
          cctx.beginPath();
          cctx.moveTo(mapX(md), yTop);
          cctx.lineTo(mapX(md), yBot);
          cctx.stroke();

          // mean marker (red dot)
          cctx.fillStyle = '#ef4444';
          cctx.beginPath();
          cctx.arc(mapX(mu), yMid, 5, 0, Math.PI * 2);
          cctx.fill();

          // mode marker (blue diamond)
          const xMo = mapX(mo);
          cctx.fillStyle = '#2563eb';
          cctx.beginPath();
          cctx.moveTo(xMo, yMid - 6);
          cctx.lineTo(xMo + 6, yMid);
          cctx.lineTo(xMo, yMid + 6);
          cctx.lineTo(xMo - 6, yMid);
          cctx.closePath();
          cctx.fill();

          cctx.restore();
        }
      }
    }
  });
}

// ---------- boxplot (simple custom drawing, no plugin needed) ----------
function renderBoxplot(arr){
  const canvas = document.getElementById('ctBox');
  if (!canvas) return;

  ensureCanvasHiDPI(canvas);
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  const s = arr.slice().sort((a, b) => a - b);
  const q = quartiles(s);
  const min = s[0];
  const max = s[s.length - 1];
  const mu = mean(arr);
  const mo = mode(arr);

  // clear
  ctx.clearRect(0, 0, w, h);

  const pad = 16;
  const left = pad;
  const right = w - pad;
  const scale = (v) => left + ((v - min) / (max - min || 1)) * (right - left);

  const yCenter = h / 2;

  // whisker line
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(scale(min), yCenter);
  ctx.lineTo(scale(max), yCenter);
  ctx.stroke();

  // min/max caps
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(scale(min), yCenter - 6);
  ctx.lineTo(scale(min), yCenter + 6);
  ctx.moveTo(scale(max), yCenter - 6);
  ctx.lineTo(scale(max), yCenter + 6);
  ctx.stroke();

  // box Q1..Q3
  const boxTop = yCenter - 12;
  const boxHeight = 24;
  const xQ1 = scale(q.q1);
  const xQ3 = scale(q.q3);

  ctx.fillStyle = 'rgba(15,118,110,0.08)';
  ctx.strokeStyle = 'rgba(15,118,110,0.6)';
  ctx.lineWidth = 1;
  ctx.fillRect(xQ1, boxTop, Math.max(2, xQ3 - xQ1), boxHeight);
  ctx.strokeRect(xQ1, boxTop, Math.max(2, xQ3 - xQ1), boxHeight);

  // median line
  const xMed = scale(q.q2);
  ctx.strokeStyle = '#0f766e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(xMed, boxTop);
  ctx.lineTo(xMed, boxTop + boxHeight);
  ctx.stroke();

  // mean dot
  const xMean = scale(mu);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(xMean, yCenter, 4, 0, Math.PI * 2);
  ctx.fill();

  // mode diamond
  const xMode = scale(mo);
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.moveTo(xMode, yCenter - 5);
  ctx.lineTo(xMode + 5, yCenter);
  ctx.lineTo(xMode, yCenter + 5);
  ctx.lineTo(xMode - 5, yCenter);
  ctx.closePath();
  ctx.fill();
}

// ---------- sample data ----------
function sampleGenerator(type){
  if (type === 'dental-skewed'){
    // Right-skewed sample similar to DMFT-like counts
    return [0,0,0,0,1,1,1,1,2,2,2,3,3,4,5,6,8,10,12,15,20];
  }

  if (type === 'normal'){
    const out = [];
    for (let i = 0; i < 80; i++){
      // simple-ish normal-ish around 5
      out.push((5 + (Math.random() * 2 - 1) * 2).toFixed(2) * 1);
    }
    return out;
  }

  if (type === 'bimodal'){
    const out = [];
    for (let i = 0; i < 40; i++) out.push((2 + Math.random() * 1).toFixed(2) * 1);
    for (let i = 0; i < 40; i++) out.push((8 + Math.random() * 1).toFixed(2) * 1);
    return out;
  }

  return null;
}

// ---------- UI wiring ----------
document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('ct-data');
  const btn = document.getElementById('ct-compute');
  const clearBtn = document.getElementById('ct-clear');
  const out = document.getElementById('ct-result');
  const summary = document.getElementById('ct-summary');
  const sel = document.getElementById('ct-sample');

  // Guard if page layout changes
  if (!ta || !btn || !clearBtn || !out) return;

  function computeAndRender(){
    const arr = parseNumbers(ta.value);

    if (!arr.length){
      out.innerHTML = '<em>No valid numbers</em>';
      if (summary) summary.innerHTML = 'Results will appear here.';
      if (histChart) { histChart.destroy(); histChart = null; }
      renderBoxplot([0, 0]); // harmless clear-ish fallback
      return;
    }

    const mu = mean(arr);
    const med = median(arr);
    const mo = mode(arr);

    // sample standard deviation (n-1), guard when n=1
    const sd = (arr.length > 1)
      ? Math.sqrt(arr.reduce((s, x) => s + (x - mu) * (x - mu), 0) / (arr.length - 1))
      : 0;

    out.innerHTML = `
      <p><strong>Count:</strong> ${arr.length}</p>
      <p><strong>Mean:</strong> ${mu.toFixed(2)}</p>
      <p><strong>Median:</strong> ${med}</p>
      <p><strong>Mode:</strong> ${mo}</p>
      <p><strong>Sample SD:</strong> ${sd.toFixed(2)}</p>
    `;

    if (summary){
      summary.innerHTML = `
        <p>
          <strong>Mean:</strong> ${mu.toFixed(2)} &nbsp;
          <strong>Median:</strong> ${med} &nbsp;
          <strong>Mode:</strong> ${mo}
        </p>
      `;
    }

    renderHistogram(arr);
    try { renderBoxplot(arr); } catch (e) { console.warn('boxplot failed', e); }
  }

  btn.addEventListener('click', computeAndRender);

  clearBtn.addEventListener('click', () => {
    ta.value = '';
    out.innerHTML = 'Results will appear here.';
    if (summary) summary.innerHTML = 'Results will appear here.';

    if (histChart) { histChart.destroy(); histChart = null; }

    const box = document.getElementById('ctBox');
    if (box){
      const ctx = box.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const w = box.width / dpr;
      const h = box.height / dpr;
      ctx && ctx.clearRect(0, 0, w, h);
    }
  });

  if (sel){
    sel.addEventListener('change', () => {
      const v = sel.value;
      if (v === 'custom') return;

      const sample = sampleGenerator(v);
      if (sample){
        ta.value = sample.join(',');
        computeAndRender();
      }
    });
  }

  // auto-run once on load (so charts show immediately)
  computeAndRender();
});