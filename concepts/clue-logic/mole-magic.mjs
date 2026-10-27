import * as THREE from './vendor/three.module.js';
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p)};
// Original garden characters and armour; no actor likeness or franchise assets.
export function makeMoleMagic({root,mesh,box,cyl,tube,mat,ball,group}){
 const soil=mat('#65503a'),dark=mat('#172b28'),cream=mat('#e8e1ca'),gold=mat('#c6a566',.28,.65),skin=mat('#bd9979');
 const mound=group(0,0,1.35);mound.name='molehill';
 const hill=mesh(new THREE.SphereGeometry(1,48,24,0,Math.PI*2,0,Math.PI/2),soil,0,0,0,mound);hill.scale.set(.58,.28,.49);
 const opening=ball(.18,dark,0,.11,.4,mound);opening.scale.set(1,.72,.16);
 for(let i=0;i<12;i++){const a=i*2.4;const clod=ball(.045+(i%3)*.015,soil,Math.sin(a)*.49,.025,.1+Math.cos(a)*.39,mound);clod.scale.y=.5}
 const mole=group(0,.15,1.78);mole.name='mole';
 const fur=mat('#726b61'),paws=mat('#b49283');
 const body=ball(.19,fur,0,0,-.10,mole);body.scale.set(1,.88,1.55);
 const head=ball(.145,fur,0,.035,.15,mole);head.scale.set(1,.92,1.15);
 const snout=mesh(new THREE.ConeGeometry(.086,.20,24),paws,0,.015,.31,mole);snout.rotation.x=Math.PI/2;
 ball(.035,paws,0,.015,.42,mole);
 for(const side of [-1,1]){ball(.012,dark,side*.074,.097,.238,mole);const ear=ball(.034,fur,side*.13,.065,.10,mole);ear.scale.z=.4}
 const feet=[];
 for(const side of [-1,1])for(const front of [true,false]){
  const foot=new THREE.Group();foot.position.set(side*(front?.20:.13),-.065,front?.12:-.25);mole.add(foot);
  const pad=ball(front?.075:.045,paws,0,0,0,foot);pad.scale.set(1,.32,1.1);
  for(let j=0;j<4;j++){const claw=mesh(new THREE.ConeGeometry(.008,.045,8),cream,(j-1.5)*.022,-.005,.066,foot);claw.rotation.x=Math.PI/2}
  feet.push(foot);
 }
 tube([[0,-.015,-.31],[.07,-.02,-.40],[.13,-.025,-.44]],.018,paws,mole);

 const wizard=group(-3.5,0,1.2);wizard.name='wizard';
 const robe=mat('#3a555b',.85),trim=mat('#a8a081'),beardMat=mat('#c4c3b6');
 mesh(new THREE.CylinderGeometry(.19,.42,1.14,40),robe,0,.63,0,wizard);
 const belt=cyl(.26,.26,.055,gold,0,.91,0,wizard);
 for(const side of [-1,1]){const boot=ball(.12,dark,side*.18,.075,.12,wizard);boot.scale.set(.7,.6,1.6)}
 const wizardHead=new THREE.Group();wizardHead.position.y=1.36;wizard.add(wizardHead);
 const face=ball(.18,skin,0,0,.01,wizardHead);face.scale.set(.82,1.15,.86);ball(.045,skin,0,0,.17,wizardHead);
 for(const side of [-1,1])ball(.013,dark,side*.056,.045,.151,wizardHead);
 const beard=mesh(new THREE.ConeGeometry(.13,.36,24),beardMat,0,-.18,.12,wizardHead);beard.rotation.z=Math.PI;
 cyl(.31,.31,.035,robe,0,.21,0,wizardHead);
 const hat=mesh(new THREE.ConeGeometry(.24,.65,40),robe,0,.51,0,wizardHead);hat.rotation.z=-.12;
 const hatband=cyl(.224,.239,.045,gold,0,.22,0,wizardHead);
 const castArm=new THREE.Group();castArm.position.set(.20,1.07,0);wizard.add(castArm);
 tube([[0,0,0],[.19,-.15,.08],[.28,-.1,.30]],.095,robe,castArm);ball(.078,skin,.28,-.1,.31,castArm);
 const wand=mesh(new THREE.CylinderGeometry(.014,.024,.60,16),mat('#70593e'),.28,.16,.43,castArm);wand.rotation.x=.45;
 const tip=ball(.038,new THREE.MeshBasicMaterial({color:'#ead5a0',transparent:true,opacity:0}),.28,.43,.56,castArm);
 tube([[-.21,1.05,0],[-.31,.80,.06],[-.25,.68,.15]],.09,robe,wizard);ball(.072,skin,-.25,.66,.15,wizard);

 const knight=group(0,0,1.35);knight.name='armoured-knight';
 const armour=mat('#566766',.31,.75),edge=mat('#aaa991',.26,.7),under=mat('#283836'),cloak=mat('#465e54',.92);
 const cape=mesh(new THREE.CylinderGeometry(.48,.66,1.8,32,1,true,0,Math.PI),cloak,0,1.69,-.20,knight);cape.rotation.y=Math.PI;
 const chest=ball(.57,armour,0,2.0,0,knight);chest.scale.set(1,1.13,.58);
 const waist=mesh(new THREE.CylinderGeometry(.38,.43,.50,32),armour,0,1.43,0,knight);
 cyl(.435,.435,.095,gold,0,1.57,0,knight);
 for(const side of [-1,1]){
  const thigh=cyl(.21,.18,.68,under,side*.25,1.0,0,knight);
  const knee=ball(.20,edge,side*.25,.76,.08,knight);knee.scale.z=.65;
  const shin=cyl(.16,.13,.57,armour,side*.25,.43,0,knight);
  const boot=ball(.19,armour,side*.25,.12,.10,knight);boot.scale.set(.9,.7,1.7);
  const shoulder=ball(.28,armour,side*.62,2.29,0,knight);shoulder.scale.set(1.15,.72,1.05);
  cyl(.15,.14,.48,under,side*.66,1.93,0,knight);
  ball(.16,edge,side*.69,1.71,.015,knight);
  cyl(.16,.13,.44,armour,side*.70,1.47,.035,knight);
  const gauntlet=ball(.15,armour,side*.70,1.20,.08,knight);gauntlet.scale.set(.8,1.25,.9);
 }
 const helmet=ball(.28,armour,0,2.85,0,knight);helmet.scale.set(.9,1.18,.93);
 box(.35,.035,.035,dark,0,2.88,.248,knight);box(.035,.30,.04,edge,0,2.78,.262,knight);
 for(const x of [-.09,-.045,.045,.09])box(.012,.07,.02,dark,x,2.69,.234,knight);
 // Three peaks on the breastplate provide a visual link without copying an insignia.
 for(const [x,h] of [[-.14,.17],[0,.27],[.14,.17]]){const crest=mesh(new THREE.ConeGeometry(.105,h,3),gold,x,2.13,.345,knight);crest.scale.z=.13}
 const plaque=group(0,.37,2.2);plaque.name='paid-nameplate';box(1.9,.42,.09,gold,0,0,0,plaque);box(1.81,.34,.015,dark,0,0,.052,plaque);
 if(typeof document!=='undefined'){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=192;const ctx=canvas.getContext('2d');ctx.fillStyle='#172b28';ctx.fillRect(0,0,1024,192);ctx.fillStyle='#e8e1ca';ctx.font='bold 78px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('THE MOUNTAIN',512,102);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  mesh(new THREE.PlaneGeometry(1.78,.32),new THREE.MeshBasicMaterial({map:texture}),0,0,.063,plaque);
 }
 const smoke=Array.from({length:18},(_,i)=>{const m=new THREE.MeshStandardMaterial({color:i%2?'#d9d4be':'#d4dbc6',roughness:1,transparent:true,opacity:0,depthWrite:false});const b=ball(.30,m,0,0,0);b.castShadow=false;return b});
 const sparks=Array.from({length:30},()=>{const s=mesh(new THREE.OctahedronGeometry(.032),new THREE.MeshBasicMaterial({color:'#e3c586',transparent:true,opacity:0}),0,0,0,root);s.castShadow=false;return s});
 const result={garden:true,aim:[-.4,1.35,1.35],camera:[4.5,3.4,8.8],inspect:[1.8,2.7,6.7],inspectAim:[0,1.55,1.45],
 shot(t){const p=ease(7,14,t);return {p:[2.4+p*2.1,1.35+p*2.05,5.1+p*3.7],a:[-.4*p,.25+p*1.1,1.5]};},
 update(t,view){
  const inspect=view==='inspect',clock=inspect?24:t;
  // Two complete excursions: emerge, scurry, turn and retreat into the opening.
  const lap=clock<6?(clock-1)/5:(clock-6)/5;
  const moving=clock>=1&&clock<11;const phase=Math.max(0,Math.min(1,lap));
  const angle=phase*Math.PI*2,travel=Math.sin(phase*Math.PI);
  mole.visible=clock<11;mole.position.set(Math.sin(angle)*.64,.15+Math.sin(clock*18)*.014*(moving?1:0),1.79+travel*.74);
  mole.rotation.y=moving?Math.atan2(Math.cos(angle)*1.28,Math.cos(phase*Math.PI)*.74):0;
  const emerge=ease(0,.15,phase)*(1-ease(.84,1,phase));mole.scale.setScalar(moving?.55+emerge*.45:.55);
  feet.forEach((foot,i)=>{foot.rotation.x=moving?Math.sin(clock*18+i*Math.PI)*.36:0});
  const arrive=ease(8,12,clock);wizard.position.x=-3.5+arrive*1.85;wizard.position.y=clock>8&&clock<12?Math.abs(Math.sin(clock*8))*.035:0;wizard.rotation.y=.62;
  const cast=ease(12,14,clock)*(1-ease(17,19,clock));castArm.rotation.x=-cast*.62;castArm.rotation.z=-cast*.28+Math.sin(clock*8)*cast*.07;tip.material.opacity=cast*.8;
  const reveal=ease(15.5,18.5,clock);mound.visible=clock<16.5;mound.scale.setScalar(1-ease(15.4,16.5,clock));
  knight.visible=reveal>0;knight.scale.setScalar(Math.max(.001,reveal));knight.rotation.y=-.12;knight.position.y=0;
  wizardHead.rotation.z=-ease(19,21,clock)*.18;wizard.rotation.z=ease(19,21,clock)*.08;
  plaque.visible=inspect;plaque.rotation.y=.25;
  smoke.forEach((b,i)=>{const p=Math.max(0,(clock-14.8-i*.045)/3.6);b.visible=p>0&&p<1;const a=i*2.4;b.position.set(Math.sin(a)*(.25+p*1.15),.25+(i%5)*.32+p*.75,1.35+Math.cos(a)*(.2+p*.85));b.scale.setScalar(.4+Math.sin(Math.min(1,p)*Math.PI)*1.8);b.material.opacity=(1-Math.min(1,p))*.84});
  sparks.forEach((s,i)=>{const p=(clock-14.7-i*.02)/2.5;s.visible=p>0&&p<1;const a=i*2.4;s.position.set(Math.sin(a)*p*1.8,.3+Math.sin(Math.max(0,p)*Math.PI)*(1.5+(i%3)*.2),1.35+Math.cos(a)*p*1.2);s.material.opacity=Math.max(0,1-p);s.rotation.y=clock*2});
 }};
 return result;
}
