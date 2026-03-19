document.addEventListener('DOMContentLoaded', ()=>{
  const tp=document.getElementById('t2-tp'); const fp=document.getElementById('t2-fp'); const fn=document.getElementById('t2-fn'); const tn=document.getElementById('t2-tn'); const btn=document.getElementById('t2-calc'); const out=document.getElementById('t2-out');
  btn.addEventListener('click', ()=>{
    const TP=Number(tp.value)||0, FP=Number(fp.value)||0, FN=Number(fn.value)||0, TN=Number(tn.value)||0;
    const sens = (TP/(TP+FN))||0; const spec = (TN/(TN+FP))||0; const ppv = (TP/(TP+FP))||0; const npv = (TN/(TN+FN))||0;
    out.innerHTML = `<p><strong>Sensitivity:</strong> ${(sens*100).toFixed(1)}%</p><p><strong>Specificity:</strong> ${(spec*100).toFixed(1)}%</p><p><strong>PPV:</strong> ${(ppv*100).toFixed(1)}%</p><p><strong>NPV:</strong> ${(npv*100).toFixed(1)}%</p>`;
  });
});