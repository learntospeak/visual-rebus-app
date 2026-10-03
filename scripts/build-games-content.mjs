import fs from 'node:fs';
import {rng,shuffle} from '../public/games/engine.mjs';
const out={odd:[],memory:[],next:[],belong:[]};
function add(mode,q){const n=out[mode].length+1;out[mode].push({id:mode+'-'+String(n).padStart(3,'0'),mode,number:n,band:Math.floor((n-1)/20),...q})}
const glyph=(shape,rot=0,dots=0,notch=0)=>({shape,rot,dots,notch});
for(let band=0;band<5;band++)for(let n=0;n<20;n++){
 const r=rng(7100+band*100+n),size=band===0?9:band===1?16:25,kind=n%4,variant=Math.floor(n/4),base=[],odd=[];
 let a,b,explanation,hint,feature;
 if(band===0){const shapes=['triangle','arrow','square','circle'];a=glyph(shapes[kind],kind<2?variant*45:0,kind>=2?variant:0);b={...a};if(kind<2){b.rot=(a.rot+180)%360;feature='direction';explanation='One '+a.shape+' faces the opposite direction.'}else{b.dots=a.dots+1;feature='dot count';explanation='One '+a.shape+' has '+b.dots+' dots; the others have '+a.dots+'.'}}
 if(band===1){a=glyph(['arrow','triangle','diamond','square'][kind],variant*45,kind===2?variant+1:0);b={...a};if(kind<2){b.rot=(a.rot+90)%360;feature='direction';explanation='One symbol is turned a quarter-turn from the others.'}else if(kind===2){b.dots=a.dots-1;feature='dot count';explanation='One diamond has one fewer dot.'}else{a.notch=variant+1;b.notch=(variant+1)%4+1;feature='opening';explanation='One square has its opening on a different edge.'}}
 if(band===2){a=glyph(['square','ring','triangle','arrow'][kind],variant*45,kind>1?variant+1:0,kind<2?variant+1:0);b={...a};if(kind<2){b.notch=(a.notch%4)+1;feature='opening';explanation='One opening is on a different side of the outline.'}else{b.dots=a.dots+1;feature='internal dots';explanation='One detailed symbol contains an extra dot.'}}
 if(band===3){a=glyph(kind%2?'triangle':'arrow',variant*45,kind+1);b={...a,rot:a.rot+90};feature='direction of the inner mark';explanation='The inner mark follows the outer symbol in every tile except one.';a.innerRot=a.rot+(a.shape==='triangle'?-90:0);b.innerRot=a.innerRot}
 if(band===4){a=glyph(['arrow','triangle','square','diamond'][kind],variant*45,2+kind,variant+1);b={...a};a.innerRot=a.rot+(a.shape==='triangle'?-90:0);b.innerRot=a.innerRot;if(kind<2){b.innerRot=a.innerRot+90;feature='inner mark alignment';explanation='One inner mark turns away from the direction of its outer symbol.'}else{b.notch=(a.notch%4)+1;feature='outline opening';explanation='One detailed outline has its opening on a different edge.'}}
 const answer=Math.floor(r()*size);for(let i=0;i<size;i++)base.push(i===answer?b:a);
 add('odd',{size,board:base,answer,question:'Tap the one tile that differs.',explanation,hint:'Compare the '+feature+'.',signature:JSON.stringify([band,a,b])});
}
const shapes=['star','circle','square','triangle','diamond','arrow'];
for(let band=0;band<5;band++)for(let n=0;n<20;n++){
 const r=rng(9500+band*101+n),rows=band===0?2:band===1?2:band===2?3:band===3?4:4,cols=band===0?2:band===1?3:band===2?3:band===3?3:4,size=rows*cols;
 const board=Array.from({length:size},()=>glyph(shapes[Math.floor(r()*6)],band>=3?Math.floor(r()*4)*90:0,band>=3?Math.floor(r()*3):0));
 const idx=Math.floor(r()*size),target=board[idx],pos='row '+(Math.floor(idx/cols)+1)+', column '+(idx%cols+1);
 let question,options,answer,highlight=idx,explanation;
 if(band<2||band===2&&n%2===0){question='Which shape was at '+pos+'?';options=shapes;answer=target.shape;explanation='The '+target.shape+' was at '+pos+'.'}
 else if(band===2){const shape=shapes[n%6],count=board.filter(x=>x.shape===shape).length;question='How many '+shape+' shapes were on the board?';options=[...new Set([count,Math.max(0,count-1),count+1,count+2,count+3])].slice(0,4).map(String);answer=String(count);highlight=-1;explanation='There were '+count+' '+shape+' shapes on the board.'}
 else if(band===3){question='How many dots were shown in the tile at '+pos+'?';options=['0','1','2','3'];answer=String(target.dots);explanation='The tile at '+pos+' showed '+target.dots+' dots.'}
 else{const idx2=(idx+cols)%size,t2=board[idx2];question='Which pair was at '+pos+' and row '+(Math.floor(idx2/cols)+1)+', column '+(idx2%cols+1)+' (in that order)?';answer=target.shape+' + '+t2.shape;options=[answer];while(options.length<4){const s=shapes[Math.floor(r()*6)]+' + '+shapes[Math.floor(r()*6)];if(!options.includes(s))options.push(s)}explanation='The two positions held '+target.shape+' then '+t2.shape+'.'}
 add('memory',{rows,cols,board,question,options:shuffle(options,r),answer,highlight,studySeconds:[10,9,8,8,7][band],explanation,hint:'Recall the rows from top to bottom; columns run from left to right.',signature:JSON.stringify([board,question])});
}
for(let band=0;band<5;band++)for(let n=0;n<20;n++){
 const r=rng(13000+band*100+n),kind=n%4,v=Math.floor(n/4)+1;let seq,answer,question,explanation,options;
 if(band===0){if(kind===0){const cycle=[shapes[v%6],shapes[(v+2)%6]];seq=Array.from({length:5},(_,i)=>cycle[i%2]);answer=cycle[1];question='Two shapes alternate.';options=shuffle(shapes,r).filter(s=>s!==answer).slice(0,3);explanation=cycle.join(', ')+' repeats; '+answer+' comes next.'}else{const start=v+11*kind,step=kind+v;seq=Array.from({length:5},(_,i)=>String(start+i*step));answer=String(start+5*step);question='Add the same amount at each step.';explanation='Each step adds '+step+'. '+seq.at(-1)+' + '+step+' = '+answer+'.'}}
 if(band===1){if(kind===0){const cycle=[shapes[v%6],shapes[(v+1)%6],shapes[(v+3)%6]];seq=Array.from({length:5},(_,i)=>cycle[i%3]);answer=cycle[2];question='A three-shape cycle repeats.';options=shapes.filter(s=>s!==answer).slice(0,3);explanation=cycle.join(', ')+' repeats in that order.'}else if(kind===1){const arrows=['↑','→','↓','←'];seq=Array.from({length:4+v%3},(_,i)=>arrows[(v+i)%4]);answer=arrows[(v+4+v%3)%4];options=arrows.filter(s=>s!==answer);question='Each arrow turns clockwise by a quarter-turn.';explanation='The next clockwise quarter-turn gives '+answer+'.'}else{const start=v+kind,m=kind===2?2:3;seq=Array.from({length:4},(_,i)=>String(start*m**i));answer=String(start*m**4);question='Multiply by the same number each step.';explanation='Multiply each value by '+m+'. '+seq.at(-1)+' × '+m+' = '+answer+'.'}}
 if(band===2){if(kind<2){let x=v;seq=[String(x)];for(let i=1;i<5;i++){x+=i+kind;seq.push(String(x))}answer=String(x+5+kind);question='The amount added grows by one each step.';explanation='The increases are '+[1,2,3,4,5].map(a=>a+kind).join(', ')+'. The next value is '+answer+'.'}else{const a=v,b=20+v,da=kind,db=kind+1;seq=[a,b,a+da,b+db,a+2*da].map(String);answer=String(b+2*db);question='Odd and even positions follow separate adding patterns.';explanation='Odd positions add '+da+'; even positions add '+db+'. The next even-position value is '+answer+'.'}}
 if(band===3){const a=v+kind+1,step=kind+2;seq=Array.from({length:5},(_,i)=>[shapes[(v+i)%6],String(a+i*step)].join(' · '));answer=shapes[(v+5)%6]+' · '+(a+5*step);question='Shapes cycle through star → circle → square → triangle → diamond → arrow. The numbers increase by a fixed amount.';explanation='Advance one shape in the cycle and add '+step+' to the number.';options=[shapes[(v+4)%6]+' · '+(a+5*step),shapes[(v+5)%6]+' · '+(a+4*step),shapes[(v+3)%6]+' · '+(a+6*step)]}
 if(band===4){
  const missing=kind%3+1;
  if(kind===0){let x=v+2;const full=[String(x)];for(let i=1;i<7;i++){x+=i%2?v:v+4;full.push(String(x))}seq=[...full];answer=seq[missing];seq[missing]='?';question='Fill the gap. Two different increases alternate.';explanation='The increases alternate +'+v+' and +'+(v+4)+'. The missing value is '+answer+'.'}
  if(kind===1){let x=v+1;const full=[String(x)];for(let i=1;i<6;i++){x=2*x+v;full.push(String(x))}seq=[...full];answer=seq[missing];seq[missing]='?';question='Fill the gap. Each step doubles the previous number, then adds a fixed amount.';explanation='Double the previous number and add '+v+'. The missing value is '+answer+'.'}
  if(kind===2){const a=v+2,b=30+v,da=v+1,db=v+3;const full=[a,b,a+da,b+db,a+2*da,b+2*db,a+3*da].map(String);seq=[...full];answer=seq[missing];seq[missing]='?';question='Fill the gap. Odd and even positions have separate fixed increases.';explanation='Odd positions add '+da+'; even positions add '+db+'. The missing value is '+answer+'.'}
  if(kind===3){let x=v+2;const full=[];for(let i=0;i<6;i++){if(i)x+=i+v;full.push(shapes[(v+i)%6]+' · '+x)}seq=[...full];answer=seq[missing];seq[missing]='?';question='Fill the gap. Shapes cycle through star → circle → square → triangle → diamond → arrow. Number increases grow by one each step.';explanation='Advance one shape in the cycle; the number increases are '+[1,2,3,4,5].map(i=>i+v).join(', ')+'. The missing pair is '+answer+'.';const num=Number(answer.split(' · ')[1]),sh=answer.split(' · ')[0];options=[sh+' · '+(num+1),shapes[(v+missing+1)%6]+' · '+num,sh+' · '+(num-1)]}
 }
 if(!options){const val=Number(answer);options=[String(val+1),String(val-1),String(val+3)]}
 options=shuffle([answer,...options],r);
 add('next',{question,sequence:seq,options,answer,missing:band===4,explanation,hint:band<2?'Compare neighbouring steps.':band===2?'Write down the changes, or separate odd and even positions.':band===3?'Follow the shape and number separately.':'Use the values on both sides of the gap.',signature:JSON.stringify([question,seq])});
}
const categories=[
['a fruit','Apple|Pear|Peach|Carrot',3,'A carrot is a root vegetable. The others are fruits.'],
['a musical instrument','Violin|Flute|Drum|Camera',3,'A camera takes pictures; the others are instruments.'],
['a day of the week','Monday|Friday|Sunday|April',3,'April is a month.'],
['a shape','Circle|Square|Triangle|Kilogram',3,'A kilogram measures mass.'],
['a direction','North|South|West|Litre',3,'A litre measures volume.'],
['a unit of time','Minute|Hour|Second|Metre',3,'A metre measures length.'],
['a piece of clothing','Shirt|Coat|Sock|Chair',3,'A chair is furniture.'],
['a vehicle','Bus|Train|Bicycle|Sofa',3,'A sofa is furniture.'],
['a colour','Red|Blue|Green|Loud',3,'Loud describes sound.'],
['a body part','Elbow|Knee|Wrist|Scarf',3,'A scarf is clothing.'],
['a kitchen utensil','Spoon|Fork|Whisk|Compass',3,'A compass gives direction.'],
['a season','Spring|Summer|Autumn|Tuesday',3,'Tuesday is a weekday.'],
['a punctuation mark','Comma|Bracket|Colon|Paragraph',3,'A paragraph is a block of text.'],
['a planet in our solar system','Mars|Venus|Saturn|Moon',3,'The Moon is a natural satellite.'],
['a building material','Brick|Timber|Concrete|Melody',3,'A melody is a musical sequence.'],
['a unit of mass','Gram|Kilogram|Tonne|Second',3,'A second measures time.'],
['a sport','Tennis|Cricket|Football|Violin',3,'A violin is an instrument.'],
['a tool','Hammer|Saw|Spanner|Cushion',3,'A cushion is a soft furnishing.'],
['a type of weather','Rain|Snow|Hail|Granite',3,'Granite is rock.'],
['a piece of furniture','Desk|Bed|Chair|Helmet',3,'A helmet is protective equipment.'],
['a mammal','Whale|Dolphin|Bat|Penguin',3,'A penguin is a bird.'],
['a string instrument','Violin|Cello|Guitar|Clarinet',3,'A clarinet is a wind instrument.'],
['a unit of length','Metre|Centimetre|Kilometre|Celsius',3,'Celsius measures temperature.'],
['a polygon','Triangle|Square|Hexagon|Circle',3,'A circle has a curved edge.'],
['a month with 31 days','January|March|July|June',3,'June has 30 days.'],
['a flightless bird','Ostrich|Emu|Penguin|Sparrow',3,'A sparrow can fly.'],
['a percussion instrument','Drum|Tambourine|Cymbal|Oboe',3,'An oboe is a wind instrument.'],
['a primary compass direction','North|East|South|North-east',3,'North-east lies between two primary directions.'],
['a unit of volume','Litre|Millilitre|Cubic metre|Kilogram',3,'A kilogram measures mass.'],
['a factor of 36','4|6|9|10',3,'36 cannot be divided evenly by 10.'],
['a quadrilateral','Square|Rectangle|Rhombus|Pentagon',3,'A pentagon has five sides.'],
['a metal','Iron|Copper|Gold|Oxygen',3,'Oxygen is a gas under ordinary room conditions.'],
['an even number','12|18|24|27',3,'27 is odd.'],
['a vowel letter in English','A|E|I|T',3,'T is a consonant.'],
['a multiple of five','15|25|40|42',3,'42 is not divisible by five.'],
['a metric prefix','Kilo|Milli|Centi|Dozen',3,'Dozen means twelve, not a metric prefix.'],
['a tool for fastening','Stapler|Clamp|Nail|Telescope',3,'A telescope is for viewing distant objects.'],
['a multiple of nine','18|27|45|46',3,'46 is not divisible by nine.'],
['a unit of electrical measurement','Volt|Ampere|Ohm|Litre',3,'A litre measures volume.'],
['a perfect square','9|16|25|30',3,'30 is not a whole number multiplied by itself.'],
['a prime number','11|13|17|21',3,'21 equals 3 × 7.'],
['a factor of 24','3|6|8|10',3,'24 cannot be divided evenly by 10.'],
['a multiple of seven','14|21|35|36',3,'36 is not divisible by seven.'],
['a power of two','8|16|32|48',3,'48 is not a power of two.'],
['a cube of a whole number','8|27|64|81',3,'81 is a square, but not a whole-number cube.'],
['a word with exactly five letters','Ocean|River|Cloud|Forest',3,'Forest has six letters.'],
['a word with a doubled adjacent letter','Letter|Coffee|Rabbit|Planet',3,'Planet has no doubled adjacent letter.'],
['a palindrome','Level|Radar|Refer|River',3,'River does not read the same backwards.'],
['a shape with a line of reflection symmetry','Circle|Square|Equilateral triangle|Unequal-sided triangle',3,'A triangle with three unequal sides has no line of reflection symmetry.'],
['a shape with exactly four equal sides','Square|Rhombus|Diamond-shaped rhombus|Non-square rectangle',3,'A non-square rectangle has only opposite sides equal.'],
['a fraction equal to one half','2/4|3/6|5/10|3/8',3,'3/8 is less than one half.'],
['a number divisible by three','12|21|33|35',3,'35 is not divisible by three.'],
['a number whose digits sum to nine','18|27|45|56',3,'The digits of 56 sum to eleven.'],
['a word containing every letter of CAT at least once','Catch|Actor|Trace|Cloud',3,'Cloud lacks A and T. The others contain C, A and T.'],
['a unit defined as one hundredth of its base unit','Centimetre|Centilitre|Centigram|Millimetre',3,'Milli means one thousandth; centi means one hundredth.'],
['a number with exactly three digits','101|205|999|1000',3,'1000 has four digits.'],
['a positive integer between 20 and 30 inclusive','21|25|30|31',3,'31 lies outside that interval.'],
['a number divisible by both two and five','10|20|40|45',3,'45 is divisible by five but is odd.'],
['a word ending in ING','Spring|Thing|Bring|Ginger',3,'Ginger does not end in ING.'],
['a regular polygon','Equilateral triangle|Square|Regular hexagon|Non-square rectangle',3,'A non-square rectangle does not have equal side lengths.']
];
categories[53]=['a word containing every letter of CAT at least once','Catch|Actor|Trace|Cloud',3,'Cloud lacks A and T. The others contain C, A and T.'];
for(const c of categories){const opts=c[1].split('|');add('belong',{question:'Choose the option that is NOT '+c[0]+'.',options:opts,answer:opts[c[2]],explanation:c[3],hint:'Test each option against the exact stated category.',signature:c[0]})}
const pairs=[
['an animal and its usual young','Cat → kitten|Dog → puppy|Sheep → lamb|Cow → foal','Cow → foal','A cow has a calf; a foal is a young horse.'],
['an object and its usual function','Scissors → cutting|Thermometer → temperature|Clock → time|Compass → weight','Compass → weight','A compass indicates direction.'],
['a country and its capital','France → Paris|Japan → Tokyo|Italy → Rome|Spain → Lisbon','Spain → Lisbon','Spain’s capital is Madrid; Lisbon is Portugal’s capital.'],
['a number and its double','6 → 12|9 → 18|12 → 24|8 → 20','8 → 20','Double 8 is 16.'],
['a number and its square','3 → 9|4 → 16|6 → 36|5 → 20','5 → 20','5 squared is 25.'],
['a shape and its number of sides','Triangle → 3|Pentagon → 5|Hexagon → 6|Octagon → 7','Octagon → 7','An octagon has eight sides.'],
['a measurement and its unit','Length → metre|Mass → kilogram|Time → second|Temperature → litre','Temperature → litre','A litre is a unit of volume.'],
['a word and its opposite','Hot → cold|Open → closed|Wide → narrow|Early → soon','Early → soon','Soon is not the opposite of early; late is.'],
['a number and that number plus three','4 → 7|8 → 11|12 → 15|6 → 10','6 → 10','6 plus three is 9.'],
['a word and its letter count','Cat → 3|Bird → 4|Horse → 5|Rabbit → 5','Rabbit → 5','Rabbit has six letters.'],
['a Roman numeral and its value','V → 5|X → 10|L → 50|C → 500','C → 500','C means 100; D means 500.'],
['a number and its half','8 → 4|12 → 6|18 → 9|20 → 12','20 → 12','Half of 20 is 10.'],
['a number and its cube','2 → 8|3 → 27|4 → 64|5 → 100','5 → 100','5 cubed is 125.'],
['a fraction and an equivalent fraction','1/2 → 2/4|1/3 → 2/6|2/5 → 4/10|3/4 → 6/12','3/4 → 6/12','6/12 equals one half, not three quarters.'],
['a quantity and its exact count','Pair → 2|Dozen → 12|Score → 20|Trio → 4','Trio → 4','A trio has three members.'],
['a metric prefix and its multiplier','Kilo → 1000|Centi → 0.01|Milli → 0.001|Mega → 100','Mega → 100','Mega means one million.'],
['an instrument and its family','Violin → strings|Flute → woodwind|Trumpet → brass|Cello → percussion','Cello → percussion','The cello belongs to the string family.'],
['a planet and its order from the Sun','Mercury → 1|Venus → 2|Earth → 3|Mars → 5','Mars → 5','Mars is fourth from the Sun.'],
['a number and its next prime number','3 → 5|7 → 11|13 → 17|19 → 25','19 → 25','The next prime after 19 is 23; 25 equals 5 × 5.'],
['a polygon and its interior-angle sum','Triangle → 180°|Quadrilateral → 360°|Pentagon → 540°|Hexagon → 600°','Hexagon → 600°','A hexagon’s interior angles sum to 720°.']
];
for(const c of pairs)add('belong',{question:'Which pair does NOT correctly match '+c[0]+'?',options:c[1].split('|'),answer:c[2],explanation:c[3],hint:'Check both members of each pair.',signature:c[0]});
const dual=[
['an even number greater than 20','22|24|28|18','18','18 is even but not greater than 20.'],
['a prime number greater than 10','11|13|17|21','21','21 is greater than 10 but equals 3 × 7.'],
['a multiple of three less than 30','12|21|27|33','33','33 is a multiple of three but exceeds 30.'],
['a perfect square that is even','4|16|36|25','25','25 is a perfect square but is odd.'],
['a two-digit number with digits summing to seven','16|25|34|44','44','The digits of 44 sum to eight, not seven.'],
['a five-letter word containing A','Apple|Grape|Peach|Lemon','Lemon','Lemon has five letters but no A.'],
['a four-sided shape with all sides equal','Square|Rhombus|Diamond-shaped rhombus|Non-square rectangle','Non-square rectangle','A non-square rectangle has four sides but not four equal sides.'],
['a number divisible by both three and five','15|30|45|25','25','25 is divisible by five but not by three.'],
['a fraction less than one and equal to one half','1/2|2/4|5/10|3/2','3/2','3/2 is greater than one and is not one half.'],
['an odd number between 10 and 20','11|15|19|14','14','14 is in the interval but is even.'],
['a word beginning with S and ending with E','Smile|Stone|Shine|Shirt','Shirt','Shirt begins with S but ends with T.'],
['a three-digit multiple of ten','120|250|990|95','95','95 has two digits and is not divisible by ten.'],
['a prime number less than 20','7|11|19|23','23','23 is prime but is greater than 20.'],
['a number divisible by four but not by eight','12|20|28|32','32','32 is divisible by both four and eight.'],
['a word with six letters and a doubled adjacent letter','Coffee|Letter|Rabbit|Garden','Garden','Garden has six letters but no doubled adjacent letter.'],
['a whole number greater than zero whose square is below 50','3|5|7|8','8','8 squared is 64.'],
['a two-digit palindrome that is even','22|44|66|77','77','77 is a palindrome but is odd.'],
['a number with exactly three digits ending in five','105|235|995|1005','1005','1005 ends in five but has four digits.'],
['a month with 31 days whose English name contains A','January|March|May|July','July','July has 31 days but no A in its name.'],
['a multiple of six between 30 and 60 inclusive','36|42|54|64','64','64 is outside the interval and not divisible by six.']
];
dual[4]=['a two-digit number with digits summing to seven','16|25|34|44','44','The digits of 44 sum to eight, not seven.'];
dual[10]=['a word beginning with S and ending with E','Smile|Stone|Shine|Shirt','Shirt','Shirt begins with S but ends with T.'];
for(const c of dual)add('belong',{question:'Which option fails the rule: '+c[0]+'?',options:c[1].split('|'),answer:c[2],explanation:c[3],hint:'Check both conditions. Meeting just one is not enough.',signature:c[0]});
for(const mode of Object.keys(out))if(out[mode].length!==100)throw Error(mode+' has '+out[mode].length);
fs.writeFileSync(new URL('../public/games/catalog.json',import.meta.url),JSON.stringify(out,null,2)+'\n');
console.log('Built 100 puzzles each in four modes.');





