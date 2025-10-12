import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Diretórios a validar
const CONTENT_DIRS = [
  path.join(process.cwd(), 'apps/shell/conteudo/expedicoes'),
  path.join(process.cwd(), 'apps/shell/conteudo/cidades'),
  path.join(process.cwd(), 'apps/shell/conteudo/projetos')
]

// Regex para validar formato ISO (YYYY-MM-DD)
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

let hasErrors = false

function validateFile (filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)

  const errors: string[] = []

  if (!data.titulo) {
    errors.push('⚠️ Campo "titulo" ausente')
  }

  if (!data.data) {
    errors.push('⚠️ Campo "data" ausente')
  } else if (!ISO_DATE_REGEX.test(data.data)) {
    errors.push(
      `⚠️ Campo "data" inválido (${data.data}), use formato YYYY-MM-DD`
    )
  }

  if (!data.resumo) {
    errors.push('⚠️ Campo "resumo" ausente (bom para SEO)')
  }

  if (errors.length > 0) {
    hasErrors = true
    console.log(`\n❌ Problemas em: ${filePath}`)
    errors.forEach(err => console.log('   ' + err))
  } else {
    console.log(`✅ OK: ${filePath}`)
  }
}

function run () {
  CONTENT_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
    files.forEach(file => validateFile(path.join(dir, file)))
  })

  if (hasErrors) {
    console.error(
      '\n🚨 Erros encontrados no frontmatter. Corrija antes do build.'
    )
    process.exit(1) // 🔑 interrompe o processo
  } else {
    console.log('\n🎉 Todos os arquivos MDX estão válidos!')
  }
}

run()
