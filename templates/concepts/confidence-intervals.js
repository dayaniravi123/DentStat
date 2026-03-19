document.addEventListener('DOMContentLoaded', ()=>{
  const btn=document.getElementById('ci-go'); const out=document.getElementById('ci-out');
  btn.addEventListener('click', ()=>{
    const events=Number(document.getElementById('ci-events').value)||0; const total=Number(document.getElementById('ci-total').value)||0;
    if(!events||!total||events>total){ out.innerHTML='Enter valid counts'; return; }
    const p=events/total; const se=Math.sqrt((p*(1-p))/total); const z=1.96; const lo=Math.max(0,p-z*se); const hi=Math.min(1,p+z*se);
    out.innerHTML=`<p><strong>Proportion:</strong> ${(p*100).toFixed(1)}%</p><p><strong>95% CI:</strong> ${(lo*100).toFixed(1)}% - ${(hi*100).toFixed(1)}%</p>`;
  });
});