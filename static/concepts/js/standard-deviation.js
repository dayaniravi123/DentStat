// Copied from templates/concepts/standard-deviation.js
function parseNums(text){return text.split(',').map(s=>s.trim()).filter(Boolean).map(Number).filter(n=>!Number.isNaN(n));}
function sampleSD(arr){ const m=arr.reduce((s,x)=>s+x,0)/arr.length; const v=arr.reduce((s,x)=>s+(x-m)*(x-m),0)/(arr.length-1); return Math.sqrt(v); }

document.addEventListener('DOMContentLoaded', ()=>{
  const btn=document.getElementById('sd-btn'); const ta=document.getElementById('sd-data'); const out=document.getElementById('sd-result');
  if(btn){
    btn.addEventListener('click', ()=>{
      const a=parseNums(ta.value); if(a.length<2){ out.innerHTML='Please enter at least 2 numbers'; return; }
      out.innerHTML=`<p><strong>n:</strong> ${a.length}</p><p><strong>Sample SD:</strong> ${sampleSD(a).toFixed(3)}</p>`;
    });
  }
});
