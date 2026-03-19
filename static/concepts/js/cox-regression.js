lucide.createIcons();
let chart=null;

function update(){
  const hr=parseFloat(document.getElementById('cx-hr').value);
  const lam=parseFloat(document.getElementById('cx-lam').value);
  document.getElementById('cx-hr-lbl').textContent=hr.toFixed(2);
  document.getElementById('cx-lam-lbl').textContent=lam.toFixed(2);

  const t=[], s0=[], s1=[];
  for(let i=0;i<=60;i++){
    const time=i; // months
    t.push(time);
    // exponential survival S(t)=exp(-lambda*t)
    s0.push(Math.exp(-lam*time)*100);
    s1.push(Math.exp(-(lam*hr)*time)*100);
  }
  render(t,s0,s1);
}

function render(t,s0,s1){
  const ctx=document.getElementById('cxChart').getContext('2d');
  if(chart) chart.destroy();
  chart=new Chart(ctx,{
    type:'line',
    data:{
      labels:t.map(x=>String(x)),
      datasets:[
        {label:'Baseline (HR=1)', data:s0, borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.10)', fill:true, tension:0.25, pointRadius:0},
        {label:'Exposed (HR applied)', data:s1, borderColor:'#ef4444', backgroundColor:'rgba(239,68,68,0.10)', fill:true, tension:0.25, pointRadius:0}
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{title:{display:true,text:'Time (months)'}},
        y:{title:{display:true,text:'Survival %'}, min:0, max:100}
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('cx-hr').addEventListener('input', update);
  document.getElementById('cx-lam').addEventListener('input', update);
  update();
});
