// Four composed shots. No answer text or game state enters the renderer.
export function restaurantFrame(time,view='auto') {
 const t=Math.max(0,Math.min(26,Number.isFinite(time)?time:0));
 if(view==='inspect'||view==='away')return {shot:2,next:2,mix:0};
 if(view==='watch')return {shot:3,next:3,mix:0};
 const shot=t<5?0:t<11?1:t<18?2:3;
 const end=[5,11,18,26][shot];
 return {shot,next:(shot+1)%4,mix:Math.max(0,Math.min(1,(t-(end-.35))/.35))};
}
