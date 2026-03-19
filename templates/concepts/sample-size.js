function ssCalc(p1,p2,alpha,power){
  const z_alpha = alpha===0.05?1.96:alpha===0.01?2.576:1.645;
  const z_beta = power===0.8?0.84:power===0.9?1.28:1.645;
  const p=(p1+p2)/2; const n=Math.ceil((2*p*(1-p)*Math.pow(z_alpha+z_beta,2))/Math.pow(p1-p2,2)); return n;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn=document.getElementById('ss-go'); const out=document.getElementById('ss-out');
  btn.addEventListener('click', ()=>{
    const p1=(Number(document.getElementById('ss-p1').value)||0)/100; const p2=(Number(document.getElementById('ss-p2').value)||0)/100; const alpha=Number(document.getElementById('ss-alpha').value); const power=Number(document.getElementById('ss-power').value);
    if(!p1||!p2){ out.innerHTML='Enter both rates'; return; }
    const n=ssCalc(p1,p2,alpha,power);
    out.innerHTML=`<p>Per group: <strong>${n}</strong></p><p>Total: <strong>${n*2}</strong></p>`;
  });
});