// Flags machine-translation artifacts in the Brazilian Portuguese chapters.
// Only prose is checked: code blocks are shared verbatim with the English text.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const ptDir = join(root, 'pt-br')

const forbidden = [
  [/ZZ\w*\d+ZZ/, 'leaked translation placeholder'],
  [/[\u200B-\u200D\uFEFF]/, 'zero-width character'],
  [/^\s*- \[\]/, 'broken task-list checkbox (use "- [ ]")'],
  [/\bvinculad[ao]s?\b/i, '"linked" is "encadeada", not "vinculada"'],
  [/\bclassificad[ao]s?\b/i, '"sorted" is "ordenado", not "classificado"'],
  [/pré-encomenda/i, '"preorder" is "pré-ordem"'],
  [/travessia/i, '"traversal" is "percurso"'],
  [/subárvore certa/i, '"right subtree" is "subárvore direita"'],
  [/gananciosos?/i, '"greedy" is "guloso"'],
  [/\bgráfico\b/i, '"graph" is "grafo"'],
  [/barbante/i, '"string" is not "barbante"'],
  [/conjunto de potência/i, '"power set" is "conjunto das partes"'],
  [/\bIdéia\b|^Idea:/, 'spelling: "Ideia"'],
  [/(?<!\p{L})caracter(?!\p{L})/iu, 'spelling: "caractere"'],
  [/\bmoer\b|moagem/i, '"grind" is not "moer"'],
  [/L\\_\\_n/, 'formula lost its subscripts'],
]

function markdownFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return markdownFiles(path)
    return name.endsWith('.md') && name !== 'SUMMARY.md' ? [path] : []
  })
}

const errors = []

for (const file of markdownFiles(ptDir)) {
  const rel = relative(root, file)
  const lines = readFileSync(file, 'utf8').split('\n')
  let inCode = false
  lines.forEach((line, i) => {
    if (line.startsWith('```')) inCode = !inCode
    if (inCode) return
    for (const [pattern, reason] of forbidden) {
      if (pattern.test(line)) errors.push(`${rel}:${i + 1}: ${reason}\n    ${line.trim()}`)
    }
  })

  // Each chapter is a line-by-line translation of its English counterpart, so
  // a different line count means a paragraph was merged or dropped.
  const english = join(root, 'en', relative(ptDir, file))
  const englishLines = readFileSync(english, 'utf8').split('\n').length
  if (englishLines !== lines.length) {
    errors.push(`${rel}: ${lines.length} lines, English has ${englishLines}`)
  }
}

// Defects inherited from the upstream text, checked in both languages.
const shared = [
  [/ZZ\w*\d+ZZ/, 'leaked translation placeholder'],
  [/[\u200B-\u200D\uFEFF]/, 'zero-width character'],
  [/L\\_\\_n/, 'formula lost its subscripts'],
  [/(?:once|uma vez), (?:so|então) (?:the complexity is|a complexidade é) O\(logN\)/, 'level-order traversal is O(N), not O(logN)'],
]
for (const file of [...markdownFiles(join(root, 'en')), ...markdownFiles(ptDir)]) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const [pattern, reason] of shared) {
      if (pattern.test(line)) errors.push(`${relative(root, file)}:${i + 1}: ${reason}`)
    }
  })
}

if (errors.length) {
  console.error(`Translation problems (${errors.length}):\n${errors.join('\n')}`)
  process.exit(1)
}
console.log('Portuguese chapters are free of known translation artifacts.')
