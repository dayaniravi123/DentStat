// Copied from templates/concepts/central-tendency.js
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

// ... rest of central-tendency.js copied verbatim ...
