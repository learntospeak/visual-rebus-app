import {storybookMotion} from './storybook-motion.mjs';
const backgroundURL=new URL('./art/storybook/garden-v1.png',import.meta.url).href;
const charactersURL=new URL('./art/storybook/characters-v1.png',import.meta.url).href;
const load=url=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Storybook artwork unavailable'));img.src=url});
// Painted layered scene: deliberately separate from the other scenes' 3D renderer.
export async function makeKitchen(canvas){
 const [garden,atlas]=await Promise.all([load(backgroundURL),load(charactersURL)]);
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');
 let disposed=false;
 const crops={wizard:[10,8,445,682],casting:[508,25,560,665],knight:[1074,6,462,684],moleA:[12,699,462,261],moleB:[527,699,455,261],mound:[1015,697,521,290]};
 function sprite(name,x,y,height,{alpha=1,flip=1,rotation=0}={}){
  if(alpha<=0)return;const [sx,sy,sw,sh]=crops[name],w=height*sw/sh;
  ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.rotate(rotation);ctx.scale(flip,1);ctx.drawImage(atlas,sx,sy,sw,sh,-w/2,-height,w,height);ctx.restore();
 }
 function shadow(x,y,w,alpha){ctx.save();ctx.globalAlpha=alpha;const g=ctx.createRadialGradient(x,y,0,x,y,w);g.addColorStop(0,'#493c2b');g.addColorStop(1,'rgba(73,60,43,0)');ctx.translate(x,y);ctx.scale(1,.17);ctx.fillStyle=g;ctx.translate(-x,-y);ctx.beginPath();ctx.arc(x,y,w,0,Math.PI*2);ctx.fill();ctx.restore()}
 return {draw({time=0,view='auto'}={}){
  if(disposed)return;const ratio=Math.min(window.devicePixelRatio||1,2),cw=Math.max(1,canvas.clientWidth),ch=Math.max(1,canvas.clientHeight);
  if(canvas.width!==Math.round(cw*ratio)||canvas.height!==Math.round(ch*ratio)){canvas.width=Math.round(cw*ratio);canvas.height=Math.round(ch*ratio)}
  const W=1000,H=W*ch/cw;ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);
  ctx.clearRect(0,0,W,H);const m=storybookMotion(time,view==='inspect'),floor=H*.85;
  ctx.save();const zoom=view==='inspect'?1:m.zoom;ctx.translate(W*.6,floor);ctx.scale(zoom,zoom);ctx.translate(-W*.6,-floor);
  const scale=Math.max(W/garden.width,H/garden.height);ctx.drawImage(garden,(W-garden.width*scale)/2,(H-garden.height*scale)/2,garden.width*scale,garden.height*scale);
  const moundX=620+(view==='away'?-35:0),moundH=Math.min(170,H*.19);
  // The mole walks out, turns, and returns twice; tiny body bobs follow its footfalls.
  shadow(moundX,floor-8,95,.22*m.moundOpacity);
  sprite('mound',moundX,floor,moundH,{alpha:m.moundOpacity});
  if(m.moleVisible){const moleX=moundX+m.excursion*180,moleY=floor-12+Math.sin(m.t*16)*m.excursion*2;
   const moleH=Math.min(104,H*.12)*(.6+.4*Math.min(1,m.excursion*5));
   shadow(moleX,moleY,50,.16);sprite(m.moleStride?'moleB':'moleA',moleX,moleY,moleH,{flip:m.moleFacing,alpha:.5+.5*Math.min(1,m.excursion*5)});
  }
  const wizardH=Math.min(355,H*.46),wizardX=-180+m.wizardEnter*480;
  const walkBob=m.t>8&&m.t<12?Math.sin(m.t*9)*3:Math.sin(m.t*1.5)*.65;
  shadow(wizardX,floor,76,.2*m.wizardEnter);
  sprite('wizard',wizardX,floor+walkBob,wizardH,{alpha:1-m.cast,rotation:Math.sin(m.t*2)*.008});
  // Crossfade matched poses with a small weight shift before the wand gesture.
  sprite('casting',wizardX+26,floor+walkBob,wizardH,{alpha:m.cast,rotation:-Math.sin(m.t*2)*.005});
  if(m.reveal>0){const knightH=Math.min(580,H*.73),lift=(1-m.reveal)*40;shadow(moundX,floor,105,.25*m.reveal);sprite('knight',moundX,floor+lift,knightH,{alpha:m.reveal,rotation:Math.sin(m.t*.9)*.003})}
  // A travelling spell arc, then soft expanding smoke conceals the transformation.
  if(m.magic>0){
   ctx.save();for(let i=0;i<35;i++){const p=(i/35+m.t*.35)%1,x=wizardX+100+(moundX-wizardX-100)*p,y=floor-wizardH*.75-Math.sin(p*Math.PI)*60+p*wizardH*.35;
    ctx.globalAlpha=m.magic*(.25+.65*(i%3)/2);ctx.fillStyle=i%2?'#f6dfa5':'#cfb26d';ctx.beginPath();ctx.arc(x,y,1.5+(i%3),0,Math.PI*2);ctx.fill()}
   for(let i=0;i<14;i++){const a=i*2.4,p=Math.max(0,Math.min(1,(m.t-14.8-i*.03)/4.5)),r=30+Math.sin(p*Math.PI)*80,x=moundX+Math.sin(a)*p*160,y=floor-40-(i%4)*45-p*95;
    const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(234,225,197,.8)');g.addColorStop(1,'rgba(234,225,197,0)');ctx.globalAlpha=m.magic*(1-p*.5);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}ctx.restore();
  }
  if(m.nameplate){ctx.save();ctx.fillStyle='#263e38';ctx.strokeStyle='#c5a46c';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(moundX-150,floor+10,300,49,8);ctx.fill();ctx.stroke();ctx.fillStyle='#f4e7c8';ctx.font='bold 25px Georgia';ctx.textAlign='center';ctx.fillText('THE MOUNTAIN',moundX,floor+43);ctx.restore()}
  ctx.restore();
  const vignette=ctx.createRadialGradient(W/2,H*.5,H*.3,W/2,H*.5,H*.85);vignette.addColorStop(0,'rgba(40,49,33,0)');vignette.addColorStop(1,'rgba(40,49,33,.18)');ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);
 },dispose(){disposed=true;ctx.clearRect(0,0,canvas.width,canvas.height)}};
}
