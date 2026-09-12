import { writeFile } from 'node:fs/promises'

// Keep the previous review URL useful, while the React gallery stays in sync
// with the same puzzle list and renderers as every future game build.
await writeFile(new URL('../public/art-review.html', import.meta.url), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=/?artworks=all"><title>Clue Canvas · All artwork</title></head><body><p><a href="/?artworks=all">Open the complete current artwork gallery</a></p><script>location.replace('/?artworks=all')</script></body></html>`)
console.log('Updated the old review URL to open the complete live artwork gallery.')
