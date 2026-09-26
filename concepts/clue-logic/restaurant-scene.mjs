import {restaurantFrame} from './restaurant-motion.mjs';
const assets={rug:new URL('./art/restaurant/rug-v1.png',import.meta.url),drain:new URL('./art/restaurant/drain-v1.png',import.meta.url),milk:new URL('./art/restaurant/milk-v1.png',import.meta.url)};
export async function makeKitchen(canvas,kind){
 const picture=new Image();picture.src=String(assets[kind]);await picture.decode();
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
 let disposed=false;
 function draw({time=0,view='auto'}={}){
  if(disposed)return;
  const box=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  const w=Math.max(1,Math.round(box.width*dpr)),h=Math.max(1,Math.round(box.height*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}
  ctx.fillStyle='#e9e0cf';ctx.fillRect(0,0,w,h);
  const size=Math.min(w,h),x=(w-size)/2,y=(h-size)/2;
  const {shot,next,mix}=restaurantFrame(time,view);
  const panel=(n,alpha)=>{ctx.globalAlpha=alpha;const sw=picture.width/2,sh=picture.height/2;
   // Trim the generated atlas gutters; contain the entire shot so faces stay visible.
   ctx.drawImage(picture,(n%2)*sw+5,Math.floor(n/2)*sh+5,sw-10,sh-10,x,y,size,size)};
  panel(shot,1);if(mix>0)panel(next,mix);ctx.globalAlpha=1;
 }
 return {draw,dispose(){disposed=true;ctx.clearRect(0,0,canvas.width,canvas.height)}};
}
