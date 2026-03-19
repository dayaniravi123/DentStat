// LLN playground vanilla JS (moved from inline template)
(function() {
  let trueP = 30;
  let patients = [];
  let isRunning = false;
  let speed = 50;
  let intervalId = null;

  let playBtn, resetBtn, trueRange, trueVal, speedRange, totalEl, cariesEl, healthyEl, scatterCanvas, histCanvas;

  function updateStatsDisplay() {
    const cariesCount = patients.filter(p => p).length;
    if (totalEl) totalEl.textContent = patients.length;
    if (cariesEl) cariesEl.textContent = cariesCount;
    if (healthyEl) healthyEl.textContent = patients.length - cariesCount;
  }

  function addPatient() {
    const hasCaries = Math.random() < trueP / 100;
    patients.push(hasCaries);
    updateStatsDisplay();
    drawScatter();
    drawHistogram();
  }

  function startSimulation() {
    if (isRunning) return;
    isRunning = true;
    if (playBtn) {
      playBtn.textContent = 'Pause';
      playBtn.classList.remove('bg-blue-600');
      playBtn.classList.add('bg-yellow-500');
    }
    const intervalMs = Math.max(10, 101 - speed);
    intervalId = setInterval(addPatient, intervalMs);
  }

  function pauseSimulation() {
    if (!isRunning) return;
    isRunning = false;
    if (playBtn) {
      playBtn.textContent = 'Play';
      playBtn.classList.remove('bg-yellow-500');
      playBtn.classList.add('bg-blue-600');
    }
    clearInterval(intervalId);
    intervalId = null;
  }

  function resetSimulation() {
    pauseSimulation();
    patients = [];
    updateStatsDisplay();
    drawScatter(true);
    drawHistogram(true);
  }

  function getCanvasSize(canvas, fallbackW = 400, fallbackH = 180) {
    const rect = canvas.getBoundingClientRect();
    let w = rect.width;
    let h = rect.height;
    if (!w || !h) {
      const style = window.getComputedStyle(canvas);
      w = parseFloat(style.width) || fallbackW;
      h = parseFloat(style.height) || fallbackH;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    return { w, h, dpr };
  }

  function drawScatter(clearOnly = false) {
    if (!scatterCanvas) return;
    const ctx = scatterCanvas.getContext('2d');
    const { w, h, dpr } = getCanvasSize(scatterCanvas, 360, 160);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (h * i) / 10;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      const x = (w * i) / 10;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    if (clearOnly || patients.length === 0) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Caries-Free', w / 2, h * 0.15);
      ctx.fillText('With Caries', w / 2, h * 0.95);
      return;
    }

    patients.forEach((hasCaries, idx) => {
      const x = ((idx + 1) / (patients.length + 1)) * w;
      const jitter = (Math.random() - 0.5) * h * 0.2;
      const baseY = hasCaries ? h * 0.75 : h * 0.25;
      const y = baseY + jitter;

      ctx.fillStyle = hasCaries ? '#ef4444' : '#10b981';
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = hasCaries ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke();
    });

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Caries-Free', w / 2, h * 0.15);
    ctx.fillText('With Caries', w / 2, h * 0.95);
  }

  function drawHistogram(clearOnly = false) {
    if (!histCanvas) return;
    const ctx = histCanvas.getContext('2d');
    const { w, h, dpr } = getCanvasSize(histCanvas, 360, 160);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const padding = Math.min(48, Math.round(Math.min(w, h) * 0.12));

    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#f3f4f6'; ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + ((h - padding * 2) * i) / 5;
      ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(w - padding, y); ctx.stroke();
    }

    ctx.strokeStyle = '#374151'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(padding, padding); ctx.lineTo(padding, h - padding); ctx.lineTo(w - padding, h - padding); ctx.stroke();

    ctx.fillStyle = '#6b7280'; ctx.font = 'bold 13px Roboto, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Observed Caries Rate (%)', w / 2, h - 10);
    ctx.textAlign = 'right'; ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Frequency', 0, 0); ctx.restore();

    ctx.textAlign = 'right'; ctx.font = '11px Roboto, sans-serif';
    for (let i = 0; i <= 5; i++) { const y = padding + ((h - padding * 2) * i) / 5; ctx.fillText(Math.round((5 - i) * 20), padding - 10, y + 4); }
    ctx.textAlign = 'center'; for (let i = 0; i <= 5; i++) { const x = padding + ((w - padding * 2) * i) / 5; ctx.fillText(i * 20, x, h - 20); }

    if (clearOnly || patients.length === 0) {
      const trueX = padding + ((w - padding * 2) * trueP) / 100;
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(trueX, padding); ctx.lineTo(trueX, h - padding); ctx.stroke(); ctx.setLineDash([]);
      return;
    }

    const observedRate = (patients.filter(p => p).length / patients.length) * 100;
    const binIndex = Math.round(observedRate / 20);

    ctx.fillStyle = '#3b82f6';
    const barCount = 5; const barWidth = (w - padding * 2) / barCount;
    for (let i = 0; i < barCount; i++) {
      const x = padding + i * barWidth;
      const barHeight = i === binIndex ? Math.min((h - padding * 2) * 0.5 + 20, h - padding - 10) : 20;
      ctx.fillRect(x, h - padding - barHeight, barWidth - 4, barHeight);
    }

    const trueX = padding + ((w - padding * 2) * trueP) / 100;
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(trueX, padding); ctx.lineTo(trueX, h - padding); ctx.stroke(); ctx.setLineDash([]);

    ctx.fillStyle = '#ef4444'; ctx.font = 'bold 12px Roboto, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('── True Rate', w - 120, padding + 20);
  }

  function togglePlay() { if (isRunning) pauseSimulation(); else startSimulation(); }

  function initLLNPlayground() {
    playBtn = document.getElementById('lln-play');
    resetBtn = document.getElementById('lln-reset');
    trueRange = document.getElementById('lln-true-p');
    trueVal = document.getElementById('lln-true-val');
    speedRange = document.getElementById('lln-speed');
    totalEl = document.getElementById('lln-total');
    cariesEl = document.getElementById('lln-caries-count');
    healthyEl = document.getElementById('lln-healthy-count');
    scatterCanvas = document.getElementById('llnScatterCanvas');
    histCanvas = document.getElementById('llnHistogramCanvas');

    if (!playBtn || !resetBtn || !trueRange || !speedRange) {
      setTimeout(initLLNPlayground, 100);
      return;
    }

    trueVal.textContent = trueP + '%';
    playBtn.textContent = 'Play';
    playBtn.classList.add('bg-blue-600', 'text-white');

    playBtn.addEventListener('click', togglePlay);
    resetBtn.addEventListener('click', resetSimulation);
    trueRange.addEventListener('input', (e) => { trueP = Number(e.target.value); trueVal.textContent = trueP + '%'; drawScatter(); drawHistogram(); });
    speedRange.addEventListener('input', (e) => { speed = Number(e.target.value); if (isRunning) { pauseSimulation(); startSimulation(); } });

    drawScatter(true);
    drawHistogram(true);
  }

  // auto-init
  setTimeout(initLLNPlayground, 50);

  window.LLNPlayground = { addPatient, resetSimulation, pauseSimulation, startSimulation, getPatients: () => patients };
})();
