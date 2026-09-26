import * as THREE from './vendor/three.module.js';
const ease=(a,b,t)=>{const v=Math.max(0,Math.min(1,(t-a)/(b-a)));return v*v*(3-2*v)};
export function populateStory({scene,mesh,box,cyl,tube,mat},kind){
 const root=new THREE.Group();scene.add(root);
 const cream=mat('#e7e3d5',.38),teal=mat('#294b45'),wood=mat('#856746'),soil=mat('#65503a'),gold=mat('#bd9953',.25,.72),dark=mat('#182c26'),leaf=mat('#65754e');
 const ball=(r,m,x,y,z,parent=root)=>mesh(new THREE.SphereGeometry(r,32,20),m,x,y,z,parent);
 const group=(x=0,y=0,z=0)=>{const g=new THREE.Group();g.position.set(x,y,z);root.add(g);return g};
 function shovel(parent){const g=new THREE.Group();parent.add(g);cyl(.035,.035,1.5,wood,0,.9,0,g);const blade=ball(.23,mat('#929b90',.28,.7),0,.15,0,g);blade.scale.set(.8,1.3,.12);const grip=mesh(new THREE.TorusGeometry(.13,.028,12,32),wood,0,1.72,0,g);return g}
 function plant(x,z){cyl(.2,.15,.35,mat('#997057'),x,.18,z,root);for(let i=0;i<7;i++){const a=i*2.4;const l=ball(.13,leaf,x+Math.sin(a)*.13,.44+i*.03,z+Math.cos(a)*.13);l.scale.set(.5,1.5,.8);l.rotation.z=Math.sin(a)*.6}}
 function garden(){box(9,.13,7,mat('#8b9070'),0,-.08,1,root);for(let i=-4;i<5;i++){box(.09,1.55,.12,wood,i, .7,-1.35,root)}box(9,.1,.12,wood,0,.35,-1.35,root);box(9,.1,.12,wood,0,1.1,-1.35,root);for(const x of [-2.6,2.6])for(const z of [0,1.3,2.6])plant(x,z);for(let i=0;i<8;i++)box(.65,.025,.55,cream,-2+i*.57,.01,3.5,root)}
 function cook(x,y,z){
  const g=group(x,y,z),coat=mat('#d8d6c8'),skin=mat('#b38c6c');
  const body=ball(.4,teal,0,.88,0,g);body.scale.set(.88,1.45,.65);
  const apron=ball(.31,coat,0,.8,.18,g);apron.scale.set(.9,1.65,.38);
  for(const side of [-1,1]){const boot=ball(.16,dark,side*.17,.14,.05,g);boot.scale.set(.8,1.05,1.7);cyl(.10,.12,.44,teal,side*.17,.36,0,g)}
  const head=group();root.remove(head);g.add(head);head.position.y=1.62;
  const face=ball(.24,skin,0,0,0,head);face.scale.set(.85,1.18,.9);ball(.06,skin,0,-.015,.215,head);
  for(const side of [-1,1]){ball(.015,dark,side*.085,.04,.205,head);tube([[side*.045,.085,.215],[side*.09,.10,.205],[side*.13,.07,.185]],.014,wood,head)}
  cyl(.23,.23,.16,coat,0,.27,0,head);for(let i=0;i<5;i++){const a=i*1.25;ball(.14,coat,Math.sin(a)*.12,.4,Math.cos(a)*.09,head)}
  const arms=[];for(const side of [-1,1]){const arm=new THREE.Group();g.add(arm);arm.position.set(side*.3,1.2,0);tube([[0,0,0],[side*.12,-.23,.06],[side*.07,-.43,.24]],.095,teal,arm);ball(.10,skin,side*.07,-.45,.24,arm);arms.push(arm)}
  return {g,head,arms};
 }
 if(kind==='mountain'){
  garden();const mound=group(0,0,1.3);const hill=mesh(new THREE.SphereGeometry(1,48,24,0,Math.PI*2,0,Math.PI/2),soil,0,0,0,mound);
  const peak=mesh(new THREE.ConeGeometry(.74,1.4,9),mat('#a09b88'),0,1,0,mound);const snow=mesh(new THREE.ConeGeometry(.29,.57,9),cream,0,1.43,0,mound);
  const mole=group(0,.22,1.57);const nose=ball(.12,mat('#9a7c70'),0,.05,.11,mole);nose.scale.set(1,.6,1.3);const fur=ball(.19,mat('#655d52'),0,0,0,mole);for(const s of [-1,1])ball(.022,dark,s*.07,.09,.15,mole);
  // Establish the tiny molehill first, then exaggerate that same mound. No digging.
  return {garden:true,aim:[0,1.2,1.2],camera:[4.8,3.6,8],inspect:[1.5,1.1,3.6],inspectAim:[0,.25,1.4],update(t,view){
   const h=view==='inspect'?0:ease(7,21,t);
   hill.scale.set(.42+h*1.85,.17+h*2.1,.42+h*1.85);
   const rock=ease(.25,.85,h),cap=ease(.65,1,h);
   peak.visible=rock>0;snow.visible=cap>0;
   peak.scale.setScalar(Math.max(.001,rock*1.6));snow.scale.setScalar(Math.max(.001,cap*1.6));
   peak.position.y=h*2.2;snow.position.y=h*3.25;
   mole.visible=h<.12;mole.position.y=.15+Math.sin(t*2)*.025;
  }};
 }
 if(kind==='rug'){
  box(5,.10,3.7,wood,0,.05,1.5,root);for(let i=0;i<12;i++)box(.015,.005,3.7,dark,-2.5+i*.44,.104,1.5,root);
  const rugGeo=new THREE.PlaneGeometry(2.6,2.2,40,40);rugGeo.rotateX(-Math.PI/2);const rug=mesh(rugGeo,mat('#53716a',.95),.65,.13,1.6,root);const original=Float32Array.from(rugGeo.attributes.position.array);
  const bits=Array.from({length:22},(_,i)=>{const b=box(.06+(i%3)*.02,.035,.06,i%2?cream:soil,-1.7+(i%4)*.12,.15,.85+(i%7)*.2,root);return b});
  const broom=group(-1.8,.16,1.6);box(.13,.13,.65,wood,0,.1,0,broom);cyl(.035,.035,1.8,wood,.1,.96,0,broom);for(let i=0;i<18;i++)box(.10,.15,.023,mat('#b0a178'),-.02,.05,-.31+i*.036,broom);
  const stripe=box(.035,.004,2.12,gold,1.7,.14,1.6,root);
  return {aim:[0,.4,1.5],camera:[3.5,4,6.5],inspect:[-.4,1.15,3.3],inspectAim:[.3,.25,1.6],update(t,view){const p=ease(3,18,t),cycle=(t-3)%4/4;broom.visible=t>2&&t<20;broom.position.x=-1.7+Math.max(0,Math.sin(cycle*Math.PI))*1.65;broom.rotation.z=-.18+Math.sin(t*2)*.12;bits.forEach((b,i)=>{const v=ease(3+i*.24,10+i*.28,t);b.position.x=(-1.7+(i%4)*.12)*(1-v)+(.4+(i%3)*.09)*v;b.visible=v<.94||view==='inspect'});const pos=rugGeo.attributes.position;for(let i=0;i<pos.count;i++){const x=original[i*3],z=original[i*3+2];const bump=Math.exp(-((x+.45)**2+z*z)*5)*p*.42;const lift=Math.exp(-((x+1.3)**2)*18)*(view==='inspect'?.7:t<19?Math.sin(Math.PI*p)*.45:0);pos.setY(i,bump+lift)}pos.needsUpdate=true;rugGeo.computeVertexNormals();}};
 }
 if(kind==='drain'){
  const counter=mat('#a79c82');for(const x of [-1.5,1.5])box(.72,.18,2.3,counter,x,1.25,1.5,root);for(const z of [.45,2.55])box(2.35,.18,.25,counter,0,1.25,z,root);box(3.5,.75,2.1,teal,0,.375,1.5,root);
  const bowl=mesh(new THREE.SphereGeometry(1,64,32,0,Math.PI*2,Math.PI/2,Math.PI/2),mat('#8d9e96',.23,.78),0,1.39,1.5,root);bowl.scale.set(1.12,.50,.85);bowl.material.side=THREE.DoubleSide;const rim=mesh(new THREE.TorusGeometry(1,.04,16,64),gold,0,1.39,1.5,root);rim.rotation.x=Math.PI/2;rim.scale.y=.78;
  cyl(.15,.15,.025,dark,0,.9,1.5,root);tube([[.75,1.35,.85],[.75,2.2,.85],[.4,2.3,1.1],[.3,2.04,1.2]],.05,mat('#a6afaa',.25,.9),root);
  const purse=group(-.9,2.25,1.25);const bag=ball(.3,mat('#76593e'),0,0,0,purse);bag.scale.set(1,1.15,.7);const mouth=cyl(.18,.20,.06,dark,0,.3,0,purse);
  const coins=Array.from({length:15},(_,i)=>{const g=group();const coin=cyl(.095,.095,.023,gold,0,0,0,g);const mark=box(.012,.012,.11,cream,0,.019,0,g);return g});
  return {aim:[0,1.45,1.5],camera:[3.2,4.1,6],inspect:[-.8,3.3,3],inspectAim:[0,1.05,1.5],update(t,view){purse.rotation.z=-ease(2,5,t)*1.9;coins.forEach((c,i)=>{const start=4+i*.75;const p=(t-start)/3.7;c.visible=p>=0&&p<1;if(view==='inspect'){c.visible=i<4;c.position.set(Math.cos(i*1.8)*.4,1.15,1.5+Math.sin(i*1.8)*.3);return}if(p<.3){c.position.set(-.85+p*2.4,2.1-p*2.6,1.3);c.rotation.z=p*18}else{const k=(p-.3)/.7,a=k*12+i;c.position.set(Math.cos(a)*(.65*(1-k)),1.2-.37*k,1.5+Math.sin(a)*(.55*(1-k)));c.rotation.z=k*8}})}};
 }
 if(kind==='hole'){
  garden();const hole=cyl(.75,.72,.09,dark,0,.01,1.4,root);const edge=mesh(new THREE.TorusGeometry(.76,.09,16,64),soil,0,.03,1.4,root);edge.rotation.x=Math.PI/2;
  const person=cook(0,.02,1.4);const spade=shovel(person.g);spade.position.set(.52,.1,.3);spade.rotation.z=-.35;
  const earth=Array.from({length:18},(_,i)=>{const b=ball(.11,soil,Math.sin(i*2.4)*1.1,.04,1.4+Math.cos(i*2.4)*.9);b.scale.y=.3;return b});
  return {garden:true,aim:[0,.8,1.4],camera:[3.8,3.6,6.5],inspect:[1.8,4.2,3.8],inspectAim:[0,.1,1.4],update(t,view){const p=ease(3,22,t);person.g.position.y=-p*1.95;person.head.rotation.x=.18;person.arms[1].rotation.x=Math.sin(t*3)*.4;spade.rotation.x=Math.sin(t*3)*.6;earth.forEach((b,i)=>{b.scale.y=.3+p*(.8+(i%3)*.2)});if(view==='inspect'){person.g.position.y=-1.65;spade.rotation.x=-.5}}};
 }
 // A small spill, followed by a visibly disproportionate reaction.
 box(3.8,.13,2,wood,0,1.0,1.8,root);for(const x of [-1.6,1.6])for(const z of [1,2.6])box(.13,1,.13,teal,x,.48,z,root);
 const bottle=group(-.55,1.08,1.6);cyl(.15,.15,.55,cream,0,.29,0,bottle);cyl(.065,.13,.18,cream,0,.65,0,bottle);cyl(.072,.072,.04,gold,0,.75,0,bottle);
 const puddle=ball(1,cream,.2,1.085,1.8);const stream=tube([[-.15,1.4,1.65],[.1,1.2,1.7],[.25,1.1,1.8]],.035,cream,root);
 const person=cook(0,0,.35);person.g.rotation.y=0;person.g.scale.setScalar(1.05);
 const tears=Array.from({length:10},()=>ball(.027,mat('#b5d6d5',.12,.15),0,0,0));
 const spare=group(1.1,1.08,1.45);cyl(.15,.15,.55,cream,0,.29,0,spare);cyl(.065,.13,.18,cream,0,.65,0,spare);cyl(.072,.072,.04,gold,0,.75,0,spare);
 return {aim:[0,1.25,1.2],camera:[3.2,3.1,6.5],inspect:[1.5,3,3.5],inspectAim:[0,1.1,1.65],update(t,view){const spill=ease(3,6,t),cry=ease(7,9,t);bottle.rotation.z=-spill*1.5;puddle.scale.set(.02+spill*.85,.012,.02+spill*.55);stream.visible=t>4&&t<7;person.head.rotation.x=.1+cry*.52+Math.sin(t*4)*cry*.035;person.arms.forEach((a,i)=>{a.rotation.x=-cry*1.5;a.rotation.z=(i?1:-1)*cry*.6});person.g.position.y=-Math.abs(Math.sin(t*3))*cry*.025;tears.forEach((d,i)=>{const p=(t*1.1+i/10)%1;d.visible=cry>.3;d.position.set((i%2?-.085:.085),1.65-p*.53,.7+p*.6);d.scale.set(.7,1.5,.7)});}};
}
