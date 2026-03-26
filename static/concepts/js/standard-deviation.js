// Standard Deviation — Interactive: see SD change
(function(){
  'use strict';

  const meanInput  = document.getElementById('sd-mean');
  const spreadSlider = document.getElementById('sd-spread');
  const spreadLabel  = document.getElementById('sd-spread-label');
  const nSlider    = document.getElementById('sd-n');
  const nLabel     = document.getElementById('sd-n-label');
  const genBtn     = document.getElementById('sd-generate');
  const outMean    = document.getElementById('sd-out-mean');
  const outSD      = document.getElementById('sd-out-sd');
  const outText    = document.getElementById('sd-out-text');

  if(!genBtn) return;

  let sdChart = null;

  // Update labels on slider change
  spreadSlider.addEventListener('input', function(){ spreadLabel.textContent = this.value; });
  nSlider.addEventListener('input', function(){ nLabel.textContent = this.value; });

  // Box-Muller normal random
  function gaussRandom(){
    let u=0, v=0;
    while(!u) u=Math.random();
    while(!v) v=Math.random();
    return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
  }

  function calcMean(arr){ return arr.reduce((s,x)=>s+x,0)/arr.length; }
  function calcSD(arr){
    const m=calcMean(arr);
    return Math.sqrt(arr.reduce((s,x)=>s+(x-m)*(x-m),0)/(arr.length-1));
  }

  genBtn.addEventListener('click', generate);

  function generate(){
    const targetMean = parseFloat(meanInput.value) || 4;
    const targetSD   = parseFloat(spreadSlider.value) || 0.8;
    const n          = parseInt(nSlider.value) || 60;

    // Generate sample
    const data = [];
    for(let i=0; i<n; i++){
      const val = targetMean + targetSD * gaussRandom();
      data.push(+val.toFixed(2));
    }

    const m  = calcMean(data);
    const sd = calcSD(data);

    // Update output
    outMean.textContent = m.toFixed(2) + ' mm';
    outSD.textContent   = sd.toFixed(2) + ' mm';

    // Interpretation
    let interp = '';
    if(sd < 0.5) interp = 'Very consistent measurements — low variability. Patients have similar pocket depths.';
    else if(sd < 1.0) interp = 'Moderate variability — typical for a general dental practice.';
    else if(sd < 1.5) interp = 'Considerable spread — suggests a mix of healthy and diseased sites.';
    else interp = 'High variability — consider stratifying by disease severity.';
    outText.textContent = interp;

    drawHistogram(data, m, sd, targetMean, targetSD);
  }

  function drawHistogram(data, sampleMean, sampleSD, targetMean, targetSD){
    const sorted = data.slice().sort((a,b)=>a-b);
    const mn = sorted[0], mx = sorted[sorted.length-1];
    const range = mx - mn || 1;
    const nBins = Math.min(Math.max(Math.ceil(Math.sqrt(data.length)), 8), 25);
    const binW = range / nBins;

    const bins = [];
    const labels = [];
    for(let i=0; i<nBins; i++){
      const lo = mn + i*binW;
      const hi = lo + binW;
      bins.push(data.filter(v => i===nBins-1 ? v>=lo&&v<=hi : v>=lo&&v<hi).length);
      labels.push(lo.toFixed(1));
    }

    // Color bins based on distance from mean (gradient: teal near mean, lighter far)
    const bgColors = labels.map(l => {
      const binCenter = parseFloat(l) + binW/2;
      const dist = Math.abs(binCenter - sampleMean) / (sampleSD || 1);
      if(dist < 1) return 'rgba(13,148,136,0.65)';
      if(dist < 2) return 'rgba(13,148,136,0.40)';
      return 'rgba(13,148,136,0.20)';
    });

    const ctx = document.getElementById('sdChart').getContext('2d');
    if(sdChart) sdChart.destroy();

    // Generate normal curve overlay data
    const curveLabels = [];
    const curveData = [];
    const curveSteps = 50;
    const curveMin = mn - binW;
    const curveMax = mx + binW;
    const curveRange = curveMax - curveMin;
    for(let i=0; i<=curveSteps; i++){
      const x = curveMin + (i/curveSteps)*curveRange;
      curveLabels.push(x.toFixed(1));
      // Normal PDF scaled to match histogram
      const z = (x - sampleMean)/sampleSD;
      const pdf = Math.exp(-0.5*z*z) / (sampleSD*Math.sqrt(2*Math.PI));
      curveData.push(pdf * data.length * binW); // scale to histogram
    }

    sdChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Frequency',
            data: bins,
            backgroundColor: bgColors,
            borderColor: bgColors.map(c=>c.replace(/[\d.]+\)$/,'0.8)')),
            borderWidth: 1,
            borderRadius: 4,
            order: 2,
          },
        ]
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
              title: items => `Bin: ${items[0].label}`,
              label: item => `Count: ${item.raw}`
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Pocket Depth (mm)' },
            grid: { display: false },
          },
          y: {
            title: { display: true, text: 'Frequency' },
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      },
      plugins: [{
        afterDraw: function(chart){
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;

          // Draw mean ± SD lines
          const meanBinIdx = labels.findIndex(l => parseFloat(l)+binW/2 >= sampleMean) || 0;
          const meanX = xAxis.getPixelForValue(meanBinIdx);

          ctx.save();
          // Mean line
          ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5; ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(meanX, yAxis.top); ctx.lineTo(meanX, yAxis.bottom); ctx.stroke();
          ctx.fillStyle = '#ef4444'; ctx.font = 'bold 11px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
          ctx.fillText('Mean=' + sampleMean.toFixed(2), meanX, yAxis.top - 8);

          // ±1 SD bracket lines
          const sdLo = sampleMean - sampleSD;
          const sdHi = sampleMean + sampleSD;
          const sdLoIdx = labels.findIndex(l => parseFloat(l)+binW/2 >= sdLo);
          const sdHiIdx = labels.findIndex(l => parseFloat(l)+binW/2 >= sdHi);
          if(sdLoIdx >= 0){
            const xLo = xAxis.getPixelForValue(sdLoIdx);
            ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
            ctx.beginPath(); ctx.moveTo(xLo, yAxis.top+10); ctx.lineTo(xLo, yAxis.bottom); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#6366f1'; ctx.font = '10px Inter, sans-serif'; ctx.textBaseline = 'top';
            ctx.fillText('-1SD', xLo, yAxis.top + 16);
          }
          if(sdHiIdx >= 0 && sdHiIdx < labels.length){
            const xHi = xAxis.getPixelForValue(sdHiIdx);
            ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
            ctx.beginPath(); ctx.moveTo(xHi, yAxis.top+10); ctx.lineTo(xHi, yAxis.bottom); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#6366f1'; ctx.font = '10px Inter, sans-serif'; ctx.textBaseline = 'top';
            ctx.fillText('+1SD', xHi, yAxis.top + 16);
          }

          // SD bracket at bottom
          if(sdLoIdx >= 0 && sdHiIdx >= 0 && sdHiIdx < labels.length){
            const xLo = xAxis.getPixelForValue(Math.max(sdLoIdx,0));
            const xHi = xAxis.getPixelForValue(Math.min(sdHiIdx,labels.length-1));
            const bracketY = yAxis.bottom - 15;
            ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(xLo, bracketY-5); ctx.lineTo(xLo, bracketY); ctx.lineTo(xHi, bracketY); ctx.lineTo(xHi, bracketY-5);
            ctx.stroke();
            ctx.fillStyle = '#6366f1'; ctx.font = 'bold 10px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText('SD='+sampleSD.toFixed(2), (xLo+xHi)/2, bracketY+12);
          }

          ctx.restore();
        }
      }]
    });
  }
})();
