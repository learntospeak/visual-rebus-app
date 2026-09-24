# Before Service: second visual prototype

The default entry now opens a single rebuilt scene. The initial ten-scene SVG experiment remains at `legacy.html` for reference; its art direction was rejected by the owner. This revision deliberately prioritises one visual proof over extending rejected artwork.

## Direction

Original first-person 3D kitchen, with no cartoon characters: modelled set and cookware, physically shaded materials, reflected environment, directional shadows, animated water, steam particles and a choreographed camera. The opening plays once over 22 seconds and holds. Players can then turn away and look back; their gaze changes the simulation. Replay and moment stepping are explicit actions, never an automatic loop. The paid hint changes camera position and reveals a correct letter. The same three-lifeline engine is reused.

This is a deliberate owner-requested exception to the default vector palette/style in `docs/06_VISUAL_ASSET_STANDARD.md`. It remains draft: browser viewport checks are not actual iPhone/Android certification. No claim of production visual approval, realistic fluid simulation, finished cinematics or rebuilt ten-scene chapter is made.

## Assets and runtime

- All scene models, materials, lighting, procedural scratch/steam textures and choreography are original code in `cinema-scene.mjs`.
- Three.js 0.186.0, obtained from the official npm package, is vendored locally; MIT licence in `vendor/THREE-LICENSE.txt`. No CDN, image-generation or remote asset service is required.
- WebGL 2 required; a visible fallback explains when unavailable.
- Reduced motion starts paused, with explicit still stepping. A full descriptive alternative is available through How to play.
- New local save key: `cluecanvas.cinema.v2`; previous prototype saves are preserved separately. No main-app save or Android release changes.

Run the root Vite dev server, then open `/concepts/clue-logic/`. The independent private playtest site serves this directory's runtime files. Existing automated engine tests remain in `test.mjs`; visual choreography requires browser inspection.
