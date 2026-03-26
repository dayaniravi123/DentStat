// Sample Size — Mini CLT demo (sample means)
(function(){
  'use strict';

  const popSelect = document.getElementById('popType');
  const nSlider   = document.getElementById('n');
  const nLabel    = document.getElementById('nLabel');
  const drawsInput= document.getElementById('draws');
  const runBtn    = document.getElementById('run');
  const resetBtn  = document.getElementById('reset');
  const countEl   = document.getElementById('count');
  const momEl     = document.getElementById('mom');
  const somEl     = document.getElementById('som');

  if(!runBtn) return;

  let cltChart = null;
  let means = [];
  let running = false;

  nSlider.addEventListener('input', function(){ nLabel.textContent = this.value; });

  // Population generators
  function gaussRandom(){
    let u=0,v=0;
    while(!u) u=Math.random();
    while(!v) v=Math.random();
    return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
  }

  function generateValue(type){
    switch(type){
      case 'uniform': return Math.random()*10;
      case 'exponential': return -Math.log(1-Math.random())/0.5; // λ=0.5, mean=2
      case 'bimodal': return Math.random()<0.5 ? 3+gaussRandom()*0.8 : 7+gaussRandom()*0.8;
      case 'dental': // Right-skewed DMFT-like
        const r = Math.random();
        if(r<0.3) return 0;
        if(r<0.55) return 1+Math.random();
        if(r<0.75) return 2+Math.random()*2;
        return 4+Math.random()*6;
      default: return Math.random()*10;
    }
  }

  function sampleMean(type, n){
    let sum=0;
    for(let i=0;i<n;i++) sum += generateValue(type);
    return sum/n;
  }

  function calcMean(arr){ return arr.reduce((s,x)=>s+x,0)/arr.length; }
  function calcSD(arr){
    if(arr.length<2) return 0;
    const m=calcMean(arr);
    return Math.sqrt(arr.reduce((s,x)=>s+(x-m)*(x-m),0)/(arr.length-1));
  }

  runBtn.addEventListener('click', async function(){
    if(running) return;
    running = true;
    runBtn.classList.add('opacity-50');

    const type = popSelect.value;
    const n = parseInt(nSlider.value) || 30;
    const totalDraws = Math.min(parseInt(drawsInput.value) || 300, 2000);

    const batchSize = 10;
    const batches = Math.ceil(totalDraws / batchSize);

    for(let b=0; b<batches; b++){
      const count = Math.min(batchSize, totalDraws - b*batchSize);
      for(let i=0; i<count; i++){
        means.push(sampleMean(type, n));
      }

      // Update stats
      const m = calcMean(means);
      const sd = calcSD(means);
      countEl.textContent = means.length;
      momEl.textContent = m.toFixed(3);
      somEl.textContent = sd.toFixed(3);

      // Redraw chart every few batches for smooth animation
      if(b % 3 === 0 || b === batches-1){
        drawHistogram();
      }
      await new Promise(r => setTimeout(r, 20));
    }

    running = false;
    runBtn.classList.remove('opacity-50');
  });

  resetBtn.addEventListener('click', function(){
    means = [];
    countEl.textContent = '0';
    momEl.textContent = '-';
    somEl.textContent = '-';
    if(cltChart){ cltChart.destroy(); cltChart=null; }
  });

  function drawHistogram(){
    if(means.length < 2) return;

    const sorted = means.slice().sort((a,b)=>a-b);
    const mn = sorted[0];
    const mx = sorted[sorted.length-1];
    const range = mx - mn || 1;
    const nBins = Math.min(Math.max(Math.ceil(Math.sqrt(means.length)), 15), 40);
    const binW = range / nBins;

    const bins = [];
    const labels = [];
    for(let i=0; i<nBins; i++){
      const lo = mn + i*binW;
      const hi = lo + binW;
      bins.push(means.filter(v => i===nBins-1 ? v>=lo&&v<=hi : v>=lo&&v<hi).length);
      labels.push((lo + binW/2).toFixed(2));
    }

    const m = calcMean(means);
    const sd = calcSD(means);

    // Color bins: gradient from center
    const bgColors = labels.map(l => {
      const dist = Math.abs(parseFloat(l) - m) / (sd || 1);
      if(dist < 0.5) return 'rgba(13,148,136,0.7)';
      if(dist < 1) return 'rgba(13,148,136,0.55)';
      if(dist < 1.5) return 'rgba(13,148,136,0.40)';
      if(dist < 2) return 'rgba(13,148,136,0.25)';
      return 'rgba(13,148,136,0.12)';
    });

    // Normal curve overlay
    const maxBin = Math.max(...bins);

    const ctx = document.getElementById('cltChart').getContext('2d');
    if(cltChart) cltChart.destroy();

    cltChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sample Means',
          data: bins,
          backgroundColor: bgColors,
          borderColor: bgColors.map(c=>c.replace(/[\d.]+\)$/,'0.85)')),
          borderWidth: 1,
          borderRadius: 3,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        layout: {
          padding: { top: 28, right: 18, bottom: 18, left: 10 }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: items => 'Mean ≈ ' + items[0].label,
              label: item => 'Count: ' + item.raw
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Sample Mean Value' },
            grid: { display: false },
            ticks: {
              maxTicksLimit: 8,
              callback: function(val, idx){ return parseFloat(this.getLabelForValue(val)).toFixed(1); }
            }
          },
          y: {
            title: { display: true, text: 'Frequency' },
            beginAtZero: true,
          }
        }
      },
      plugins: [{
        afterDraw: function(chart){
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;

          // Draw normal curve overlay
          ctx.save();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([]);
          ctx.beginPath();

          let first = true;
          for(let i=0; i<nBins; i++){
            const x = xAxis.getPixelForValue(i);
            const val = parseFloat(labels[i]);
            const z = (val - m) / sd;
            const pdf = Math.exp(-0.5*z*z) / (sd * Math.sqrt(2*Math.PI));
            const scaledY = pdf * means.length * binW;
            const y = yAxis.getPixelForValue(scaledY);
            if(first){ ctx.moveTo(x,y); first=false; }
            else ctx.lineTo(x,y);
          }
          ctx.stroke();

          // Mean vertical line
          const meanBinIdx = labels.findIndex(l => parseFloat(l) >= m);
          if(meanBinIdx >= 0){
            const meanX = xAxis.getPixelForValue(meanBinIdx);
            ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.setLineDash([5,3]);
            ctx.beginPath(); ctx.moveTo(meanX, yAxis.top); ctx.lineTo(meanX, yAxis.bottom); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#6366f1'; ctx.font = 'bold 11px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
            ctx.fillText('Grand Mean=' + m.toFixed(2), meanX, yAxis.top - 8);
          }

          ctx.restore();
        }
      }]
    });
  }
})();
