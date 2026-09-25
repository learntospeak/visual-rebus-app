import * as THREE from './vendor/three.module.js';
import {plateMotion,activeRescue} from './plates-motion.mjs';

// Original set, lighting, materials and choreography. No stock character models.
export function makeKitchen(canvas){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.max(1,Math.min(devicePixelRatio,1.7)));renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.22;renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#293229');scene.fog=new THREE.FogExp2('#283127',.025);
 const camera=new THREE.PerspectiveCamera(40,1,.1,70);
 const aim=new THREE.Vector3(0,2,0),target=new THREE.Vector3(),targetPos=new THREE.Vector3();
 const mat=(color,roughness=.65,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const wall=mat('#69725a'),stone=mat('#a79c82',.88),oak=mat('#554b36'),dark=mat('#151c19',.32),brass=mat('#c09d61',.25,.8),steel=mat('#a6afaa',.24,.94),enamel=mat('#253d34',.3,.3);
 function mesh(g,m,x,y,z,parent=scene){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const box=(w,h,d,m,x,y,z,parent)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,parent);
 const cyl=(r1,r2,h,m,x,y,z,parent)=>mesh(new THREE.CylinderGeometry(r1,r2,h,64),m,x,y,z,parent);
 function torus(r,t,m,x,y,z,parent){const o=mesh(new THREE.TorusGeometry(r,t,12,64),m,x,y,z,parent);o.rotation.x=Math.PI/2;return o;}
 function tube(points,r,m,parent=scene){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,28,r,8,false),m,0,0,0,parent);}
 // Fine, directional scratches break up the broad stainless-steel reflections.
 const texCanvas=document.createElement('canvas');texCanvas.width=512;texCanvas.height=128;const ctx=texCanvas.getContext('2d');ctx.fillStyle='#a3a6a1';ctx.fillRect(0,0,512,128);
 let seed=1827;function random(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
 for(let i=0;i<850;i++){ctx.strokeStyle=`rgba(${random()>.5?'255,255,255':'0,0,0'},${random()*.06})`;const y=random()*128;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();}
 const metalMap=new THREE.CanvasTexture(texCanvas);steel.map=metalMap;
 // Enclosed environment provides actual reflections rather than painted highlights.
 const environment=new THREE.Scene();environment.background=new THREE.Color('#797a67');
 const eb=(w,h,d,c,x,y,z)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:c}));o.position.set(x,y,z);environment.add(o);};
 eb(10,8,.1,'#565e4d',0,2,-5);eb(.1,6,9,'#303a32',5,2,0);eb(.1,4,4,'#fff0d1',-4,3,0);eb(3,1,.1,'#d7b575',1,5,3);
 const pmrem=new THREE.PMREMGenerator(renderer);const env=pmrem.fromScene(environment,.04);scene.environment=env.texture;scene.environmentIntensity=.62;pmrem.dispose();
 scene.add(new THREE.HemisphereLight('#e7d6ae','#23302a',1.15));
 const sun=new THREE.DirectionalLight('#ffe2ad',3.5);sun.position.set(-4,6,3);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-7;sun.shadow.camera.right=7;sun.shadow.camera.top=6;sun.shadow.camera.bottom=-5;sun.shadow.bias=-.0005;sun.shadow.normalBias=.03;scene.add(sun);
 const fill=new THREE.PointLight('#b8d0c1',9,12,2);fill.position.set(3,4,3);scene.add(fill);
 const practical=new THREE.PointLight('#ffcf86',8,7,2);practical.position.set(.4,4.2,-.3);scene.add(practical);
 box(15,.16,13,mat('#393c31'),0,-.2,1);
 box(15,7,.2,wall,0,3,-1.8);box(.2,7,10,wall,-5,3,2);
 // Individually modelled backsplash tiles; irregular glaze catches the light.
 for(let row=0;row<5;row++)for(let col=0;col<18;col++)box(.455,.25,.024,mat(new THREE.Color('#808774').multiplyScalar(.9+random()*.14),.35),-4.45+col*.48,1.86+row*.276,-1.677);
 box(9.5,1.55,1.55,oak,-.1,.775,-.35);box(9.7,.16,1.85,stone,-.1,1.61,-.27);
 for(let n=0;n<9;n++){box(.96,1.25,.055,mat(n%2?'#384c3c':'#3e503d'),-4.2+n*1.03,.8,.455);box(.72,.02,.04,brass,-4.2+n*1.03,1.3,.495);}
 box(9.6,.08,.04,dark,-.1,.13,.51);
 // Sink and curved faucet sit to the left of the stove.
 box(1.7,.025,1.05,steel,-2.75,1.71,-.22);box(1.45,.027,.82,dark,-2.75,1.728,-.22);
 tube([[-2.75,1.72,-.76],[-2.75,2.45,-.76],[-2.75,2.52,-.35],[-2.75,2.23,-.28]],.032,steel);
 cyl(.05,.05,.23,steel,-3.27,1.84,-.73);box(.23,.025,.04,steel,-3.18,1.95,-.73);
 // Glowing tall window, with architectural mullions and a sill.
 const windowMat=new THREE.MeshBasicMaterial({color:'#e6d5ac'});
 box(2.6,2.55,.065,dark,-2.45,3.55,-1.58);box(2.43,2.38,.075,windowMat,-2.45,3.55,-1.53);
 for(const x of [-3.6,-2.45,-1.3])box(.055,2.5,.1,oak,x,3.55,-1.46);
 box(2.5,.05,.1,oak,-2.45,3.7,-1.46);box(2.75,.08,.31,stone,-2.45,2.24,-1.36);
 // Soft tree silhouettes beyond the window.
 // Frosted glazing keeps the backdrop restrained.
 // Doorway: camera distraction is a real part of the same set.
 box(1.65,3.9,.18,mat('#2b382d'),3.6,2.17,-1.56);box(1.45,3.66,.055,mat('#776b4a'),3.6,2.17,-1.435);
 for(const x of [3.22,3.96])for(const y of [1.15,2.15,3.15])box(.58,.8,.022,mat('#695f42'),x,y,-1.398);
 cyl(.057,.057,.14,brass,4.1,2,-1.3).rotation.x=Math.PI/2;box(.18,.04,.07,brass,4.02,2,-1.21);
 // A kitchen clock with independently moving hands.
 const clock=new THREE.Group();clock.position.set(.15,3.75,-1.47);scene.add(clock);
 const face=cyl(.39,.39,.055,mat('#dbd4ba'),0,0,0,clock);face.rotation.x=Math.PI/2;
 const rim=mesh(new THREE.TorusGeometry(.39,.026,12,64),brass,0,0,.04,clock);
 for(let i=0;i<12;i++){const a=i*Math.PI/6;const mark=box(.013,.045,.006,dark,Math.sin(a)*.31,Math.cos(a)*.31,.038,clock);mark.rotation.z=-a;}
 const hour=box(.025,.16,.008,dark,.06,.05,.047,clock);hour.rotation.z=-.95;
 const minute=box(.018,.25,.008,dark,-.035,.105,.05,clock);minute.rotation.z=.3;
 const secondPivot=new THREE.Group();clock.add(secondPivot);const second=box(.007,.28,.01,brass,0,.10,.058,secondPivot);
 // Pendant shade with a warm pool of light.
 cyl(.013,.013,1.05,dark,.5,5.18,-.3);cyl(.14,.42,.25,enamel,.5,4.55,-.3);cyl(.37,.37,.018,new THREE.MeshBasicMaterial({color:'#ffe0a1'}),.5,4.42,-.3);
 // Set dressing is subordinate to the pot: one board, cloth, glass and herbs.
 const board=box(.9,.04,.62,mat('#977443'),1.9,1.73,-.2);board.rotation.y=.15;
 const towel=box(.42,.015,.5,mat('#aaa48d'),1.55,1.775,-.05);towel.rotation.y=.2;
 cyl(.12,.105,.30,new THREE.MeshPhysicalMaterial({color:'#c9d1b9',roughness:.08,metalness:0,transparent:true,opacity:.28,side:THREE.DoubleSide}),2.42,1.89,-.75);
 cyl(.20,.14,.32,mat('#9b8160'),-3.7,1.9,-.83);
 for(let i=0;i<14;i++){const x=-3.7+(random()-.5)*.3,z=-.83+(random()-.5)*.23,h=.3+random()*.45;tube([[x,2.04,z],[x+.03,2.04+h,z]],.009,mat('#586546'));for(let j=0;j<3;j++){const leaf=mesh(new THREE.SphereGeometry(.07,10,6),mat('#65744b'),x+(j%2?-.07:.07),2.1+h*j/3,z);leaf.scale.set(1.7,.22,.7);leaf.rotation.z=j%2?.6:-.6;}}
 // Gas hob and cookware are separate, physically shaded geometry.
 box(1.75,.07,1.3,mat('#101815',.22,.3),0,1.735,-.12);
 for(const x of [-.62,.62])for(const z of [-.58,.36]){torus(.19,.025,steel,x,1.79,z);box(.48,.04,.05,dark,x,1.81,z);box(.05,.04,.48,dark,x,1.81,z);}
 const burner=torus(.40,.032,steel,0,1.82,-.08);
 const fire=new THREE.Group();scene.add(fire);const flameMat=new THREE.MeshBasicMaterial({color:'#81b8ca',transparent:true,opacity:.8});
 for(let i=0;i<28;i++){const a=i*Math.PI*2/28;const f=mesh(new THREE.ConeGeometry(.018,.115,6),flameMat,Math.cos(a)*.36,1.86,-.08+Math.sin(a)*.36,fire);f.userData.phase=i;}
 const potGroup=new THREE.Group();potGroup.position.set(0,1.94,-.08);scene.add(potGroup);
 const body=mesh(new THREE.CylinderGeometry(.56,.49,.58,96,1,true),steel,0,.29,0,potGroup);body.material.side=THREE.DoubleSide;
 cyl(.49,.49,.035,steel,0,.01,0,potGroup);torus(.557,.022,steel,0,.58,0,potGroup);
 for(const side of [-1,1])tube([[side*.53,.42,-.19],[side*.80,.42,-.18],[side*.85,.42,.14],[side*.53,.42,.18]],.038,steel,potGroup);
 const waterUniforms={time:{value:0},activity:{value:0}};
 const waterMat=new THREE.MeshStandardMaterial({color:'#8e9b88',roughness:.15,metalness:.65,transparent:true,opacity:.91});
 waterMat.onBeforeCompile=shader=>{shader.uniforms.clockTime=waterUniforms.time;shader.uniforms.activity=waterUniforms.activity;shader.vertexShader='uniform float clockTime;uniform float activity;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.z += activity * 0.009 * (sin(position.x*38.0+clockTime*6.0)+cos(position.y*31.0-clockTime*5.0));');};
 const water=mesh(new THREE.CircleGeometry(.535,96),waterMat,0,.49,0,potGroup);water.rotation.x=-Math.PI/2;
 const bubbles=[];for(let i=0;i<30;i++){const a=random()*Math.PI*2,r=Math.sqrt(random())*.47;const b=mesh(new THREE.SphereGeometry(.02+random()*.022,10,7),new THREE.MeshStandardMaterial({color:'#c2cbbc',roughness:.13,metalness:.5,transparent:true,opacity:.6}),Math.cos(a)*r,.48,Math.sin(a)*r,potGroup);b.userData.phase=random();b.userData.speed=.65+random();bubbles.push(b);}
 const sc=document.createElement('canvas');sc.width=sc.height=128;const sx=sc.getContext('2d'),g=sx.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(222,225,209,.7)');g.addColorStop(.4,'rgba(211,218,204,.28)');g.addColorStop(1,'rgba(200,212,194,0)');sx.fillStyle=g;sx.fillRect(0,0,128,128);const smokeMap=new THREE.CanvasTexture(sc);
 const steam=[];for(let i=0;i<42;i++){const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:smokeMap,color:'#e4e3d2',transparent:true,depthWrite:false,opacity:0}));sprite.userData={phase:i/42,drift:random()-.5};scene.add(sprite);steam.push(sprite);}
 // Small kitchen bell by the door: its vibration motivates the camera move.
 const bell=cyl(.09,.19,.14,brass,3.35,1.82,.1);cyl(.21,.21,.025,dark,3.35,1.74,.1);cyl(.025,.025,.045,brass,3.35,1.91,.1);

 // The adjoining service counter retains the kitchen's architecture and materials.
 potGroup.visible=false;fire.visible=false;for(const sprite of steam)sprite.visible=false;
 const porcelain=mat('#e7e3d5',.19,.04),rimBlue=mat('#243f43',.28,.05);
 box(4.5,.14,1.32,stone,0,1.46,2.1);box(4.3,1.4,1.14,enamel,0,.7,2.1);
 for(const x of [-1.5,0,1.5]){box(1.3,1.13,.03,oak,x,.78,2.68);box(.6,.025,.04,brass,x,1.2,2.73);}
 const plates=[];const plateX=[-1.3,0,1.3];
 for(let i=0;i<3;i++){
  const x=plateX[i],height=[2.67,2.9,2.72][i];
  cyl(.17,.22,.055,brass,x,1.565,2.05);cyl(.012,.025,height-1.615,steel,x,(height+1.565)/2,2.05);
  const tilt=new THREE.Group();tilt.position.set(x,height,2.05);scene.add(tilt);
  const spin=new THREE.Group();tilt.add(spin);
  const profile=[[0,.015],[.16,.015],[.32,.022],[.42,.065],[.54,.09],[.56,.075],[.54,.054],[.41,.035],[.31,-.007],[.13,-.028],[0,-.018]].map(([r,y])=>new THREE.Vector2(r,y));
  mesh(new THREE.LatheGeometry(profile,80),porcelain,0,0,0,spin);
  torus(.522,.008,brass,0,.085,0,spin);torus(.46,.013,rimBlue,0,.071,0,spin);
  // Three small glaze marks make actual rotation legible without text or arrows.
  for(let j=0;j<3;j++){const a=j*.24;const dot=mesh(new THREE.SphereGeometry(.027,12,8),rimBlue,Math.cos(a)*.495,.087,Math.sin(a)*.495,spin);dot.scale.y=.18;}
  plates.push({tilt,spin});
 }
 // A first-person gloved hand steadies and turns each stem; no character cut-outs.
 const hand=new THREE.Group();scene.add(hand);const glove=mat('#d4cfbd',.72),sleeve=mat('#283f42',.86);
 // A side-on precision grip: four distinct curled fingers oppose the thumb.
 // The stem sits at local (-.105, 0, -.07), inside the finger pads.
 const palm=mesh(new THREE.SphereGeometry(1,32,24),glove,.005,-.015,.035,hand);palm.scale.set(.075,.115,.055);
 const fingers=[];
 for(let i=0;i<4;i++){
  const digit=new THREE.Group();digit.position.set(-.025,.075-i*.052,.025);hand.add(digit);
  const length=[1,1.07,1,.82][i];
  const points=[[.012,0,0],[-.045*length,.005,-.012],[-.095*length,.003,-.055],[-.09*length,-.005,-.105],[-.054*length,-.011,-.119]];
  tube(points,.021-i*.001,glove,digit);
  const end=points[points.length-1];mesh(new THREE.SphereGeometry(.021-i*.001,16,12),glove,...end,digit);
  fingers.push(digit);
 }
 tube([[.055,-.055,.025],[.075,.008,-.008],[.04,.07,-.06],[-.015,.075,-.095]],.028,glove,hand);
 const thumbPad=mesh(new THREE.SphereGeometry(.029,20,16),glove,-.015,.075,-.095,hand);thumbPad.scale.set(1,1,.78);
 const wrist=mesh(new THREE.SphereGeometry(1,24,16),glove,.018,-.145,.07,hand);wrist.scale.set(.057,.095,.06);
 const armStart=new THREE.Vector3(.018,-.205,.09),armEnd=new THREE.Vector3(.32,-2.6,6);const armMid=armStart.clone().add(armEnd).multiplyScalar(.5);const arm=cyl(.073,.21,armStart.distanceTo(armEnd),sleeve,armMid.x,armMid.y,armMid.z,hand);arm.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),armStart.clone().sub(armEnd).normalize());
 const cuff=cyl(.078,.082,.105,sleeve,.022,-.202,.092,hand);cuff.quaternion.copy(arm.quaternion);
 // A brass service bell and folded linen tie the set to the previous room.
 const linen=box(.7,.025,.5,mat('#bcb5a0'),1.73,1.56,2.35);linen.rotation.y=.12;
 function updatePlates(t,view){
  plates.forEach(({tilt,spin},i)=>{const m=plateMotion(t,i);spin.rotation.y=m.spin;tilt.rotation.x=Math.sin(t*(5.2+i)+i)*m.wobble;tilt.rotation.z=Math.cos(t*(5.2+i)+i)*m.wobble;});
  const event=activeRescue(t);hand.visible=!!event;
  if(event){const phase=(t-event.time)/.8;const contact=1-Math.pow(Math.abs(phase),3);const reach=contact*contact*(3-2*contact);hand.position.set(plateX[event.index]+.105+(1-reach)*.24,1.06+reach*1.02,3.5-Math.pow(reach,3)*1.38);hand.rotation.y=Math.sin(phase*Math.PI)*.09;hand.rotation.z=(1-reach)*-.18;fingers.forEach((digit,i)=>{digit.rotation.y=(1-reach)*-.55;digit.rotation.z=(1-reach)*(i-1.5)*.035;});}
 }

 let physical=0,activity=0,started=false,solved=false,cameraReady=false,lastMode='auto';
 const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
 const lerp=(a,b,t)=>a+(b-a)*t;
 const shots=[{t:0,p:[3.5,3.45,6.5],a:[-.5,2.35,-.6]},{t:3,p:[2.7,3.45,7.4],a:[0,2.32,2.05]},{t:6,p:[-.8,3.5,6.5],a:[-.75,2.5,2.05]},{t:10,p:[.3,3.65,6.7],a:[0,2.6,2.05]},{t:14.5,p:[1.35,3.55,6.8],a:[.7,2.5,2.05]},{t:18,p:[1.5,3.8,7.9],a:[0,2.4,2.05]},{t:26,p:[1.5,3.8,7.9],a:[0,2.4,2.05]}];
 function shotAt(time){let n=shots.findIndex(s=>s.t>=time);if(n<=0)return shots[n<0?shots.length-1:0];const a=shots[n-1],b=shots[n],v=smooth((time-a.t)/(b.t-a.t));return {p:a.p.map((x,i)=>lerp(x,b.p[i],v)),a:a.a.map((x,i)=>lerp(x,b.a[i],v))};}
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<1.1?47:40;camera.updateProjectionMatrix();}
 const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
 function draw({time=0,delta=0,view='auto',running=false,won=false,instant=false}={}){
  solved=won;started=running||time>0;physical+=Math.min(delta,.06);
  const away=view==='away'||view==='inspect'||view==='auto'&&time>9&&time<18.2;
  const desired=away&&!solved?1:0;activity+=(desired-activity)*(1-Math.exp(-Math.max(delta,instant?.5:0)*(desired?1.7:1.15)));
  const shot=shotAt(time);let p=shot.p,a=shot.a;
  if(view==='away'){p=[1.6,3.7,6.2];a=[1.0,2.55,2.05];}
  if(view==='watch'){p=[-1.7,3.7,6.2];a=[-1.0,2.55,2.05];}
  if(view==='inspect'){p=[.1,5.4,5.8];a=[0,2.3,2.05];}
  if(won){p=[3.5,3.65,6.4];a=[.4,2.1,-.45];}
  targetPos.fromArray(p);target.fromArray(a);const camMix=!cameraReady||instant?1:1-Math.exp(-delta*2.2);camera.position.lerp(targetPos,camMix);aim.lerp(target,camMix);camera.lookAt(aim);cameraReady=true;
  waterUniforms.time.value=physical;waterUniforms.activity.value=activity;
  bubbles.forEach(b=>{const phase=(physical*b.userData.speed+b.userData.phase)%1;b.position.y=.475+phase*.065*activity;b.scale.setScalar(activity*(.25+Math.sin(phase*Math.PI)*.8));});
  steam.forEach(s=>{const age=(physical*.16+s.userData.phase)%1;s.position.set(Math.sin(age*4+s.userData.phase*9)*.10+s.userData.drift*.35,2.49+age*1.25,-.08+Math.cos(age*3+s.userData.phase*7)*.12);const size=.15+age*.7;s.scale.set(size*.7,size,1);s.material.opacity=activity*.19*Math.sin(age*Math.PI);s.material.rotation=s.userData.phase+age*.4;});
  fire.visible=false;fire.children.forEach((f,i)=>f.scale.y=.88+Math.sin(physical*12+i*3)*.13);
  secondPivot.rotation.z=-physical*Math.PI/30;
  bell.rotation.z=time>7.7&&time<9?Math.sin(physical*38)*.05:0;
  updatePlates(view==='auto'?time:physical%26,view);renderer.render(scene,camera);lastMode=view;
 }
 draw({instant:true});
 return {draw,dispose(){
  ro.disconnect();
  const geometries=new Set(),materials=new Set(),textures=new Set();
  for(const root of [scene,environment])root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);});
  for(const m of materials){for(const value of Object.values(m))if(value?.isTexture)textures.add(value);m.dispose();}
  for(const texture of textures)texture.dispose();for(const geometry of geometries)geometry.dispose();
  renderer.dispose();renderer.forceContextLoss();env.dispose();
 }};
}





