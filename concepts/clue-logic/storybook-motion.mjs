const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p)};
export function storybookMotion(time,inspect=false){
 const t=inspect?24:Math.max(0,Math.min(26,time));
 const lap=t<6?(t-1)/5:(t-6)/5,phase=Math.max(0,Math.min(1,lap));
 const excursion=t>=1&&t<11?Math.sin(phase*Math.PI):0;
 return {t,excursion,moleVisible:t<11,moleFacing:phase<.5?1:-1,moleStride:Math.floor(t*7)%2,
  wizardEnter:ease(8,12,t),cast:ease(12,14,t)*(1-ease(18,20,t)),
  reveal:ease(16,19,t),moundOpacity:1-ease(15.5,17,t),magic:ease(14,15.4,t)*(1-ease(17,20,t)),
  zoom:1.22-.22*ease(7,14,t),nameplate:false};
}
