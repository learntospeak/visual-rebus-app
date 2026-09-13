// Pure connectivity rules. The rendered domino run follows these connections;
// no solution configuration is hardcoded into the win check.
export const sockets = { A:[1,1], B:[2,2], C:[3,3] };
export const vectors = [[0,-1],[1,0],[0,1],[-1,0]];
export const fixed = {
  '0,1':{type:'straight',rotation:0},
  '2,1':{type:'corner',rotation:2},
  '2,3':{type:'corner',rotation:0},
  '3,4':{type:'corner',rotation:0},
};
export function ports(tile) {
  return (tile.type==='corner'?[0,1]:[1,3]).map(p=>(p+tile.rotation)%4);
}
export function tileAt(layout,x,y) {
  const key=Object.keys(sockets).find(k=>sockets[k][0]===x&&sockets[k][1]===y);
  return key?layout[key]:fixed[`${x},${y}`];
}
export function trace(layout) {
  let x=0,y=1,entry=3;const steps=[],visited=new Set();
  for(let n=0;n<30;n++) {
    if(x===4&&y===4) return {won:entry===3,steps,reason:entry===3?'bell':'direction',at:[x,y]};
    const key=`${x},${y}`;
    if(visited.has(key))return {won:false,steps,reason:'loop',at:[x,y]};
    visited.add(key);
    const tile=tileAt(layout,x,y);
    if(!tile)return {won:false,steps,reason:'gap',at:[x,y]};
    if(x===2&&y===2&&tile.type!=='bridge')return {won:false,steps,reason:'water',at:[x,y]};
    const p=ports(tile);
    if(!p.includes(entry))return {won:false,steps,reason:'direction',at:[x,y]};
    const exit=p.find(d=>d!==entry);
    steps.push({x,y,entry,exit,type:tile.type});
    x+=vectors[exit][0];y+=vectors[exit][1];entry=(exit+2)%4;
  }
  return {won:false,steps,reason:'loop',at:[x,y]};
}
export function acceptPhrase(value) {
  const text=value.toLowerCase().replace(/[^a-z ]/g,' ').replace(/\s+/g,' ').trim();
  return ['domino effect','the domino effect','a domino effect'].includes(text);
}
