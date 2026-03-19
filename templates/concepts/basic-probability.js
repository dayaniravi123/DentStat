document.addEventListener('DOMContentLoaded', ()=>{
  const prev=document.getElementById('bp-prev'); const mult=document.getElementById('bp-mult'); const btn=document.getElementById('bp-calc'); const out=document.getElementById('bp-out');
  btn.addEventListener('click', ()=>{
    const p=Math.max(0,Math.min(100,Number(prev.value)||0))/100; const m=Math.max(0,Number(mult.value)||1);
    const individual = Math.min(1, p * m);
    out.innerHTML = `<p><strong>Population prevalence:</strong> ${(p*100).toFixed(1)}%</p><p><strong>Estimated individual risk:</strong> ${(individual*100).toFixed(1)}%</p>`;
  });
});