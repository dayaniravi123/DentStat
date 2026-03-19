lucide.createIcons();
let chart=null;

function compute(){
  const a=+document.getElementById('a').value||0;
  const b=+document.getElementById('b').value||0;
  const c=+document.getElementById('c').value||0;
  const d=+document.getElementById('d').value||0;

  const r1=a+b, r2=c+d, c1=a+c, c2=b+d, n=r1+r2;
  if(n===0){ return; }

  const ea=r1*c1/n, eb=r1*c2/n, ec=r2*c1/n, ed=r2*c2/n;
  const chi = (ea?((a-ea)**2/ea):0) + (eb?((b-eb)**2/eb):0) + (ec?((c-ec)**2/ec):0) + (ed?((d-ed)**2/ed):0);

  document.getElementById('chi').textContent = chi.toFixed(3);

  render([a,b,c,d],[ea,eb,ec,ed]);
}

function render(obs, exp){
  const ctx=document.getElementById('csChart').getContext('2d');
  if(chart) chart.destroy();
  chart=new Chart(ctx,{
    type:'bar',
    data:{
        labels:['Treat +','Treat \u2212','Ctrl +','Ctrl \u2212'],
      datasets:[
        {label:'Observed', data:obs, backgroundColor:'rgba(245,158,11,0.65)'},
        {label:'Expected', data:exp, backgroundColor:'rgba(59,130,246,0.35)'}
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{ y:{ beginAtZero:true, title:{display:true,text:'Count'} } }
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('cs-run').addEventListener('click', compute);
  compute();
});
