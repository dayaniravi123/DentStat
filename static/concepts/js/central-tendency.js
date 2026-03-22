// Central Tendency — Interactive compute + visualize
(function(){
  'use strict';

  // ---------- helpers ----------
  function parseNumbers(text){
    return text.split(/[,\s]+/).map(s=>s.trim()).filter(Boolean).map(Number).filter(n=>!Number.isNaN(n));
  }
  function calcMean(arr){ return arr.reduce((s,x)=>s+x,0)/arr.length; }
  function calcMedian(arr){
    const s=arr.slice().sort((a,b)=>a-b);
    const m=Math.floor((s.length-1)/2);
    return s.length%2 ? s[m] : (s[m]+s[m+1])/2;
  }
  function calcMode(arr){
    const freq={}; let max=0;
    for(const v of arr){ const k=String(v); freq[k]=(freq[k]||0)+1; if(freq[k]>max) max=freq[k]; }
    const modes = Object.entries(freq).filter(([,c])=>c===max).map(([v])=>Number(v));
    return modes;
  }
  function calcSD(arr){
    const m=calcMean(arr);
    return Math.sqrt(arr.reduce((s,x)=>s+(x-m)*(x-m),0)/(arr.length-1));
  }
  function quantile(arr, q){
    const s=arr.slice().sort((a,b)=>a-b);
    const pos=(s.length-1)*q;
    const lo=Math.floor(pos), hi=Math.ceil(pos);
    return s[lo]+(s[hi]-s[lo])*(pos-lo);
  }

  // ---------- preset datasets ----------
  const PRESETS = {
    'dental-skewed': [0,0,0,1,1,1,2,2,3,3,4,5,6,8,12,15],
    'normal': (function(){ const a=[]; for(let i=0;i<50;i++){ let u=0,v=0; while(!u)u=Math.random(); while(!v)v=Math.random(); a.push(+(50+10*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)).toFixed(1)); } return a; })(),
    'bimodal': [10,11,12,13,14,15,15,16,40,41,42,43,44,45,45,46],
  };

  let histChart = null;
  let boxChart  = null;

  const ta      = document.getElementById('ct-data');
  const btn     = document.getElementById('ct-compute');
  const clearBtn= document.getElementById('ct-clear');
  const selector= document.getElementById('ct-sample');
  const summary = document.getElementById('ct-summary');
  const result  = document.getElementById('ct-result');

  if(!btn) return; // guard

  selector.addEventListener('change', function(){
    if(this.value !== 'custom' && PRESETS[this.value]){
      ta.value = PRESETS[this.value].join(', ');
    }
  });

  clearBtn.addEventListener('click', function(){
    ta.value = '';
    summary.innerHTML = 'Results will appear here.';
    result.innerHTML  = 'Results will appear here.';
    if(histChart){ histChart.destroy(); histChart=null; }
    if(boxChart){ boxChart.destroy(); boxChart=null; }
  });

  btn.addEventListener('click', compute);

  function compute(){
    const data = parseNumbers(ta.value);
    if(data.length < 2){
      summary.innerHTML = '<span class="text-red-600">Please enter at least 2 numbers.</span>';
      return;
    }

    const m    = calcMean(data);
    const med  = calcMedian(data);
    const mo   = calcMode(data);
    const sd   = calcSD(data);
    const q1   = quantile(data, 0.25);
    const q3   = quantile(data, 0.75);
    const iqr  = q3 - q1;
    const mn   = Math.min(...data);
    const mx   = Math.max(...data);

    // Summary card
    summary.innerHTML = `
      <div class="space-y-1">
        <div><strong>n:</strong> ${data.length}</div>
        <div><strong>Mean:</strong> <span class="text-red-600 font-bold">${m.toFixed(2)}</span></div>
        <div><strong>Median:</strong> <span class="text-teal-600 font-bold">${med.toFixed(2)}</span></div>
        <div><strong>Mode:</strong> <span class="text-blue-600 font-bold">${mo.join(', ')}</span></div>
        <div><strong>SD:</strong> ${sd.toFixed(2)}</div>
        <div><strong>Range:</strong> ${mn} – ${mx}</div>
        <div><strong>IQR:</strong> ${q1.toFixed(1)} – ${q3.toFixed(1)}</div>
      </div>`;

    // Result text
    const skewDir = m > med ? 'right-skewed' : m < med ? 'left-skewed' : 'symmetric';
    result.innerHTML = `
      <div class="space-y-2">
        <p><strong>Interpretation:</strong> The distribution appears <strong>${skewDir}</strong>.</p>
        <p>Mean (${m.toFixed(2)}) ${m>med ? '>' : m<med ? '<' : '='} Median (${med.toFixed(2)}) —
           ${skewDir === 'symmetric' ? 'suggesting symmetry.' : `suggesting a ${skewDir} distribution. Report median (IQR) for skewed data.`}</p>
      </div>`;

    drawHistogram(data, m, med, mo);
    drawBoxplot(data, m, med, mo, q1, q3, mn, mx);
  }

  function drawHistogram(data, m, med, modes){
    const sorted = data.slice().sort((a,b)=>a-b);
    const mn = sorted[0], mx = sorted[sorted.length-1];
    const range = mx - mn || 1;
    const nBins = Math.min(Math.ceil(Math.sqrt(data.length)), 20);
    const binW = range / nBins;

    const bins = [];
    const labels = [];
    for(let i=0; i<nBins; i++){
      const lo = mn + i*binW;
      const hi = lo + binW;
      bins.push(data.filter(v => i===nBins-1 ? v>=lo&&v<=hi : v>=lo&&v<hi).length);
      labels.push(lo.toFixed(1));
    }

    const ctx = document.getElementById('ctHistogram').getContext('2d');
    if(histChart) histChart.destroy();

    // Find which bin the median, mean, mode fall in
    function binIdx(val){ return Math.min(Math.floor((val-mn)/binW), nBins-1); }

    const bgColors = bins.map((_,i)=>{
      if(i===binIdx(med)) return 'rgba(13,148,136,0.6)';
      if(modes.some(mo=>i===binIdx(mo))) return 'rgba(59,130,246,0.6)';
      return 'rgba(99,102,241,0.35)';
    });

    histChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Frequency',
          data: bins,
          backgroundColor: bgColors,
          borderColor: bgColors.map(c=>c.replace('0.35','0.7').replace('0.6','0.9')),
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { title: items => `Bin: ${items[0].label}`, label: item => `Count: ${item.raw}` } },
          annotation: undefined,
        },
        scales: {
          x: { title: { display: true, text: 'Value' }, grid: { display: false } },
          y: { title: { display: true, text: 'Frequency' }, beginAtZero: true, ticks: { stepSize: 1 } }
        }
      },
      plugins: [{
        afterDraw: function(chart) {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;
          const top = yAxis.top;
          const bottom = yAxis.bottom;

          // Median vertical line (teal)
          const medBin = binIdx(med);
          const medX = xAxis.getPixelForValue(medBin);
          ctx.save();
          ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 2.5; ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(medX, top); ctx.lineTo(medX, bottom); ctx.stroke();
          ctx.fillStyle = '#0d9488'; ctx.font = 'bold 11px Inter, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('Median', medX, top - 5);
          ctx.restore();

          // Mean dot (red)
          const meanBin = binIdx(m);
          const meanX = xAxis.getPixelForValue(meanBin);
          ctx.save();
          ctx.fillStyle = '#ef4444';
          ctx.beginPath(); ctx.arc(meanX, top + 10, 5, 0, Math.PI*2); ctx.fill();
          ctx.font = 'bold 11px Inter, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('Mean', meanX, top + 25);
          ctx.restore();
        }
      }]
    });
  }

  function drawBoxplot(data, m, med, modes, q1, q3, mn, mx){
    const ctx = document.getElementById('ctBox').getContext('2d');
    if(boxChart) boxChart.destroy();

    // Use a horizontal bar approach with custom drawing
    const iqr = q3 - q1;
    const whiskerLo = Math.max(mn, q1 - 1.5*iqr);
    const whiskerHi = Math.min(mx, q3 + 1.5*iqr);
    const outliers = data.filter(v => v < whiskerLo || v > whiskerHi);
    const padding = (mx - mn) * 0.1 || 1;

    boxChart = new Chart(ctx, {
      type: 'bar',
      data: { labels: [''], datasets: [{ data: [0] }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { min: mn - padding, max: mx + padding, grid: { color: '#f1f5f9' } },
          y: { display: false }
        }
      },
      plugins: [{
        afterDraw: function(chart){
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const area = chart.chartArea;
          const cy = (area.top + area.bottom) / 2;
          const boxH = (area.bottom - area.top) * 0.5;

          const xQ1 = xAxis.getPixelForValue(q1);
          const xQ3 = xAxis.getPixelForValue(q3);
          const xMed = xAxis.getPixelForValue(med);
          const xWLo = xAxis.getPixelForValue(whiskerLo);
          const xWHi = xAxis.getPixelForValue(whiskerHi);
          const xMean = xAxis.getPixelForValue(m);

          ctx.save();

          // Whisker lines
          ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(xWLo, cy); ctx.lineTo(xQ1, cy); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(xQ3, cy); ctx.lineTo(xWHi, cy); ctx.stroke();

          // Whisker caps
          ctx.beginPath(); ctx.moveTo(xWLo, cy-boxH*0.3); ctx.lineTo(xWLo, cy+boxH*0.3); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(xWHi, cy-boxH*0.3); ctx.lineTo(xWHi, cy+boxH*0.3); ctx.stroke();

          // IQR box
          ctx.fillStyle = 'rgba(99,102,241,0.15)';
          ctx.fillRect(xQ1, cy-boxH/2, xQ3-xQ1, boxH);
          ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2;
          ctx.strokeRect(xQ1, cy-boxH/2, xQ3-xQ1, boxH);

          // Median line (teal)
          ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(xMed, cy-boxH/2); ctx.lineTo(xMed, cy+boxH/2); ctx.stroke();

          // Mean dot (red)
          ctx.fillStyle = '#ef4444';
          ctx.beginPath(); ctx.arc(xMean, cy, 5, 0, Math.PI*2); ctx.fill();

          // Mode diamond (blue)
          modes.forEach(mo => {
            const xMo = xAxis.getPixelForValue(mo);
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.moveTo(xMo, cy-7); ctx.lineTo(xMo+5, cy); ctx.lineTo(xMo, cy+7); ctx.lineTo(xMo-5, cy); ctx.closePath();
            ctx.fill();
          });

          // Outliers
          outliers.forEach(v => {
            const xo = xAxis.getPixelForValue(v);
            ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(xo, cy, 4, 0, Math.PI*2); ctx.stroke();
          });

          // Labels
          ctx.fillStyle = '#64748b'; ctx.font = '10px Inter, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('Q1='+q1.toFixed(1), xQ1, cy+boxH/2+14);
          ctx.fillText('Q3='+q3.toFixed(1), xQ3, cy+boxH/2+14);
          ctx.fillText('Med='+med.toFixed(1), xMed, cy-boxH/2-6);

          ctx.restore();
        }
      }]
    });
  }
})();
