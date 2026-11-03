// Crawls the built site and fails if any internal link or asset points to a
// file that does not exist in .vitepress/dist.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const dist = new URL('../.vitepress/dist/', import.meta.url).pathname

const requiredPages = ['index.html', 'en/index.html', 'pt-br/index.html']
const forbiddenPages = ['README.html', 'en/SUMMARY.html', 'pt-br/SUMMARY.html']

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return htmlFiles(path)
    return name.endsWith('.html') ? [path] : []
  })
}

// Extensionless links only work in production if Vercel maps /page to
// page.html; the VitePress preview server does that on its own.
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

function resolves(urlPath) {
  const path = decodeURIComponent(urlPath.split(/[?#]/)[0])
  if (path === '' || path.endsWith('/')) return existsSync(join(dist, path, 'index.html'))
  const target = join(dist, path)
  return existsSync(target) || (vercel.cleanUrls === true && existsSync(`${target}.html`))
}

const errors = []

for (const page of requiredPages) {
  if (!existsSync(join(dist, page))) errors.push(`missing page: ${page}`)
}
for (const page of forbiddenPages) {
  if (existsSync(join(dist, page))) errors.push(`unexpected page: ${page}`)
}

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8')
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"/][^"]*|\/)"/g)) {
    if (!resolves(url)) errors.push(`${relative(dist, file)} -> ${url}`)
  }
  // Images must ship with the site instead of hot-linking the upstream repo.
  for (const [, url] of html.matchAll(/<img[^>]*src="(https?:[^"]*)"/g)) {
    errors.push(`${relative(dist, file)} -> external image ${url}`)
  }
}

if (errors.length) {
  console.error(`Broken site output (${errors.length}):\n${[...new Set(errors)].join('\n')}`)
  process.exit(1)
}
console.log('All internal links and assets resolve.')
