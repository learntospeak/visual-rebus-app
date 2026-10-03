export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function symbol(value){
 if(typeof value==='string'&&value.includes(' · ')){const [shape,num]=value.split(' · ');return '<span class="compound">'+symbol(shape)+'<b>'+esc(num)+'</b></span>'}
 if(typeof value==='string'&&value.includes(' + ')){const [a,b]=value.split(' + ');return '<span class="symbol-pair">'+symbol(a)+'<small>+</small>'+symbol(b)+'</span>'}
 if(typeof value==='string'&&!['triangle','arrow','circle','ring','square','diamond','star'].includes(value))return esc(value);
 const v=typeof value==='string'?{shape:value}:value,shape=v.shape,rot=v.rot||0;
 let art='';
 if(shape==='triangle')art='<polygon points="32,8 57,54 7,54"/>';
 if(shape==='arrow')art='<path d="M8 23H34V9L57 32 34 55V41H8Z"/>';
 if(shape==='circle'||shape==='ring')art='<circle cx="32" cy="32" r="24"/>';
 if(shape==='square')art='<rect x="9" y="9" width="46" height="46" rx="2"/>';
 if(shape==='diamond')art='<polygon points="32,6 58,32 32,58 6,32"/>';
 if(shape==='star')art='<polygon points="'+Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,r=i%2?12:26;return[32+r*Math.cos(a),32+r*Math.sin(a)].join(',')}).join(' ')+'"/>';
 const notch=v.notch?'<path d="M32 3V14" stroke="#edf5f1" stroke-width="7" transform="rotate('+((v.notch-1)*90)+' 32 32)"/>':'';
 const dots=Array.from({length:v.dots||0},(_,i)=>'<circle cx="'+(v.innerRot!==undefined?27+i%3*5:22+i%3*10)+'" cy="'+(v.innerRot!==undefined?40+Math.floor(i/3)*5:27+Math.floor(i/3)*10)+'" r="2.1" fill="currentColor" stroke="none"/>').join('');
 const inner=v.innerRot!==undefined?'<path d="M25 29H39M34 24L39 29 34 34" stroke-width="2" transform="rotate('+v.innerRot+' 32 29)"/>':'';
 return '<svg viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><g transform="rotate('+rot+' 32 32)">'+art+notch+'</g>'+dots+inner+'</svg>';
}


export function describe(v){
 if(typeof v==='string')return v;
 const dirs=['up','up-right','right','down-right','down','down-left','left','up-left'];
 const direction=a=>dirs[((Math.round(a/45)%8)+8)%8];
 return v.shape+(v.shape==='arrow'||v.shape==='triangle'?', points '+direction((v.rot||0)+(v.shape==='arrow'?90:0)):'')+', '+(v.dots||0)+' dots'+(v.notch?', opening toward '+direction((v.rot||0)+(v.notch-1)*90):'')+(v.innerRot!==undefined?', inner arrow points '+direction(v.innerRot+90):'');
}

