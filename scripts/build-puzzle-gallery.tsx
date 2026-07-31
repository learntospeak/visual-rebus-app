import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PuzzleVisual } from '../src/components/PuzzleVisual'
import { puzzles } from '../src/data/puzzles'

const outputDirectory = path.resolve(process.argv[2] ?? path.join(process.cwd(), 'puzzle-gallery'))
const builtAssetsDirectory = path.join(process.cwd(), 'dist', 'assets')
const publicDirectory = path.join(process.cwd(), 'public')

function Gallery() {
  return (
    <main className="gallery-grid" id="gallery-grid">
      {puzzles.map((puzzle, index) => (
        <article
          className="gallery-card"
          data-search={`${index + 1} ${puzzle.answer} ${puzzle.difficulty}`.toLowerCase()}
          id={`puzzle-${index + 1}`}
          key={puzzle.id}
        >
          <header className="gallery-card-header">
            <strong>Puzzle {index + 1}</strong>
            <span>{puzzle.difficulty}</span>
          </header>
          <div className="gallery-prompt">{puzzle.prompt}</div>
          <div className="gallery-art"><PuzzleVisual puzzle={puzzle} /></div>
          <section className="gallery-solution">
            <div><small>ANSWER</small><b>{puzzle.answer}</b></div>
            <div><small>PATTERN</small><b>{puzzle.wordPattern}</b></div>
            <div className="gallery-clues"><small>CLUES</small><ol>{puzzle.clues.map((clue) => <li key={clue}>{clue}</li>)}</ol></div>
            <p><small>WHERE IT CAME FROM</small>{puzzle.origin}</p>
          </section>
        </article>
      ))}
    </main>
  )
}

const builtCssFile = (await readdir(builtAssetsDirectory)).find((file) => /^index(?:-[\w-]+)?\.css$/.test(file))
if (!builtCssFile) throw new Error(`Could not find the built application CSS in ${builtAssetsDirectory}`)
const builtCssPath = path.join(builtAssetsDirectory, builtCssFile)
const rawAppCss = await readFile(builtCssPath, 'utf8')
const cssStart = rawAppCss.indexOf(':root{')

if (cssStart === -1) {
  throw new Error(`Could not find the application CSS root in ${builtCssPath}`)
}

const appCss = rawAppCss
  .slice(cssStart)
  .replaceAll('url(../', 'url(./assets/')
  .replaceAll('url(/', 'url(./assets/')

const galleryCss = `
  :root { background:#e9e5dc; }
  body { min-width:320px; background:#e9e5dc; }
  .gallery-toolbar { position:sticky; top:0; z-index:20; display:flex; gap:16px; align-items:center; padding:16px clamp(16px,4vw,48px); color:white; background:#183b56; box-shadow:0 8px 24px rgba(24,59,86,.2); }
  .gallery-toolbar h1 { flex:1; font-size:clamp(1.3rem,3vw,2rem); letter-spacing:-.03em; }
  .gallery-toolbar input { width:min(320px,48vw); height:46px; padding:0 15px; border:2px solid transparent; border-radius:12px; }
  .gallery-count { white-space:nowrap; font-weight:800; }
  .gallery-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:22px; max-width:1800px; margin:auto; padding:28px; }
  .gallery-card { min-width:0; overflow:hidden; border:1px solid #dfe3e7; border-radius:22px; background:#fffefa; box-shadow:0 12px 30px rgba(24,59,86,.08); }
  .gallery-card[hidden] { display:none; }
  .gallery-card-header { display:flex; justify-content:space-between; padding:15px 18px; color:#183b56; background:#f7f3ea; }
  .gallery-card-header span { color:#a53c35; font-size:.8rem; font-weight:800; }
  .gallery-prompt { padding:13px 18px 0; color:#6e7989; text-align:center; font-size:.85rem; }
  .gallery-art { display:grid; place-items:center; height:280px; padding:5px 15px; overflow:hidden; }
  .gallery-art>.puzzle-visual { width:100%; height:270px; }
  .gallery-art .reviewed-puzzle-art svg { width:min(100%,340px); max-height:250px; }
  .gallery-solution { padding:17px 18px 20px; border-top:3px solid #2cb1a6; background:#eff9f7; }
  .gallery-solution>div { display:grid; grid-template-columns:92px 1fr; gap:8px; margin:4px 0; }
  .gallery-solution small { color:#6e7989; font-size:.65rem; font-weight:900; letter-spacing:.08em; }
  .gallery-solution b { color:#183b56; text-transform:capitalize; }
  .gallery-solution .gallery-clues { align-items:start; margin-top:12px; }
  .gallery-clues ol { margin:0; padding-left:18px; color:#526271; font-size:.75rem; line-height:1.45; }
  .gallery-clues li+li { margin-top:5px; }
  .gallery-solution p { margin:14px 0 0; color:#526271; font-size:.78rem; line-height:1.45; }
  .gallery-solution p small { display:block; margin-bottom:5px; }
  @media(max-width:600px) { .gallery-toolbar { flex-wrap:wrap; } .gallery-toolbar input { order:3; width:100%; } .gallery-grid { grid-template-columns:1fr; padding:14px; } }
`

const markup = renderToStaticMarkup(<Gallery />).replaceAll('src="/', 'src="./assets/')
const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Clue Canvas — Complete Puzzle Gallery</title><style>${appCss}\n${galleryCss}</style></head>
<body><header class="gallery-toolbar"><h1>Clue Canvas — Complete Puzzle Gallery</h1><span class="gallery-count" id="gallery-count">${puzzles.length} puzzles</span><input id="gallery-search" type="search" placeholder="Search number, answer or difficulty…" autofocus></header>${markup}
<script>
  const input=document.getElementById('gallery-search');
  const cards=[...document.querySelectorAll('.gallery-card')];
  const count=document.getElementById('gallery-count');
  const filterCards=()=>{
    const query=input.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{card.hidden=query&&!card.dataset.search.includes(query);if(!card.hidden)visible++});
    count.textContent=visible+' of ${puzzles.length} puzzles';
  };
  input.addEventListener('input',filterCards);
  const requestedPuzzle=new URLSearchParams(location.search).get('puzzle');
  if(requestedPuzzle){
    cards.forEach(card=>{card.hidden=card.id!=='puzzle-'+requestedPuzzle});
    count.textContent=(cards.some(card=>!card.hidden)?'1':'0')+' of ${puzzles.length} puzzles';
    input.value='Puzzle '+requestedPuzzle;
  }else if(location.hash){
    requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView());
  }
</script></body></html>`

await mkdir(outputDirectory, { recursive: true })
await cp(publicDirectory, path.join(outputDirectory, 'assets'), { recursive: true, force: true })
await writeFile(path.join(outputDirectory, 'index.html'), html, 'utf8')
await writeFile(path.join(outputDirectory, 'README.txt'), `Clue Canvas complete puzzle gallery\n\nOpen index.html in any browser.\nEvery puzzle includes its rendered challenge, answer, pattern, difficulty and origin.\nGenerated from the project on ${new Date().toISOString()}.\n`, 'utf8')

console.log(`Created ${puzzles.length}-puzzle gallery at ${outputDirectory}`)
